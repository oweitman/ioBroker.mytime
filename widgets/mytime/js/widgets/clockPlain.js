/* global $, vis */

const clockPlain = {
    intervaltime: 250,

    createWidget: function (widgetID, view, data) {
        var $div = $(`#${widgetID}`);
        if (!$div.length) {
            return setTimeout(() => vis.binds['mytime'].clockplain.createWidget(widgetID, view, data), 100);
        }
        $div.html('<div class="timer"></div>');
        vis.binds['mytime'].stopTimer(widgetID);
        vis.binds['mytime'].clockplain.setState(widgetID, data);
        vis.binds['mytime'].startTimer(widgetID, data, clockPlain.intervaltime, clockPlain.setState);
    },
    setState: function (widgetID, data) {
        var value = vis.binds['mytime'].formatClockDate(
            vis.binds['mytime'].getClockDate(data),
            data.clock_format || 'DD.MM.YYYY HH:mm:ss',
        );
        $(`#${widgetID} .timer`).html((data.clock_html_prepend || '') + value + (data.clock_html_append || ''));
    },
};

export default clockPlain;
