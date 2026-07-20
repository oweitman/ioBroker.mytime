/* global vis */
import fallbackTimezones from '../timezones.js';

const timezones = {
    getTimezones: function () {
        if (typeof Intl.supportedValuesOf === 'function') {
            return [...new Set(['UTC', ...Intl.supportedValuesOf('timeZone')])];
        }
        return fallbackTimezones;
    },
    convertDate2Timezone: function (date, tzString) {
        return new Date(
            (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }),
        );
    },
    getCurrentTimezone: function () {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
    attrSelect: function (wid_attr, options) {
        var line = {};
        if (wid_attr === 'timezone') {
            options = this.getTimezones();
            var html = '';
            var currentTimezone = vis.widgets[vis.activeWidgets].data.timezone || this.getCurrentTimezone();
            for (var i = 0; i < options.length; i++) {
                if (options[i] === currentTimezone) {
                    html += `<option value="${options[i]}" selected="selected">${options[i]}</option>`;
                } else {
                    html += `<option value="${options[i]}">${options[i]}</option>`;
                }
            }
            //Intl.DateTimeFormat().resolvedOptions().timeZone
            line = {
                input: `<select type="text" id="inspect_${wid_attr}">${html}</select>`,
            };
        }
        return line;
    },
};

export default timezones;
