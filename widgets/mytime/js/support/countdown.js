/* global vis */
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration);

const countdown = {
    formatDate: function (ms, format) {
        function ii(i, len) {
            var s = `${i}`;
            len = len || 2;
            while (s.length < len) {
                s = `0${s}`;
            }
            return s;
        }

        var pattern =
            (format.search(/(^|[^\\])d/g) >= 0 ? '1' : '0') +
            (format.search(/(^|[^\\])H/g) >= 0 ? '1' : '0') +
            (format.search(/(^|[^\\])m/g) >= 0 ? '1' : '0') +
            (format.search(/(^|[^\\])s/g) >= 0 ? '1' : '0');

        if (pattern.indexOf('101') >= 0 || pattern.indexOf('1001') >= 0) {
            return 'Error: Invalid Format';
        }

        var cdObj = vis.binds['mytime'].calcCountdownFromMiliSeconds(ms, pattern);

        var d = cdObj.days;
        format = format.replace(/(^|[^\\])dd/g, `$1${ii(d)}`);
        format = format.replace(/(^|[^\\])d/g, `$1${d}`);

        var H = cdObj.hours;
        format = format.replace(/(^|[^\\])HH+/g, `$1${ii(H)}`);
        format = format.replace(/(^|[^\\])H/g, `$1${H}`);

        var m = cdObj.minutes;
        format = format.replace(/(^|[^\\])mm+/g, `$1${ii(m)}`);
        format = format.replace(/(^|[^\\])m/g, `$1${m}`);

        var s = cdObj.seconds;
        format = format.replace(/(^|[^\\])ss+/g, `$1${ii(s)}`);
        format = format.replace(/(^|[^\\])s/g, `$1${s}`);

        format = format.replace(/\\(.)/g, '$1');

        return format;
    },
    // ****************************************************************
    // Helper: Zahl mit fÃ¼hrenden Nullen auffÃ¼llen
    pad: function (i, len) {
        var s = `${i}`;
        len = len || 2;
        while (s.length < len) {
            s = `0${s}`;
        }
        return s;
    },

    // Helper: prÃ¼ft, ob ein (nicht-escaped) Placeholder im Format vorkommt
    hasToken: function (format, letter) {
        // (^|[^\\])X+  -> ein X oder mehrere, nicht escaped
        var re = new RegExp(`(^|[^\\\\])${letter}+`);
        return re.test(format);
    },

    // Einheiten aus dem Format extrahieren
    parseCountdownUnits: function (format) {
        return {
            years: vis.binds['mytime'].hasToken(format, 'Y'), // Jahre
            months: vis.binds['mytime'].hasToken(format, 'M'), // Monate
            weeks: vis.binds['mytime'].hasToken(format, 'w'), // Wochen
            days: vis.binds['mytime'].hasToken(format, 'd'), // Tage
            hours: vis.binds['mytime'].hasToken(format, 'H'), // Stunden
            minutes: vis.binds['mytime'].hasToken(format, 'm'), // Minuten
            seconds: vis.binds['mytime'].hasToken(format, 's'), // Sekunden
        };
    },

    // Pattern validieren (keine LÃ¼cken, nicht M und w gleichzeitig)
    validateCountdownUnits: function (units) {
        // M und w dÃ¼rfen nie zusammen vorkommen
        if (units.months && units.weeks) {
            return 'Error: Invalid Format (cannot mix months (M) and weeks (w))';
        }

        // Slots: Y | (M oder w) | d | H | m | s
        var slots = [units.years, units.months || units.weeks, units.days, units.hours, units.minutes, units.seconds];

        var pattern = slots
            .map(function (b) {
                return b ? '1' : '0';
            })
            .join('');

        // Die 1er mÃ¼ssen zusammenhÃ¤ngend sein (keine LÃ¼cken)
        var first = pattern.indexOf('1');
        if (first !== -1) {
            var last = pattern.lastIndexOf('1');
            var middle = pattern.slice(first, last + 1);
            if (middle.indexOf('0') !== -1) {
                // Es gibt eine LÃ¼cke in den Einheiten
                return 'Error: Invalid Format';
            }
        }

        return null; // alles okay
    },
    calcCountdownFromMilliseconds: function (ms, units) {
        var now = dayjs();
        var end = now.add(ms, 'millisecond');
        return vis.binds['mytime'].calcCountdownFromDates(now, end, units);
    },
    calcCountdownFromDates: function (start, end, units) {
        var from = dayjs(start);
        var to = dayjs(end);

        if (!to.isValid() || !from.isValid()) {
            return {
                years: 0,
                months: 0,
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        // Negativer Countdown -> alles 0
        if (to.isBefore(from)) {
            return {
                years: 0,
                months: 0,
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        var result = {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        // Helper: diff & advance
        function take(unit) {
            var diff = to.diff(from, unit);
            if (diff > 0) {
                from = from.add(diff, unit);
            }
            return diff;
        }

        // --- Jahre ---
        if (units.years) {
            // z.B. 2020-02-01 bis 2025-02-01 -> 5 Jahre (inkl. Schaltjahr korrekt)
            result.years = take('year');
        }

        // --- Monate ODER Wochen ---
        if (units.months) {
            // Wichtig: wenn Y deaktiviert, sollen alle Monate aufsummiert werden.
            // Das ist bereits erfÃ¼llt, weil 'from' dann noch das Original-Startdatum ist.
            result.months = take('month'); // echte Monate, inkl. Feb/Schaltjahr, 30/31 Tage usw.
        } else if (units.weeks) {
            // Wochen machen wir sinnvoll aus dem Rest in Tagen
            // diff in Tagen (kalendarisch)
            var totalDays = to.diff(from, 'day');
            result.weeks = Math.floor(totalDays / 7);
            if (result.weeks > 0) {
                from = from.add(result.weeks * 7, 'day');
            }
        }

        // --- Tage ---
        if (units.days) {
            result.days = take('day'); // echte Kalendertage
        }

        // --- Stunden ---
        if (units.hours) {
            result.hours = take('hour');
        }

        // --- Minuten ---
        if (units.minutes) {
            result.minutes = take('minute');
        }

        // --- Sekunden ---
        if (units.seconds) {
            result.seconds = take('second');
        }

        return result;
    },
    formatDateFromMs: function (ms, format) {
        var mytime = vis.binds['mytime'];

        // Units aus format bestimmen
        var units = mytime.parseCountdownUnits(format);

        // Validieren (inkl. M XOR w, keine LÃ¼cken)
        var error = mytime.validateCountdownUnits(units);
        if (error) {
            return error;
        }

        // Countdown-Werte aus ms berechnen
        var cdObj = mytime.calcCountdownFromMilliseconds(ms, units);

        // Platzhalter ersetzen
        return mytime.applyCountdownFormat(format, units, cdObj);
    },
    formatDateFromRange: function (startMs, endMs, format) {
        var mytime = vis.binds['mytime'];

        // Units aus format bestimmen
        var units = mytime.parseCountdownUnits(format);

        // Validieren
        var error = mytime.validateCountdownUnits(units);
        if (error) {
            return error;
        }

        // Countdown-Werte aus Start/Ende berechnen (kalendarisch korrekt, falls so implementiert)
        var cdObj = mytime.calcCountdownFromDates(startMs, endMs, units);

        // Platzhalter ersetzen
        return mytime.applyCountdownFormat(format, units, cdObj);
    },
    applyCountdownFormat: function (format, units, cdObj) {
        var pad = vis.binds['mytime'].pad;

        // Jahre: Y / YY / YYYY
        if (units.years) {
            var Y = cdObj.years;
            format = format.replace(/(^|[^\\])YYYY/g, function (_m, p1) {
                return p1 + pad(Y, 4);
            });
            format = format.replace(/(^|[^\\])YY/g, function (_m, p1) {
                return p1 + pad(Y, 2);
            });
            format = format.replace(/(^|[^\\])Y/g, function (_m, p1) {
                return p1 + Y;
            });
        }

        // Monate: M / MM
        if (units.months) {
            var M = cdObj.months;
            format = format.replace(/(^|[^\\])MM/g, function (_m, p1) {
                return p1 + pad(M, 2);
            });
            format = format.replace(/(^|[^\\])M/g, function (_m, p1) {
                return p1 + M;
            });
        }

        // Wochen: w / ww
        if (units.weeks) {
            var w = cdObj.weeks;
            format = format.replace(/(^|[^\\])ww/g, function (_m, p1) {
                return p1 + pad(w, 2);
            });
            format = format.replace(/(^|[^\\])w/g, function (_m, p1) {
                return p1 + w;
            });
        }

        // Tage: d / dd
        if (units.days) {
            var d = cdObj.days;
            format = format.replace(/(^|[^\\])dd/g, function (_m, p1) {
                return p1 + pad(d, 2);
            });
            format = format.replace(/(^|[^\\])d/g, function (_m, p1) {
                return p1 + d;
            });
        }

        // Stunden: H / HH
        if (units.hours) {
            var H = cdObj.hours;
            format = format.replace(/(^|[^\\])HH/g, function (_m, p1) {
                return p1 + pad(H, 2);
            });
            format = format.replace(/(^|[^\\])H/g, function (_m, p1) {
                return p1 + H;
            });
        }

        // Minuten: m / mm
        if (units.minutes) {
            var m = cdObj.minutes;
            format = format.replace(/(^|[^\\])mm/g, function (_m, p1) {
                return p1 + pad(m, 2);
            });
            format = format.replace(/(^|[^\\])m/g, function (_m, p1) {
                return p1 + m;
            });
        }

        // Sekunden: s / ss
        if (units.seconds) {
            var s = cdObj.seconds;
            format = format.replace(/(^|[^\\])ss/g, function (_m, p1) {
                return p1 + pad(s, 2);
            });
            format = format.replace(/(^|[^\\])s/g, function (_m, p1) {
                return p1 + s;
            });
        }

        // Escape-Zeichen entfernen (\X -> X)
        format = format.replace(/\\(.)/g, '$1');

        return format;
    },
    // ****************************************************************
};

export default countdown;
