const { ioUtil } = require('./ioUtil');
const { RRule, RRuleSet } = require('rrule');
const dayjs = require('dayjs');
let SunCalc = require('suncalc3');
/**
 * all functions for timeseries management
 */
class mytimeTimeserie {
    /**
     * The constructor for the mytimeTimeserie class
     *
     * @param adapter - The ioBroker adapter instance.
     *
     * The constructor creates an instance of ioUtil and sets some default values.
     * The path for the timeseries objects is set to "Timeseries".
     * The timeseriesInfo object is created to store information about each timeserie.
     * The timeseriesDatelist is created to store all existing datelist objects.
     * The channelTemplate and stateTimeseriesTemplate are created to store the common properties of the channels and states.
     * The validRruleKeys array is created to store the valid keys for the RRULE object.
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.ioUtil = new ioUtil(adapter);
        this.timeseriesPath = 'Timeseries';
        this.timeseriesInfo = {};
        this.timeseriesDatelist = [];
        this.channelTemplate = {
            channel: {
                desc: '',
                role: '',
                icon: '',
            },
        };
        this.stateTimeseriesTemplate = {
            action: {
                name: 'action',
                read: true,
                write: true,
                type: 'string',
                role: 'value',
                def: '',
            },
            cmd: {
                name: 'cmd',
                read: true,
                write: true,
                type: 'string',
                role: 'state',
                def: '',
            },
        };
        this.validRruleKeys = [
            'freq',
            'dtstart',
            'interval',
            'wkst',
            'count',
            'until',
            'tzid',
            'bysetpos',
            'bymonth',
            'bymonthday',
            'bynmonthday',
            'byyearday',
            'byweekno',
            'byweekday',
            'bynweekday',
            'byhour',
            'byminute',
            'bysecond',
            'byeaster',
        ];
    }
    /**
     * Initializes the timeseries configuration and starts the observer.
     *
     * This method logs the initialization process, sets up the timeseries
     * information from the adapter's configuration, and begins observing
     * the server timeseries state.
     */
    init() {
        this.ioUtil.logdebug('mytimeTimeserie init');
        // this.setTimeseriesInfo(this.adapter.config.timeseries || {}, this.doObserverServerTimeseries.bind(this));
        this.setTimeseriesInfo(this.adapter.config.timeseries || {});
        this.doObserverServerTimeseries();
    }
    /**
     * This method checks the status of the timeseries and
     * sets up a recurring call to itself to continue monitoring
     * the timeseries.
     *
     * It logs a debug message, calls checkTimeseriesStatus
     * to update the status of the timeseries, and then sets a
     * 5-second timeout to call itself again.
     */
    doObserverServerTimeseries() {
        this.ioUtil.logsilly('doObserverServerTimeseries');
        this.checkTimeseriesStatus();
        this.ioUtil.setTimeout('doObserverServerTimeseries', this.doObserverServerTimeseries.bind(this), 5000);
    }
    /**
     * Configures the timeseries information based on the provided configuration.
     *
     * This asynchronous method takes a timeseries configuration object and performs the following:
     * - Logs the configuration for debugging purposes.
     * - Reads existing timeseries data points.
     * - Checks and creates necessary channels for each timeseries configuration.
     * - Deletes any channels and their associated data points that are not present in the configuration.
     * - Checks and creates necessary data points for each timeseries configuration.
     * - Initializes the timeseries information with default values or existing data point values.
     *
     * @param timeseriesConfig - An object containing configuration details for timeseries.
     */
    async setTimeseriesInfo(timeseriesConfig) {
        this.ioUtil.logdebug(`setTimeseriesInfo ${JSON.stringify(timeseriesConfig)}`);
        let datapoints = await this.readTimeseriesInfo();
        // check if main entries for each config exist, create channels if needed
        for (const tsIndex in timeseriesConfig) {
            let tsConfig = timeseriesConfig[tsIndex];
            if (datapoints[tsConfig.tsname]) {
                if (datapoints[tsConfig.tsname].value.type != 'channel') {
                    const objectTemplate = { common: { ...this.channelTemplate['channel'] }, type: 'channel' };
                    objectTemplate['name'] = tsConfig.tsname;
                    await this.ioUtil.createObjectChannelAsync(objectTemplate, this.timeseriesPath, null);
                }
            } else {
                const objectTemplate = { common: { ...this.channelTemplate['channel'] }, type: 'channel' };
                objectTemplate['name'] = tsConfig.tsname;
                await this.ioUtil.createObjectChannelAsync(objectTemplate, this.timeseriesPath, null);
            }
            this.timeseriesInfo[tsConfig.tsname] = {};
        }
        // check if configurations are deleted then delete main and all sub datapoints
        for (let dpIndex in datapoints) {
            let dp = datapoints[dpIndex];
            if (dp.value.type != 'channel') {
                continue;
            }
            if (timeseriesConfig.findIndex(el => el.tsname == dp.name) == -1) {
                this.ioUtil.deleteObjectAsync(dp.name, this.timeseriesPath, null);
            }
        }
        // check if sub entries for each config exist, create datapoints if needed
        for (const tsIndex in timeseriesConfig) {
            let tsConfig = timeseriesConfig[tsIndex];
            for (const keyprop in this.stateTimeseriesTemplate) {
                if (!datapoints[[tsConfig.tsname, keyprop].join('.')]) {
                    const objectTemplate = { ...this.stateTimeseriesTemplate[keyprop] };
                    await this.ioUtil.createObjectAsync(objectTemplate, this.timeseriesPath, tsConfig.tsname);
                    this.timeseriesInfo[tsConfig.tsname][keyprop] = null;
                    let value = objectTemplate.type == 'string' ? '' : 0;
                    await this.ioUtil.setStateAsync(keyprop, value, this.timeseriesPath, tsConfig.tsname);
                    this.timeseriesInfo[tsConfig.tsname][keyprop] = value;
                } else {
                    this.timeseriesInfo[tsConfig.tsname][keyprop] =
                        datapoints[[tsConfig.tsname, keyprop].join('.')].val;
                }
            }
        }
    }
    /**
     * Read all timeseries information from IOBroker objects and states.
     *
     * @returns A promise that resolves to an object with the timeseries names as properties.
     * The value of each property is an object with the following properties:
     * - name: The name of the timeseries
     * - value: The value of the timeseries (channel object)
     * - val: The value of the timeseries (state value)
     */
    async readTimeseriesInfo() {
        this.ioUtil.logsilly('readTimeseriesInfo ');
        let objs = await this.ioUtil.getObjects(this.timeseriesPath);
        let stts = await this.ioUtil.getStates('*', this.timeseriesPath, null);
        const data = {};
        for (const key in objs) {
            let obj = objs[key];
            const parts = objs[key].id.split('.');
            if (parts[2] != this.timeseriesPath) {
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
     * Checks the status of the timeseries.
     *
     * This method logs a debug message indicating the check process
     * and retrieves the date list for the timeseries.
     */
    checkTimeseriesStatus() {
        this.ioUtil.logsilly('checkTimeseriesStatus');
        //this.getDateList();
        this.getDateListAll();
    }
    /**
     * Retrieves and manages a list of date events for timeseries configurations.
     *
     * This method performs the following:
     * - Iterates over the timeseries configurations to collect new time events.
     * - Constructs RRuleSet instances to define inclusion and exclusion rules
     *   based on the configuration's rules.
     * - Adds new date events that do not already exist in the timeseriesDatelist.
     * - Removes outdated time events based on a specified threshold.
     * - Sets timeouts for upcoming events to trigger the appropriate actions.
     *
     * It logs detailed information about the process for debugging purposes.
     */
    getDateList() {
        this.ioUtil.logsilly('getDateList');
        //collect new time events

        for (const ts in this.adapter.config.timeseries) {
            const ruleset = new RRuleSet();
            const rules = this.adapter.config.timeseries[ts].rules || [];
            for (const rule of rules) {
                const filteredRule = filterObject(rule, this.validRruleKeys);
                if (rule.mode == 'rule-add') {
                    if (filteredRule.dtstart) {
                        filteredRule.dtstart = new Date(filteredRule.dtstart);
                    }
                    if (filteredRule.until) {
                        filteredRule.until = new Date(filteredRule.until);
                    }
                    ruleset.rrule(new RRule(filteredRule));
                }
                if (rule.mode == 'rule-del') {
                    if (filteredRule.dtstart) {
                        filteredRule.dtstart = new Date(filteredRule.dtstart);
                    }
                    if (filteredRule.until) {
                        filteredRule.until = new Date(filteredRule.until);
                    }
                    ruleset.exrule(new RRule(filteredRule));
                }
                if (rule.mode == 'date-add') {
                    rule.dates.map(el => ruleset.rdate(new Date(el)));
                }
                if (rule.mode == 'date-del') {
                    rule.dates.map(el => ruleset.exdate(new Date(el)));
                }
            }
            const datelist = ruleset.between(
                new Date(),
                new Date(new Date().setMinutes(new Date().getMinutes() + 5)),
                true,
            );
            for (const d of datelist) {
                if (this.timeseriesDatelist.findIndex(el => el.date.getTime() == d.getTime()) == -1) {
                    this.ioUtil.logsilly(`getDateList add date ${d} for ${this.adapter.config.timeseries[ts].tsname}`);
                    this.timeseriesDatelist.push({
                        date: d,
                        ts: this.adapter.config.timeseries[ts].tsname,
                        duration: this.adapter.config.timeseries[ts].tsduration,
                    });
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
            }
            // keep object in array
            acc.push(obj);
            return acc;
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
                    el,
                );
                this.ioUtil.logsilly(`getDateList start timeout:${el.ts} with ${el.date} at ${new Date()}`);
            }
        });
    }

    /**
     * get all dates from all timeseries
     *
     * @returns {undefined}
     */
    getDateListAll() {
        this.ioUtil.logsilly('getDateListAll');
        let datelist = [];
        for (const ts in this.adapter.config.timeseries) {
            datelist = this.getDateListTimeserie(this.adapter.config.timeseries[ts]);
            for (const d of datelist) {
                if (this.timeseriesDatelist.findIndex(el => el.date.getTime() == d.date.getTime()) == -1) {
                    this.ioUtil.logsilly(
                        `getDateList add date ${d.date} for ${this.adapter.config.timeseries[ts].tsname}`,
                    );
                    this.timeseriesDatelist.push({
                        date: d.date,
                        ts: this.adapter.config.timeseries[ts].tsname,
                        duration: this.adapter.config.timeseries[ts].tsduration,
                    });
                }
            }
        }

        // add new events to timeseriesDatelist

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
            }
            // keep object in array
            acc.push(obj);
            return acc;
        }, []);

        //calculate event time and start setTimeout with exact time
        this.timeseriesDatelist.map(el => {
            if (!el.timerid && el.date.getTime() - new Date().getTime() > 0) {
                el.timerid = Math.floor(Math.random() * 100000000);
                this.ioUtil.setTimeout(
                    el.timerid,
                    this.doTimeoutActivate.bind(this),
                    el.date.getTime() - new Date().getTime(),
                    el,
                );
                this.ioUtil.logsilly(`getDateList start timeout:${el.ts} with ${el.date} at ${new Date()}`);
            }
        });
    }

    /**
     * returns all dates from one timeseries
     *
     * @param {object} timeserie - name of the timeseries
     * @returns {Array} - array of dates and rules
     */
    getDateListTimeserie(timeserie) {
        this.ioUtil.logsilly(`getDateListTimeserie ${timeserie.tsname}`);
        let datelistadd = [];
        let datelistdel = [];
        if (timeserie.rules.length === 0) {
            return [];
        }
        for (let i = 0; i < timeserie.rules.length; i++) {
            const r = timeserie.rules[i] || {};
            if (Object.keys(r).length === 0) {
                continue;
            }
            const [type, mode] = r.mode.split('-');
            if (type === 'date') {
                const dates = r.dates.map(el => ({ rule: r.name, date: el }));
                if (mode === 'add') {
                    datelistadd = datelistadd.concat(dates);
                }
                if (mode === 'del') {
                    datelistdel = datelistdel.concat(dates);
                }
            }
            if (type === 'rule') {
                let options = {};
                /**
                 * Converts a string or number value into an array of integer values.
                 * If the value is a string, it is split by commas and each value is converted to a number.
                 * If the value is a number, it is returned as is.
                 * If the value is undefined or null, undefined is returned.
                 * If the value is an empty string, undefined is returned.
                 * If the value contains non-integer values, undefined is returned.
                 *
                 * @param {string|number} value - the value to convert
                 * @returns {Array<number>|number|undefined} - the converted array of integer values
                 */
                function convertByValues(value) {
                    if (value === undefined || value === null) {
                        return undefined;
                    }

                    const str = String(value).trim();
                    if (str === '') {
                        return undefined;
                    }

                    if (str.includes(',')) {
                        const nums = str
                            .split(',')
                            .map(el => el.trim())
                            .filter(n => n !== '' && n !== '0')

                            .map(el => Number(el))
                            .filter(n => Number.isInteger(n));

                        return nums;
                    }

                    // Einzelner Wert
                    const n = Number(str);
                    if (n === 0) {
                        return undefined;
                    }
                    if (Number.isInteger(n)) {
                        return n;
                    }

                    return undefined;
                }
                const DATE_MAX = new Date(8640000000000000);
                const DATE_MIN = new Date(-8640000000000000);
                const DATE_NOW = new Date();
                const DATE_RANGE = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
                options = {
                    ...options,
                    ...{ dtstart: new Date(r.dtstart || DATE_MIN) },
                    ...{ until: new Date(r.until || DATE_MAX) },
                    ...(r.count !== undefined && { count: r.count }),
                    ...(r.interval !== undefined && { interval: parseInt(r.interval) }),
                    ...(r.freq !== undefined && { freq: r.freq }),
                    ...(r.weekstart !== undefined && { wkst: r.weekstart }),
                    ...(r.byweekday !== undefined && { byweekday: convertByValues(r.byweekday) }),
                    ...(r.bymonth !== undefined && { bymonth: convertByValues(r.bymonth) }),
                    ...(r.bysetpos !== undefined && { bysetpos: convertByValues(r.bysetpos) }),
                    ...(r.bymonthday !== undefined && { bymonthday: convertByValues(r.bymonthday) }),
                    ...(r.byyearday !== undefined && { byyearday: convertByValues(r.byyearday) }),
                    ...(r.byweekno !== undefined && { byweekno: convertByValues(r.byweekno) }),
                    ...(r.byhour !== undefined && { byhour: convertByValues(r.byhour) }),
                    ...(r.byminute !== undefined && { byminute: convertByValues(r.byminute) }),
                };
                /*                 options = {
                                    ...options,
                                    ...{ dtstart: new Date(Math.max(Number(options.dtstart), Number(DATE_NOW))) },
                                    ...{ until: new Date(Math.min(Number(options.until), Number(DATE_RANGE))) },
                                }; */

                const max = 100;
                let dates = new RRule(options)
                    .between(DATE_NOW, DATE_RANGE, true, (d, index) => index < max)
                    .map(el => ({ rule: r.name, date: el }));
                if (
                    // check if suntimes is defined and has entries and if longitude and latitude has valid values and in range

                    r.freq <= RRule.DAILY &&
                    r.latitude !== undefined &&
                    r.longitude !== undefined &&
                    r.latitude !== '' &&
                    r.longitude !== '' &&
                    !isNaN(r.latitude) &&
                    !isNaN(r.longitude) &&
                    r.latitude >= -90 &&
                    r.latitude <= 90 &&
                    r.longitude >= -180 &&
                    r.longitude <= 180
                ) {
                    const suntimes = [];
                    const moontimes = [];
                    if (r.suntimes && r.suntimes.length > 0) {
                        // calculate astro dates for each entry in the generated dates
                        dates.forEach(dateEntry => {
                            const times = SunCalc.getSunTimes(new Date(dateEntry.date), r.latitude, r.longitude);
                            r.suntimes.forEach(suntime => {
                                if (times[suntime] === undefined) {
                                    return;
                                }
                                const astrodate = times[suntime];
                                suntimes.push({ rule: r.name, date: astrodate.value.toISOString() });
                            });
                        });
                    }
                    if (r.moontimes && r.moontimes.length > 0) {
                        // calculate astro dates for each entry in the generated dates
                        dates.forEach(dateEntry => {
                            const times = SunCalc.getMoonTimes(new Date(dateEntry.date), r.latitude, r.longitude);
                            r.moontimes.forEach(moontime => {
                                let key;
                                switch (moontime) {
                                    case 'moonrise':
                                        key = 'rise';
                                        break;
                                    case 'moonset':
                                        key = 'set';
                                        break;
                                    case 'moonhigh':
                                        key = 'highest';
                                        break;
                                    default:
                                        return '';
                                }
                                if (times[key] === undefined) {
                                    return;
                                }
                                const astrodate = times[key];
                                moontimes.push({ rule: r.name, date: astrodate.toISOString() });
                            });
                        });
                    }

                    dates = suntimes.concat(moontimes);
                    dates = dates.sort(compareDates);
                }
                // limit dates array to the number of r.count if defined
                if (r.count !== undefined && r.count > 0) {
                    dates = dates.slice(0, r.count);
                }
                if (mode === 'add') {
                    datelistadd = datelistadd.concat(dates);
                }
                if (mode === 'del') {
                    datelistdel = datelistdel.concat(dates);
                }
            }
        }
        function compareDates(a, b) {
            return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
        }
        datelistadd = [...new Set(datelistadd)];
        datelistdel = [...new Set(datelistdel)]; // remove duplicates
        let datelist = datelistadd.filter(el => !datelistdel.includes(el));
        datelist = datelist.sort(compareDates);
        return datelist;
    }
    /**
     * Activates a timeout for a given timeseries event.
     *
     * Logs the activation details, clears any existing timeout, sets the state to 'run',
     * generates a new timer ID, and schedules the deactivation after the specified duration.
     *
     * @param ts - The timeseries event object containing the properties:
     *   - ts.ts {string}: The identifier for the event.
     *   - ts.date {Date}: The date and time of the event.
     *   - ts.duration {number}: The duration in seconds for which the event should be active.
     *   - ts.timerid {number}: The current timer ID for the event.
     */
    doTimeoutActivate(ts) {
        this.ioUtil.logdebug(`doTimeoutActivate '${ts.ts}' with '${ts.date}' dur '${ts.duration}' at ${new Date()}`);
        this.ioUtil.clearTimeout(ts.timerid);
        this.ioUtil.setState('action', 'run', this.timeseriesPath, ts.ts);
        ts.timerid = Math.floor(Math.random() * 100000000);
        this.ioUtil.setTimeout(ts.timerid, this.doTimeoutDeactivate.bind(this), ts.duration * 1000, ts);
    }
    /**
     * Deactivates a timeseries event after its duration has passed.
     *
     * Logs the deactivation details, clears any existing timeout, sets the state to 'stop',
     * and marks the timer ID as 'finished'.
     *
     * @param ts - The timeseries event object containing the properties:
     *   - ts.ts {string}: The identifier for the event.
     *   - ts.date {Date}: The date and time of the event.
     *   - ts.duration {number}: The duration in seconds for which the event should be active.
     *   - ts.timerid {number|string}: The current timer ID for the event, or 'finished' if the event has been deactivated.
     */
    doTimeoutDeactivate(ts) {
        this.ioUtil.logdebug(`doTimeoutDeactivate '${ts.ts}' with '${ts.date}' dur '${ts.duration}' at ${new Date()}`);
        this.ioUtil.clearTimeout(ts.timerid);
        ts.timerid = 'finished';
        this.ioUtil.setState('action', 'stop', this.timeseriesPath, ts.ts);
    }
}
/**
 * Filter an object by keeping only the given keys.
 *
 * @param obj The object to be filtered.
 * @param keepKeys An array of keys to keep.
 * @returns A new object with only the given keys.
 */
function filterObject(obj, keepKeys) {
    const filteredObj = {};
    for (const key in obj) {
        if (keepKeys.includes(key)) {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
}
module.exports = {
    mytimeTimeserie,
};
