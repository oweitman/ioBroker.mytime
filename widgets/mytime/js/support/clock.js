/* global vis */

const clock = {
    getClockDate: function (data) {
        var now = Date.now();
        if ((data.clock_time_source || 'client') === 'server') {
            now -= vis.binds['mytime'].serversync.serverTimeDiff || 0;
        }
        return new Date(now);
    },
    getClockParts: function (data) {
        var date = vis.binds['mytime'].getClockDate(data);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        };
    },
    formatClockDate: function (date, format) {
        var pad = vis.binds['mytime'].pad;
        var values = {
            YYYY: pad(date.getFullYear(), 4),
            YY: pad(date.getFullYear() % 100, 2),
            MM: pad(date.getMonth() + 1, 2),
            M: date.getMonth() + 1,
            DD: pad(date.getDate(), 2),
            D: date.getDate(),
            HH: pad(date.getHours(), 2),
            H: date.getHours(),
            mm: pad(date.getMinutes(), 2),
            m: date.getMinutes(),
            ss: pad(date.getSeconds(), 2),
            s: date.getSeconds(),
        };
        return (format || 'DD.MM.YYYY HH:mm:ss').replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g, token => values[token]);
    },
};

export default clock;
