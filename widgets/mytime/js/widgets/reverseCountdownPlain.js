/* global $, vis */
const reverseCountdownPlain = {
    intervaltime: 500,
    createWidget: function (widgetID, view, data, style) {
        var $div = $(`#${widgetID}`);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['mytime'].reversecountdownplain.createWidget(widgetID, view, data, style);
            }, 100);
        }

        data.datetime = data.countdown_datetime || new Date().toISOString();

        var text = '';
        text += '<div class="timer"></div>';
        $(`#${widgetID}`).html(text);

        vis.binds['mytime'].stopTimer(widgetID);
        vis.binds['mytime'].startTimer(
            widgetID,
            data,
            vis.binds['mytime'].reversecountdownplain.intervaltime,
            vis.binds['mytime'].reversecountdownplain.setState,
        );
        if (vis.editMode) {
            vis.binds['mytime'].reversecountdownplain.setState(widgetID, data);
        }
    },
    setState: function (widgetID, data) {
        // var countdown_oid;
        var format = data.countdown_format || 'dd\\d HH\\h mm\\m ss\\s';
        var htmlprepend = data.countdown_html_prepend || '';
        var htmlappend = data.countdown_html_append || '';

        var now = new Date().getTime() - (vis.binds['mytime'].serversync.serverTimeDiff || 0);
        var end = new Date(data.datetime).getTime();

        var text = '';
        text += vis.binds['mytime'].formatDateFromRange(now, end, format);
        $(`#${widgetID} .timer`).html(htmlprepend + text + htmlappend);
    },
};

export default reverseCountdownPlain;
