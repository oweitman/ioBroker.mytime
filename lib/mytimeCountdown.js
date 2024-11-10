const { ioUtil } = require("./ioUtil");
class mytimeCountdown {
    constructor(adapter) {
        this.adapter = adapter;
        this.ioUtil = new ioUtil(adapter);
        this.countdownPath = "Countdowns";
        this.countdownInfo = {};
        this.channelTemplate = {
            "channel": {
                "desc": "",
                "role": "",
                "icon": ""
            }
        };
        this.stateCounterTemplate = {
            "config": {
                name: "config",
                read: true,
                write: false,
                type: "string",
                role: "value"
            },
            "start": {
                name: "start",
                read: true,
                write: true,
                type: "number",
                role: "value"
            },
            "end": {
                name: "end",
                read: true,
                write: true,
                type: "number",
                role: "value"
            },
            "timer": {
                name: "timer",
                read: true,
                write: true,
                type: "number",
                role: "value"
            },
            "action": {
                name: "action",
                read: true,
                write: false,
                type: "string",
                role: "value"
            },
            "cmd": {
                name: "cmd",
                read: true,
                write: true,
                type: "string",
                role: "state",
                def: ""
            },
            "name": {
                name: "name",
                read: true,
                write: false,
                type: "string",
                role: "state",
                def: ""
            },
        };
    }
    init() {
        this.ioUtil.logdebug("mytimeCountdown init");
        this.setCountdownInfo(this.adapter.config.countdowns || {});
        this.doObserverServerCountdown();
    }
    async setCountdownInfo(countdownConfig) {
        this.ioUtil.logdebug("setCountdownInfo " + JSON.stringify(countdownConfig));
        let that = this;
        let datapoints = await this.readCountdownInfo();
        // check if main entries for each config exist, create channels if needed
        for (const cdIndex in countdownConfig) {
            let cdConfig = countdownConfig[cdIndex];
            if (datapoints[cdConfig.name]) {
                if (datapoints[cdConfig.name].value.type != "channel") {
                    const objectTemplate = { common: { ...that.channelTemplate["channel"] }, type: "channel" };
                    objectTemplate["name"] = cdConfig.name;
                    await that.ioUtil.createObjectChannelAsync(objectTemplate, that.countdownPath);
                }
            } else {
                const objectTemplate = { common: { ...that.stateCounterTemplate["channel"] }, type: "channel" };
                objectTemplate["name"] = cdConfig.name;
                await that.ioUtil.createObjectChannelAsync(objectTemplate, that.countdownPath);
            }
            that.countdownInfo[cdConfig.name] = {};
        }
        // check if configurations are deleted then delete main and all sub datapoints
        for (let dpIndex in datapoints) {
            let dp = datapoints[dpIndex];
            if (dp.value.type != "channel") continue;
            if (countdownConfig.findIndex(el => el.name == dpIndex) == -1) {
                that.ioUtil.deleteObjectAsync(dp.name, that.countdownPath);
            }
        }
        // check if sub entries for each config exist, create datapoints if needed
        for (const cdIndex in countdownConfig) {
            let cdConfig = countdownConfig[cdIndex];
            for (const keyprop in that.stateCounterTemplate) {
                if (!datapoints[[cdConfig.name, keyprop].join(".")]) {
                    const objectTemplate = { ...that.stateCounterTemplate[keyprop] };
                    await that.ioUtil.createObjectAsync(objectTemplate, that.countdownPath, cdConfig.name);
                    that.countdownInfo[cdConfig.name][keyprop] = null;
                    let value = objectTemplate.type == "string" ? "" : 0;
                    if (keyprop == "name") value = cdConfig.name;
                    if (keyprop == "timer") {
                        value = cdConfig.seconds * 1000 +
                            cdConfig.minutes * (1000 * 60) +
                            cdConfig.hours * (1000 * 60 * 60) +
                            cdConfig.days * (1000 * 60 * 60 * 24);
                    }
                    await that.ioUtil.setStateAsync(keyprop, value, that.countdownPath, cdConfig.name);
                    that.countdownInfo[cdConfig.name][keyprop] = value;
                } else {
                    that.countdownInfo[cdConfig.name][keyprop] = datapoints[[cdConfig.name, keyprop].join(".")].val;
                }
            }
        }
    }
    async readCountdownInfo() {
        this.ioUtil.logsilly("readCountdownInfo ");
        let that = this;
        let objs = await this.ioUtil.getObjects(this.countdownPath);
        let stts = await this.ioUtil.getStates("*", that.countdownPath);
        const data = {};
        for (const key in objs) {
            let obj = objs[key];
            const parts = obj.id.split(".");
            if (parts[2] != that.countdownPath) continue;
            const name = parts.slice(3).join(".");
            if (!name) continue;
            if (!Object.prototype.hasOwnProperty.call(data, name)) {
                data[name] = {};
                data[name].name = name;
                data[name].value = obj.value;
                data[name].val = stts[key] ? stts[key].val : null;
            }
        }
        return data;
    }
    doObserverServerCountdown() {
        this.ioUtil.logsilly("doObserverServerCountdown");
        this.checkCountdownStatus();
        this.ioUtil.setTimeout("doObserverServerCountdown", this.doObserverServerCountdown.bind(this), 1000);
    }
    checkCountdownStatus() {
        this.ioUtil.logsilly("checkCountdownStatus");
        for (const [keycd, obj] of Object.entries(this.countdownInfo)) {
            if (obj.action == "run" && obj.end <= new Date().getTime()) {
                this.ioUtil.setStateNack("cmd", "end", this.countdownPath, keycd, obj);
            }
        }
    }

    doCountdownStateChange(idParts, state) {
        this.ioUtil.logdebug("doCountdownStateChange " + JSON.stringify([idParts, state]));
        idParts.shift();
        if (idParts[idParts.length - 1] == "cmd") {
            if (state.val.toString().trim() != "") this.doCmd(idParts, state);
        } else {
            this.countdownInfo[idParts[0]][idParts[1]] = parseInt(state.val) || 0;
            this.ioUtil.setState(idParts[1], parseInt(state.val) || 0, this.countdownPath, idParts[0]);
        }
    }
    doCmd(idParts, state) {
        this.ioUtil.logdebug("doCmd " + JSON.stringify([idParts, state]));
        let that = this;
        const name = idParts.slice(0, -1).join(".");
        const value = state.val.toString();
        const config = that.adapter.config.countdowns.find(cd => cd.name == name);
        config.timer = config.seconds * 1000 +
            config.minutes * (1000 * 60) +
            config.hours * (1000 * 60 * 60) +
            config.days * (1000 * 60 * 60 * 24);
        //eslint-disable-next-line
        if ('+-\=#$'.indexOf(value[0]) >= 0) {
            const operator = value.trim()[0];
            const msnew = this.calcTime2Milíseconds(value.substr(1));
            // this.getCounddownData(name, function (data) {
            let now;
            let data = this.countdownInfo[name];
            const msold = data.timer || 0;
            //eslint-disable-next-line
            if (operator == '\=') data.timer = (msnew < 0) ? 0 : msnew;
            if (operator == "+") data.timer = msold + msnew;
            if (operator == "-") data.timer = (msold - msnew < 0) ? 0 : msold - msnew;
            if (operator == "#") {
                now = (new Date()).getTime();
                const fdate = Date.parse(value.substr(1));
                if (!isNaN(fdate)) {
                    data.timer = (fdate - now > 0) ? fdate - now : 0;
                }
            }
            if (operator == "$") {
                now = (new Date()).getTime();
                const d = that.parseTime(value.substr(1));
                if (now >= d.getTime()) d.setDate(d.getDate() + 1);
                data.timer = (d.getTime() - now > 0) ? d.getTime() - now : 0;
            }
            that.countdownInfo[name].timer = data.timer;
            that.ioUtil.setState("timer", data.timer, that.countdownPath, name);
            this.ioUtil.setState(idParts[1], " ", this.countdownPath, idParts[0]);
        }
        let action = "stop";
        if (value.toLowerCase() == "start") {
            let data = this.countdownInfo[name];
            const now = (new Date()).getTime();
            if (data.action == "pause") {
                let diff = data.end - data.start;
                diff = (diff < 0) ? data.timer : diff;
                // v1
                that.countdownInfo[name].start = now;
                that.countdownInfo[name].end = now + diff;
                that.ioUtil.setState("start", now, that.countdownPath, name);
                that.ioUtil.setState("end", now + diff, that.countdownPath, name);
                action = "run";
            }
            if (data.action == "stop") {
                // v2
                that.countdownInfo[name].start = now;
                that.countdownInfo[name].end = now + data.timer;
                that.ioUtil.setState("start", now, that.countdownPath, name);
                that.ioUtil.setState("end", now + data.timer, that.countdownPath, name);
                action = "run";
            }
            if (data.action == "end") {
                // v2
                that.countdownInfo[name].start = now;
                that.countdownInfo[name].end = now + data.timer;
                that.ioUtil.setState("start", now, that.countdownPath, name);
                that.ioUtil.setState("end", now + data.timer, that.countdownPath, name);
                action = "run";
            }
            if (data.action == "run") {
                // v2
                that.countdownInfo[name].start = now;
                that.countdownInfo[name].end = now + data.timer;
                that.ioUtil.setState("start", now, that.countdownPath, name);
                that.ioUtil.setState("end", now + data.timer, that.countdownPath, name);
                action = "run";
            }
            that.countdownInfo[name].action = action;
            that.ioUtil.setState("action", action, that.countdownPath, name);
        }
        if (value.toLowerCase() == "pause") {
            let data = this.countdownInfo[name];
            const now = (new Date()).getTime();
            switch (data.action) {
                case "run":
                    //v3
                    that.countdownInfo[name].start = now;
                    that.ioUtil.setState("start", now, that.countdownPath, name);
                    action = "pause";
                    break;
                case "pause":
                    //v1
                    let diff = data.end - data.start;
                    diff = (diff < 0) ? data.timer : diff;
                    that.countdownInfo[name].start = now;
                    that.countdownInfo[name].end = now + diff;
                    that.ioUtil.setState("start", now, that.countdownPath, name);
                    that.ioUtil.setState("end", now + diff, that.countdownPath, name);
                    action = "run";
                    break;
                case "stop":
                case "end":
                    // v4
                    that.countdownInfo[name].start = 0;
                    that.countdownInfo[name].end = 0;
                    that.ioUtil.setState("start", 0, that.countdownPath, name);
                    that.ioUtil.setState("end", 0, that.countdownPath, name);
                    action = "stop";
                default:
                    break;
            }
            /*             if (data.action == "run") {
                            // v3
                            that.countdownInfo[name].start = now;
                            that.ioUtil.setState("start", now, that.countdownPath, name);
                            action = "pause";
                        }
                        if (data.action == "pause") {
                            let diff = data.end - data.start;
                            diff = (diff < 0) ? data.timer : diff;
                            //v1
                            that.countdownInfo[name].start = now;
                            that.countdownInfo[name].end = now + diff;
                            that.ioUtil.setState("start", now, that.countdownPath, name);
                            that.ioUtil.setState("end", now + diff, that.countdownPath, name);
                            action = "run";
                        }
                        if (data.action == "stop") {
                            // v4
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        }
                        if (data.action == "end") {
                            //v4
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        } */
            that.countdownInfo[name].action = action;
            that.ioUtil.setState("action", action, that.countdownPath, name);
        }
        if (value.toLowerCase() == "stop") {
            let data = this.countdownInfo[name];

            switch (data.action) {
                case "run":
                case "pause":
                case "stop":
                case "end":
                    // v4
                    that.countdownInfo[name].start = 0;
                    that.countdownInfo[name].end = 0;
                    that.ioUtil.setState("start", 0, that.countdownPath, name);
                    that.ioUtil.setState("end", 0, that.countdownPath, name);
                    action = "stop";
                default:
                    break;
            }

            /*             if (data.action == "run") {
                            // v4
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        }
                        if (data.action == "pause") {
                            // v4
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        }
                        if (data.action == "stop") {
                            // v4
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        }
                        if (data.action == "end") {
                            // v4
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        } */
            that.countdownInfo[name].action = action;
            that.ioUtil.setState("action", action, that.countdownPath, name);
        }
        if (value.toLowerCase() == "reset") {
            let data = this.countdownInfo[name];

            switch (data.action) {
                case "run":
                case "pause":
                case "stop":
                case "end":
                    // v4
                    that.countdownInfo[name].start = 0;
                    that.countdownInfo[name].end = 0;
                    that.countdownInfo[name].timer = config.timer;
                    that.ioUtil.setState("start", 0, that.countdownPath, name);
                    that.ioUtil.setState("end", 0, that.countdownPath, name);
                    that.ioUtil.setState("timer", config.timer, that.countdownPath, name);
                    action = "stop";
                default:
                    break;
            }
            /*           if (data.action == "run") {
                          // v5
                          that.countdownInfo[name].start = 0;
                          that.countdownInfo[name].end = 0;
                          that.countdownInfo[name].timer = config.timer;
                          that.ioUtil.setState("start", 0, that.countdownPath, name);
                          that.ioUtil.setState("end", 0, that.countdownPath, name);
                          that.ioUtil.setState("timer", config.timer, that.countdownPath, name);
                          action = "stop";
                      }
                      if (data.action == "pause") {
                          // v5
                          that.countdownInfo[name].start = 0;
                          that.countdownInfo[name].end = 0;
                          that.countdownInfo[name].timer = config.timer;
                          that.ioUtil.setState("start", 0, that.countdownPath, name);
                          that.ioUtil.setState("end", 0, that.countdownPath, name);
                          that.ioUtil.setState("timer", config.timer, that.countdownPath, name);
                          action = "stop";
                      }
                      if (data.action == "stop") {
                          // v5
                          that.countdownInfo[name].start = 0;
                          that.countdownInfo[name].end = 0;
                          that.countdownInfo[name].timer = config.timer;
                          that.ioUtil.setState("start", 0, that.countdownPath, name);
                          that.ioUtil.setState("end", 0, that.countdownPath, name);
                          that.ioUtil.setState("timer", config.timer, that.countdownPath, name);
                          action = "stop";
                      }
                      if (data.action == "end") {
                          // v5
                          that.countdownInfo[name].start = 0;
                          that.countdownInfo[name].end = 0;
                          that.countdownInfo[name].timer = config.timer;
                          that.ioUtil.setState("start", 0, that.countdownPath, name);
                          that.ioUtil.setState("end", 0, that.countdownPath, name);
                          that.ioUtil.setState("timer", config.timer, that.countdownPath, name);
                          action = "stop";
                      } */
            that.countdownInfo[name].action = action;
            that.ioUtil.setState("action", action, that.countdownPath, name);
        }
        if (value.toLowerCase() == "end") {
            let data = this.countdownInfo[name];

            switch (data.action) {
                case "run":
                case "pause":
                case "stop":
                    // v4.1
                    that.countdownInfo[name].start = 0;
                    that.countdownInfo[name].end = 0;
                    that.ioUtil.setState("start", 0, that.countdownPath, name);
                    that.ioUtil.setState("end", 0, that.countdownPath, name);
                    action = "end";
                default:
                    break;
            }
            /*             if (data.action == "run") {
                            // v4.1
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "end";
                        }
                        if (data.action == "pause") {
                            // v4.1
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "end";
                        }
                        if (data.action == "stop") {
                            // v4.1
                            that.countdownInfo[name].start = 0;
                            that.countdownInfo[name].end = 0;
                            that.ioUtil.setState("start", 0, that.countdownPath, name);
                            that.ioUtil.setState("end", 0, that.countdownPath, name);
                            action = "stop";
                        } */
            if (data.action == "end") {
                action = "end";
            }
            that.countdownInfo[name].action = action;
            that.ioUtil.setState("action", action, that.countdownPath, name);
        }
        if (value.toLowerCase() == "setstop2timer") {
            let data = this.countdownInfo[name];
            data.config.stopbehaviour = "timer";
            that.countdownInfo[name].config.stopbehaviour = "timer";
            that.ioUtil.setState("config", JSON.stringify(data.config), that.countdownPath, name);
        }
        if (value.toLowerCase() == "setstop2zero") {
            let data = this.countdownInfo[name];
            data.config.stopbehaviour = "zero";
            that.countdownInfo[name].config.stopbehaviour = "zero";
            that.ioUtil.setState("config", JSON.stringify(data.config), that.countdownPath, name);
        }
        if (value.toLowerCase() == "save") {
            that.ioUtil.setState("cmd", " ", this.countdownPath, name);
            this.saveConfiguration(this.countdownInfo);
        }
        that.ioUtil.setState("cmd", " ", this.countdownPath, name);
    }
    calcTime2Milíseconds(timestr) {
        const aTime = timestr.split(":");
        let ms = 0;
        if (aTime.length > 0) ms += aTime.pop() * 1000;                 //sec
        if (aTime.length > 0) ms += aTime.pop() * 60 * 1000;            //min
        if (aTime.length > 0) ms += aTime.pop() * 60 * 60 * 1000;       //hr
        if (aTime.length > 0) ms += aTime.pop() * 24 * 60 * 60 * 1000;  //days
        return ms;
    }
    parseTime(time) {
        const d = new Date();
        const match = /(?<hrs>\d+)*:?(?<min>\d\d)?:?(?<sec>\d\d)?\s*(?<mer>pm|am)?/i.exec(time);
        if (match && match.groups) {
            d.setHours(
                parseInt((match.groups.hrs)) || 0 +
                (match.groups.mer == "pm" ? 12 : 0)
            );
            d.setMinutes(
                parseInt((match.groups.min)) || 0
            );
            d.setSeconds(
                parseInt((match.groups.sec)) || 0
            );
        }
        return d;
    }
    saveConfiguration(newConfiguration) {
        this.ioUtil.logdebug("saveConfiguration, adapter restart needed " + JSON.stringify(newConfiguration));
        const saveConfiguration = { counter: newConfiguration };
        const instanceId = ["system.adapter", this.adapter.name, this.adapter.instance].join(".");
        const that = this;
        let oldObj;
        this.adapter.getForeignObject(instanceId, function (err, _oldObj) {
            oldObj = _oldObj || {};

            for (const a in saveConfiguration) {
                if (!Object.prototype.hasOwnProperty.call(saveConfiguration, a)) {
                    oldObj.native[a] = saveConfiguration[a];
                }
            }
            that.adapter.setForeignObject(instanceId, oldObj);
        });
    }
    doStateChange(id, state) {
        this.ioUtil.logsilly("doStateChange");
        // Warning, state can be null if it was deleted
        if (!id || !state || state.ack) {
            return;
        }
        const idParts = id.split(".");
        idParts.shift();
        idParts.shift();
        if (idParts[0] == this.countdownPath) this.doCountdownStateChange(idParts, state);
    }
    processMessages(msg) {
        this.ioUtil.logdebug("processMessages countdown" + JSON.stringify(msg));
    }
}
module.exports = {
    mytimeCountdown
};