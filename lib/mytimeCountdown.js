const { ioUtil } = require('./ioUtil');
/**
 * all functions for the countdown timer
 */
class mytimeCountdown {
    /**
     * @param adapter - The ioBroker adapter instance.
     *
     * Creates a new instance of mytimeCountdown.
     * The constructor creates an instance of ioUtil and sets some default values.
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.ioUtil = new ioUtil(adapter);
        this.countdownPath = 'Countdowns';
        this.countdownInfo = {};
        this.channelTemplate = {
            channel: {
                desc: '',
                role: '',
                icon: '',
            },
        };
        this.stateCounterTemplate = {
            config: {
                name: 'config',
                read: true,
                write: false,
                type: 'string',
                role: 'value',
            },
            start: {
                name: 'start',
                read: true,
                write: true,
                type: 'number',
                role: 'value',
            },
            end: {
                name: 'end',
                read: true,
                write: true,
                type: 'number',
                role: 'value',
            },
            timer: {
                name: 'timer',
                read: true,
                write: true,
                type: 'number',
                role: 'value',
            },
            action: {
                name: 'action',
                read: true,
                write: false,
                type: 'string',
                role: 'value',
            },
            cmd: {
                name: 'cmd',
                read: true,
                write: true,
                type: 'string',
                role: 'state',
                def: '',
            },
            name: {
                name: 'name',
                read: true,
                write: false,
                type: 'string',
                role: 'state',
                def: '',
            },
        };
    }
    /**
     * Inits the countdown system.
     *
     * This function is called during the adapter startup.
     * It sets the countdown info and starts the observer for the server countdown.
     */
    init() {
        this.ioUtil.logdebug('mytimeCountdown init');
        this.setCountdownInfo(this.adapter.config.countdowns || {});
        this.doObserverServerCountdown();
    }
    /**
     * Sets the countdown information based on the provided configuration.
     *
     * This function initializes and updates countdown configurations by checking
     * and creating necessary channels and data points. It ensures that the main
     * entries for each configuration exist, creates channels if needed, and updates
     * or deletes data points based on the current and provided configurations.
     *
     * @param countdownConfig - An array of countdown configuration objects
     *                                  containing details such as name, seconds,
     *                                  minutes, hours, days, and behavior.
     */
    async setCountdownInfo(countdownConfig) {
        this.ioUtil.logdebug(`setCountdownInfo ${JSON.stringify(countdownConfig)}`);
        let datapoints = await this.readCountdownInfo();
        // check if main entries for each config exist, create channels if needed
        for (const cdIndex in countdownConfig) {
            let cdConfig = countdownConfig[cdIndex];
            if (datapoints[cdConfig.name]) {
                if (datapoints[cdConfig.name].value.type != 'channel') {
                    const objectTemplate = { common: { ...this.channelTemplate['channel'] }, type: 'channel' };
                    objectTemplate['name'] = cdConfig.name;
                    await this.ioUtil.createObjectChannelAsync(objectTemplate, this.countdownPath, null);
                }
            } else {
                const objectTemplate = { common: { ...this.stateCounterTemplate['channel'] }, type: 'channel' };
                objectTemplate['name'] = cdConfig.name;
                await this.ioUtil.createObjectChannelAsync(objectTemplate, this.countdownPath, null);
            }
            this.countdownInfo[cdConfig.name] = {};
        }
        // check if configurations are deleted then delete main and all sub datapoints
        for (let dpIndex in datapoints) {
            let dp = datapoints[dpIndex];
            if (dp.value.type != 'channel') {
                continue;
            }
            if (countdownConfig.findIndex(el => el.name == dpIndex) == -1) {
                this.ioUtil.deleteObjectAsync(dp.name, this.countdownPath, null);
            }
        }
        // check if sub entries for each config exist, create datapoints if needed
        for (const cdIndex in countdownConfig) {
            let cdConfig = countdownConfig[cdIndex];
            for (const keyprop in this.stateCounterTemplate) {
                if (!datapoints[[cdConfig.name, keyprop].join('.')]) {
                    const objectTemplate = { ...this.stateCounterTemplate[keyprop] };
                    await this.ioUtil.createObjectAsync(objectTemplate, this.countdownPath, cdConfig.name);
                    this.countdownInfo[cdConfig.name][keyprop] = null;
                    let value; // = objectTemplate.type == "string" ? "" : 0;
                    if (keyprop == 'name') {
                        value = cdConfig.name;
                    }
                    if (keyprop == 'timer') {
                        value =
                            cdConfig.seconds * 1000 +
                            cdConfig.minutes * (1000 * 60) +
                            cdConfig.hours * (1000 * 60 * 60) +
                            cdConfig.days * (1000 * 60 * 60 * 24);
                    }
                    if (keyprop == 'config') {
                        value = { stopbehaviour: cdConfig.behavior };
                    }
                    if (keyprop == 'action' || keyprop == 'cmd' || keyprop == 'start' || keyprop == 'end') {
                        value = objectTemplate.type == 'string' ? '' : 0;
                    }
                    this.countdownInfo[cdConfig.name][keyprop] = value;
                    if (typeof value == 'object') {
                        value = JSON.stringify(value);
                    }
                    await this.ioUtil.setStateAsync(keyprop, value, this.countdownPath, cdConfig.name);
                } else {
                    this.countdownInfo[cdConfig.name][keyprop] = datapoints[[cdConfig.name, keyprop].join('.')].val;
                }
            }
        }
    }
    /**
     * reads the state of the countdown datapoints and returns them in an object structure.
     * The object keys are the names of the countdowns and the values are objects with the properties:
     * - name: the name of the countdown
     * - value: the value of the countdown
     * - val: the last value that was set to the countdown
     */
    async readCountdownInfo() {
        this.ioUtil.logsilly('readCountdownInfo ');
        let objs = await this.ioUtil.getObjects(this.countdownPath);
        let stts = await this.ioUtil.getStates('*', this.countdownPath, null);
        const data = {};
        for (const key in objs) {
            let obj = objs[key];
            const parts = obj.id.split('.');
            if (parts[2] != this.countdownPath) {
                continue;
            }
            const name = parts.slice(3).join('.');
            if (!name) {
                continue;
            }
            if (!Object.prototype.hasOwnProperty.call(data, name)) {
                data[name] = {};
                data[name].name = name;
                data[name].value = obj.value;
                data[name].val = stts[key] ? stts[key].val : null;
            }
        }
        return data;
    }
    /**
     * Calls checkCountdownStatus every second.
     * This function is called from the init function of the adapter.
     * It checks every second if a countdown has finished and if so, stops it.
     */
    doObserverServerCountdown() {
        this.ioUtil.logsilly('doObserverServerCountdown');
        this.checkCountdownStatus();
        this.ioUtil.setTimeout('doObserverServerCountdown', this.doObserverServerCountdown.bind(this), 1000);
    }
    /**
     * Checks the status of each countdown and stops any countdowns that have finished.
     *
     * Iterates over the countdown information, and for each countdown that is currently
     * running and has reached its end time, it sets the command state to 'end'.
     * This function is called periodically to ensure countdowns are monitored properly.
     */
    checkCountdownStatus() {
        this.ioUtil.logsilly('checkCountdownStatus');
        for (const [keycd, obj] of Object.entries(this.countdownInfo)) {
            if (obj.action == 'run' && obj.end <= new Date().getTime()) {
                this.ioUtil.setStateNack('cmd', 'end', this.countdownPath, keycd, obj);
            }
        }
    }

    /**
     * Called whenever a state of a countdown object changes.
     *
     * Forwards the state change to either the doCmd or setState functions
     * depending on if the state is a command or a countdown setting.
     *
     * @param idParts The parts of the state ID that identify the countdown.
     * @param state The state that has changed.
     */
    doCountdownStateChange(idParts, state) {
        this.ioUtil.logdebug(`doCountdownStateChange ${JSON.stringify([idParts, state])}`);
        idParts.shift();
        state.val = state.val || '';
        if (idParts[idParts.length - 1] == 'cmd') {
            if (state.val.toString().trim() != '') {
                this.doCmd(idParts, state);
            }
        } else {
            this.countdownInfo[idParts[0]][idParts[1]] = parseInt(state.val) || 0;
            this.ioUtil.setState(idParts[1], parseInt(state.val) || 0, this.countdownPath, idParts[0]);
        }
    }
    /**
     * Processes a command for a countdown.
     *
     * @param idParts - The parts of the state ID that identify the countdown.
     * @param state - The state that has changed.
     */
    doCmd(idParts, state) {
        this.ioUtil.logdebug(`doCmd ${JSON.stringify([idParts, state])}`);
        const name = idParts.slice(0, -1).join('.');
        const data = this.countdownInfo[name];
        //eslint-disable-next-line
        const regex = new RegExp("([=+\\-\\#\\$]{1})(!?)(.*)|(start|pause|stop|end|reset|setstop2timer|setstop2zero|save)", "");
        const match = regex.exec(state.val.toString().toLowerCase().trim());
        if (match) {
            const operator = match[1];
            const extend = match[2];
            const value = match[3];
            const command = match[4];
            let now = new Date().getTime();
            let msnew = 0;
            if (operator) {
                if ('+-='.includes(operator)) {
                    msnew = calcTime2Milíseconds(value);
                }
                const msold = data.timer || 0;
                //eslint-disable-next-line
                if (operator == '=') data.timer = (msnew < 0) ? 0 : msnew;
                if (operator == '+') {
                    data.timer = msold + msnew;
                }
                if (operator == '-') {
                    data.timer = msold - msnew < 0 ? 0 : msold - msnew;
                }
                if (operator == '#') {
                    const fdate = Date.parse(value);
                    if (!isNaN(fdate)) {
                        data.timer = fdate - now > 0 ? fdate - now : 0;
                    }
                }
                if (operator == '$') {
                    const d = parseTime(value.substring(1));
                    if (now >= d.getTime()) {
                        d.setDate(d.getDate() + 1);
                    }
                    data.timer = d.getTime() - now > 0 ? d.getTime() - now : 0;
                }
                if (extend == '!' && data.action == 'run') {
                    if ('='.indexOf(operator) > -1) {
                        data.start = now;
                        data.end = data.start + data.timer;
                    }
                    if ('+='.indexOf(operator) > -1) {
                        data.end = data.start + data.timer;
                    }
                    if ('-'.indexOf(operator) > -1) {
                        data.end = now + data.timer;
                    }
                    if (operator == '#') {
                        const fdate = Date.parse(value);
                        data.end = fdate;
                    }
                    if (operator == '$') {
                        const d = parseTime(value.substring(1));
                        if (now >= d.getTime()) {
                            d.setDate(d.getDate() + 1);
                        }
                        data.end = d.getTime();
                    }
                }
                this.ioUtil.setState('start', data.start, this.countdownPath, name);
                this.ioUtil.setState('end', data.end, this.countdownPath, name);
                this.ioUtil.setState('timer', data.timer, this.countdownPath, name);
                this.ioUtil.setState(idParts[1], ' ', this.countdownPath, idParts[0]);
            }
            if (command) {
                let action = 'stop';
                if (command == 'start') {
                    const now = new Date().getTime();
                    if (data.action == 'pause') {
                        let diff = data.end - data.start;
                        diff = diff < 0 ? data.timer : diff;
                        // v1
                        this.countdownInfo[name].start = now;
                        this.countdownInfo[name].end = now + diff;
                        this.ioUtil.setState('start', now, this.countdownPath, name);
                        this.ioUtil.setState('end', now + diff, this.countdownPath, name);
                        action = 'run';
                    }
                    if (data.action == 'stop') {
                        // v2
                        this.countdownInfo[name].start = now;
                        this.countdownInfo[name].end = now + data.timer;
                        this.ioUtil.setState('start', now, this.countdownPath, name);
                        this.ioUtil.setState('end', now + data.timer, this.countdownPath, name);
                        action = 'run';
                    }
                    if (data.action == 'end') {
                        // v2
                        this.countdownInfo[name].start = now;
                        this.countdownInfo[name].end = now + data.timer;
                        this.ioUtil.setState('start', now, this.countdownPath, name);
                        this.ioUtil.setState('end', now + data.timer, this.countdownPath, name);
                        action = 'run';
                    }
                    if (data.action == 'run') {
                        // v2
                        this.countdownInfo[name].start = now;
                        this.countdownInfo[name].end = now + data.timer;
                        this.ioUtil.setState('start', now, this.countdownPath, name);
                        this.ioUtil.setState('end', now + data.timer, this.countdownPath, name);
                        action = 'run';
                    }
                    this.countdownInfo[name].action = action;
                    this.ioUtil.setState('action', action, this.countdownPath, name);
                }
                if (command == 'pause') {
                    const now = new Date().getTime();
                    let diff = data.end - data.start;
                    switch (data.action) {
                        case 'run':
                            //v3
                            this.countdownInfo[name].start = now;
                            this.ioUtil.setState('start', now, this.countdownPath, name);
                            action = 'pause';
                            break;
                        case 'pause':
                            //v1
                            diff = diff < 0 ? data.timer : diff;
                            this.countdownInfo[name].start = now;
                            this.countdownInfo[name].end = now + diff;
                            this.ioUtil.setState('start', now, this.countdownPath, name);
                            this.ioUtil.setState('end', now + diff, this.countdownPath, name);
                            action = 'run';
                            break;

                        case 'stop':
                        case 'end':
                            // v4
                            this.countdownInfo[name].start = 0;
                            this.countdownInfo[name].end = 0;
                            this.ioUtil.setState('start', 0, this.countdownPath, name);
                            this.ioUtil.setState('end', 0, this.countdownPath, name);
                            action = 'stop';
                            break;
                        default:
                            break;
                    }
                    this.countdownInfo[name].action = action;
                    this.ioUtil.setState('action', action, this.countdownPath, name);
                }
                if (command == 'stop') {
                    switch (data.action) {
                        case 'run':
                        case 'pause':
                        case 'stop':
                        case 'end':
                            // v4
                            this.countdownInfo[name].start = 0;
                            this.countdownInfo[name].end = 0;
                            this.ioUtil.setState('start', 0, this.countdownPath, name);
                            this.ioUtil.setState('end', 0, this.countdownPath, name);
                            action = 'stop';
                            break;
                        default:
                            break;
                    }
                    this.countdownInfo[name].action = action;
                    this.ioUtil.setState('action', action, this.countdownPath, name);
                }
                if (command == 'reset') {
                    switch (data.action) {
                        case 'run':
                        case 'pause':
                        case 'stop':
                        case 'end':
                            // v4
                            this.countdownInfo[name].start = 0;
                            this.countdownInfo[name].end = 0;
                            this.countdownInfo[name].timer = data.timer;
                            this.ioUtil.setState('start', 0, this.countdownPath, name);
                            this.ioUtil.setState('end', 0, this.countdownPath, name);
                            this.ioUtil.setState('timer', data.timer, this.countdownPath, name);
                            action = 'stop';
                            break;
                        default:
                            break;
                    }
                    this.countdownInfo[name].action = action;
                    this.ioUtil.setState('action', action, this.countdownPath, name);
                }
                if (command == 'end') {
                    switch (data.action) {
                        case 'run':
                        case 'pause':
                        case 'stop':
                            // v4.1
                            this.countdownInfo[name].start = 0;
                            this.countdownInfo[name].end = 0;
                            this.ioUtil.setState('start', 0, this.countdownPath, name);
                            this.ioUtil.setState('end', 0, this.countdownPath, name);
                            action = 'end';
                            break;
                        default:
                            break;
                    }
                    if (data.action == 'end') {
                        action = 'end';
                    }
                    this.countdownInfo[name].action = action;
                    this.ioUtil.setState('action', action, this.countdownPath, name);
                }
                if (command == 'setstop2timer') {
                    data.config.stopbehaviour = 'timer';
                    this.countdownInfo[name].config.stopbehaviour = 'timer';
                    this.ioUtil.setState('config', JSON.stringify(data.config), this.countdownPath, name);
                }
                if (command == 'setstop2zero') {
                    data.config.stopbehaviour = 'zero';
                    this.countdownInfo[name].config.stopbehaviour = 'zero';
                    this.ioUtil.setState('config', JSON.stringify(data.config), this.countdownPath, name);
                }
                if (command == 'save') {
                    this.ioUtil.setState('cmd', ' ', this.countdownPath, name);
                    this.countdownInfo[name].cmd = '';
                    this.saveConfiguration(this.countdownInfo[name]);
                }
                this.ioUtil.setState('cmd', ' ', this.countdownPath, name);
            }
        }
    }
    /**
     * Converts a configuration object into a structured countdown configuration.
     *
     * This function takes a configuration object, extracts the timer value,
     * and calculates the equivalent time in days, hours, minutes, and seconds.
     * It also parses the behavior from the configuration to determine the
     * countdown's stop behavior.
     *
     * @param newConfiguration - The configuration object containing
     *                                    timer and config properties.
     * @returns A structured object containing the name, days, hours, minutes,
     *                   seconds, and behavior derived from the input configuration.
     */
    convertInfo2Config(newConfiguration) {
        this.ioUtil.logdebug('convertInfo2Config');
        let timer = newConfiguration.timer < 1000 ? 1000 : newConfiguration.timer;
        const days = Math.floor(timer / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timer - days * 1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor((timer - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(
            (timer - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000,
        );
        let behavior = JSON.parse(newConfiguration.config);
        return {
            name: newConfiguration.name,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            behavior: behavior.stopbehaviour == 'zero' ? 'zero' : 'timer',
        };
    }
    /**
     * Saves the given configuration object to the adapter's configuration.
     *
     * @param newConfiguration - The configuration object containing
     *                                    timer and config properties.
     * @returns A promise that resolves when the configuration has been saved.
     *
     * The function first converts the configuration object to a structured countdown
     * configuration, then adds or updates the configuration in the adapter's
     * countdowns array. Finally, the adapter's configuration is updated with the
     * new countdowns array. The function logs a debug message to indicate
     * that an adapter restart is necessary.
     */
    async saveConfiguration(newConfiguration) {
        this.ioUtil.logdebug(`saveConfiguration, adapter restart needed ${JSON.stringify(newConfiguration)}`);
        const saveConfiguration = this.convertInfo2Config(newConfiguration);
        const instanceId = ['system.adapter', this.adapter.name, this.adapter.instance].join('.');
        let oldObj = (await this.adapter.getForeignObjectAsync(instanceId)) || [];
        let configCountdowns = [...oldObj.native.countdowns];
        configCountdowns.splice(
            configCountdowns.findIndex(el => el.name == saveConfiguration.name),
            1,
        );
        configCountdowns.push(saveConfiguration);
        oldObj.native.countdowns = configCountdowns;
        this.adapter.setForeignObject(instanceId, oldObj);
    }
    /**
     * Called when a state in the system changes.
     *
     * @param id - the id of the state that changed
     * @param state - the new state
     */
    doStateChange(id, state) {
        this.ioUtil.logsilly('doStateChange');
        // Warning, state can be null if it was deleted
        if (!id || !state || state.ack) {
            return;
        }
        const idParts = id.split('.');
        idParts.shift();
        idParts.shift();
        if (idParts[0] == this.countdownPath) {
            this.doCountdownStateChange(idParts, state);
        }
    }
    /**
     * This function is called when the adapter receives a message.
     *
     * @param msg - the message
     */
    processMessages(msg) {
        this.ioUtil.logdebug(`processMessages countdown${JSON.stringify(msg)}`);
    }
}

/**
 * Converts a time string in the format "days:hours:minutes:seconds" to milliseconds.
 *
 * @param timestr - The time string to convert, expected in the format "DD:HH:MM:SS".
 * @returns The equivalent time in milliseconds.
 */
function calcTime2Milíseconds(timestr) {
    const aTime = timestr.split(':');
    let ms = 0;
    if (aTime.length > 0) {
        ms += aTime.pop() * 1000;
    } //sec
    if (aTime.length > 0) {
        ms += aTime.pop() * 60 * 1000;
    } //min
    if (aTime.length > 0) {
        ms += aTime.pop() * 60 * 60 * 1000;
    } //hr
    if (aTime.length > 0) {
        ms += aTime.pop() * 24 * 60 * 60 * 1000;
    } //days
    return ms;
}
/**
 * Parses a time string and returns a Date object set to that time.
 *
 * The function extracts hours, minutes, seconds, and an optional AM/PM
 * indicator from the provided time string. If the AM/PM indicator is
 * present, it adjusts the hours accordingly. The returned Date object
 * is set to the current date with the extracted time components.
 *
 * @param time - A string representing the time in the format "HH:MM:SS AM/PM".
 *                        Hours, minutes, and seconds are optional, and the AM/PM
 *                        part is case-insensitive.
 * @returns A Date object set to the specified time.
 */
function parseTime(time) {
    const d = new Date();
    const match = /(?<hrs>\d+)*:?(?<min>\d\d)?:?(?<sec>\d\d)?\s*(?<mer>pm|am)?/i.exec(time);
    if (match && match.groups) {
        d.setHours(parseInt(match.groups.hrs) || 0 + (match.groups.mer == 'pm' ? 12 : 0));
        d.setMinutes(parseInt(match.groups.min) || 0);
        d.setSeconds(parseInt(match.groups.sec) || 0);
    }
    return d;
}
module.exports = {
    mytimeCountdown,
};
