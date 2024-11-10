const { ioUtil } = require("./ioUtil");
const { RRule, RRuleSet } = require("rrule");
const dayjs = require('dayjs');

class mytimeTimeserie {
    constructor(adapter) {
        this.adapter = adapter;
        this.ioUtil = new ioUtil(adapter);
        this.timeseriesPath = "Timeseries";
        this.timeseriesInfo = {};
        this.timeseriesDatelist = [];
        this.channelTemplate = {
            "channel": {
                "desc": "",
                "role": "",
                "icon": ""
            }
        };
        this.stateTimeseriesTemplate = {
            "action": {
                name: "action",
                read: true,
                write: true,
                type: "string",
                role: "value",
                def: ""
            },
            "cmd": {
                name: "cmd",
                read: true,
                write: true,
                type: "string",
                role: "state",
                def: ""
            },
        };
        this.validRruleKeys = [
            "freq",
            "dtstart",
            "interval",
            "wkst",
            "count",
            "until",
            "tzid",
            "bysetpos",
            "bymonth",
            "bymonthday",
            "bynmonthday",
            "byyearday",
            "byweekno",
            "byweekday",
            "bynweekday",
            "byhour",
            "byminute",
            "bysecond",
            "byeaster"
        ]
    }
    init() {
        this.ioUtil.logdebug("mytimeTimeserie init");
        // this.setTimeseriesInfo(this.adapter.config.timeseries || {}, this.doObserverServerTimeseries.bind(this));
        this.setTimeseriesInfo(this.adapter.config.timeseries || {});
        this.doObserverServerTimeseries();
    }
    doObserverServerTimeseries() {
        this.ioUtil.logsilly("doObserverServerTimeseries");
        this.checkTimeseriesStatus();
        this.ioUtil.setTimeout("doObserverServerTimeseries", this.doObserverServerTimeseries.bind(this), 5000);
    }
    async setTimeseriesInfo(timeseriesConfig) {
        this.ioUtil.logdebug("setTimeseriesInfo " + JSON.stringify(timeseriesConfig));
        let that = this;
        let datapoints = await this.readTimeseriesInfo();
        // check if main entries for each config exist, create channels if needed
        for (const tsIndex in timeseriesConfig) {
            let tsConfig = timeseriesConfig[tsIndex];
            if (datapoints[tsConfig.tsname]) {
                if (datapoints[tsConfig.tsname].value.type != "channel") {
                    const objectTemplate = { common: { ...that.channelTemplate["channel"] }, type: "channel" };
                    objectTemplate["name"] = tsConfig.tsname;
                    await that.ioUtil.createObjectChannelAsync(objectTemplate, that.timeseriesPath);
                }
            } else {
                const objectTemplate = { common: { ...that.channelTemplate["channel"] }, type: "channel" };
                objectTemplate["name"] = tsConfig.tsname;
                await that.ioUtil.createObjectChannelAsync(objectTemplate, that.timeseriesPath);
            }
            that.timeseriesInfo[tsConfig.tsname] = {};
        }
        // check if configurations are deleted then delete main and all sub datapoints
        for (let dpIndex in datapoints) {
            let dp = datapoints[dpIndex];
            if (dp.value.type != "channel") continue;
            if (timeseriesConfig.findIndex(el => el.tsname == dp.name) == -1) {
                that.ioUtil.deleteObjectAsync(dp.name, that.timeseriesPath);
            }
        }
        // check if sub entries for each config exist, create datapoints if needed
        for (const tsIndex in timeseriesConfig) {
            let tsConfig = timeseriesConfig[tsIndex];
            for (const keyprop in that.stateTimeseriesTemplate) {
                if (!datapoints[[tsConfig.tsname, keyprop].join(".")]) {
                    const objectTemplate = { ...that.stateTimeseriesTemplate[keyprop] };
                    await that.ioUtil.createObjectAsync(objectTemplate, that.timeseriesPath, tsConfig.tsname);
                    that.timeseriesInfo[tsConfig.tsname][keyprop] = null;
                    let value = objectTemplate.type == "string" ? "" : 0;
                    await that.ioUtil.setStateAsync(keyprop, value, that.timeseriesPath, tsConfig.tsname);
                    that.timeseriesInfo[tsConfig.tsname][keyprop] = value;
                } else {
                    that.timeseriesInfo[tsConfig.tsname][keyprop] = datapoints[[tsConfig.tsname, keyprop].join(".")].val;
                }
            }
        }
    }
    async readTimeseriesInfo() {
        this.ioUtil.logsilly("readTimeseriesInfo ");
        let that = this;
        let objs = await this.ioUtil.getObjects(that.timeseriesPath);
        let stts = await this.ioUtil.getStates("*", that.timeseriesPath);
        const data = {};
        for (const key in objs) {
            let obj = objs[key];
            const parts = objs[key].id.split(".");
            if (parts[2] != that.timeseriesPath) continue;
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
    checkTimeseriesStatus() {
        this.ioUtil.logsilly("checkTimeseriesStatus");
        this.getDateList();
    }
    filterObject(obj, keepKeys) {
        const filteredObj = {};
        for (const key in obj) {
            if (keepKeys.includes(key)) {
                filteredObj[key] = obj[key];
            }
        }
        return filteredObj;
    }
    getDateList() {
        this.ioUtil.logsilly("getDateList");
        //collect new time events

        for (const ts in this.adapter.config.timeseries) {
            const ruleset = new RRuleSet();
            const rules = this.adapter.config.timeseries[ts].rules || [];
            for (const rule of rules) {
                const filteredRule = this.filterObject(rule, this.validRruleKeys);
                if (rule.mode == "rule-add") {
                    if (filteredRule.dtstart) filteredRule.dtstart = new Date(filteredRule.dtstart);
                    if (filteredRule.until) filteredRule.until = new Date(filteredRule.until);
                    ruleset.rrule(new RRule(filteredRule));
                }
                if (rule.mode == "rule-del") {
                    if (filteredRule.dtstart) filteredRule.dtstart = new Date(filteredRule.dtstart);
                    if (filteredRule.until) filteredRule.until = new Date(filteredRule.until);
                    ruleset.exrule(new RRule(filteredRule));
                }
                if (rule.mode == "datea-dd") {
                    rule.dates.map(
                        el => ruleset.rdate(new Date(el))
                    );
                }
                if (rule.mode == "date-del") {
                    rule.dates.map(
                        el => ruleset.exdate(new Date(el))
                    );
                }
            }
            const datelist = ruleset.between(new Date(), new Date(new Date().setMinutes(new Date().getMinutes() + 5)), true);
            for (const d of datelist) {
                if (this.timeseriesDatelist.findIndex(el => el.date.getTime() == d.getTime()) == -1) {
                    this.ioUtil.logsilly("getDateList add date " + d + " for " + this.adapter.config.timeseries[ts].tsname);
                    this.timeseriesDatelist.push(
                        {
                            date: d,
                            ts: this.adapter.config.timeseries[ts].tsname,
                            duration: this.adapter.config.timeseries[ts].tsduration
                        }
                    );
                    //sort=true;
                }
            }
        }
        //remove old time events
        const now = dayjs();
        const twoMinutesAgo = now.subtract(2, 'minute');

        this.timeseriesDatelist = this.timeseriesDatelist.reduceRight((acc, obj) => {
            const objDate = dayjs(obj.date);
            const durationMs = obj.duration * 1000; // convert duration to milliseconds
            const thresholdDate = twoMinutesAgo.subtract(durationMs, 'millisecond');

            if (objDate.isBefore(thresholdDate)) {
                // remove object from array
                return acc;
            } else {
                // keep object in array
                acc.push(obj);
                return acc;
            }
        }, []);

        /*         let i = this.timeseriesDatelist.length;
                while (i--) {
                    let now = dayjs();
                    let when = dayjs(this.timeseriesDatelist[i].date).subtract(2, 'minute').subtract(this.timeseriesDatelist[i].duration, 'second');
                    if (when < now) {
                        this.ioUtil.logsilly("getDateList date removed " + this.timeseriesDatelist[i].date);
                        this.timeseriesDatelist.splice(i, 1);
                    }
                } */
        //if (sort) this.timeseriesDatelist=this.timeseriesDatelist.sort((a,b) => a.date-b.date );
        //calculate event time and start setTimeout with exact time
        this.timeseriesDatelist.map(el => {
            if (!el.timerid && el.date.getTime() - new Date().getTime() > 0) {
                el.timerid = Math.floor(Math.random() * 100000000);
                this.ioUtil.setTimeout(
                    el.timerid,
                    this.doTimeoutActivate.bind(this),
                    el.date.getTime() - new Date().getTime(),
                    el
                );
                this.ioUtil.logsilly("getDateList start timeout:" + el.ts + " with " + el.date + " at " + new Date());
            }
        });
    }
    doTimeoutActivate(ts) {
        this.ioUtil.logdebug("doTimeoutActivate '" + ts.ts + "' with '" + ts.date + "' dur '" + ts.duration + "' at " + new Date());
        this.ioUtil.clearTimeout(ts.timerid);
        this.ioUtil.setState("action", "run", this.timeseriesPath, ts.ts);
        ts.timerid = Math.floor(Math.random() * 100000000);
        this.ioUtil.setTimeout(
            ts.timerid,
            this.doTimeoutDeactivate.bind(this),
            ts.duration * 1000,
            ts
        );
    }
    doTimeoutDeactivate(ts) {
        this.ioUtil.logdebug("doTimeoutDeactivate '" + ts.ts + "' with '" + ts.date + "' dur '" + ts.duration + "' at " + new Date());
        this.ioUtil.clearTimeout(ts.timerid);
        ts.timerid = "finished";
        this.ioUtil.setState("action", "stop", this.timeseriesPath, ts.ts);
    }
}
module.exports = {
    mytimeTimeserie
};