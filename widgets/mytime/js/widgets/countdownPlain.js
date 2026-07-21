/* global $, vis */
const countdownPlain = {
    intervaltime: 500,
    createWidget: function (widgetID, view, data, style) {
        var $div = $(`#${widgetID}`);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['mytime'].countdownplain.createWidget(widgetID, view, data, style);
            }, 100);
        }

        var countdown_oid = data.countdown_oid ? vis.binds['mytime'].getCountdownId(data.countdown_oid) : null;
        if (countdown_oid === false) {
            console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
            return;
        }

        function onChange(e /* , newVal, oldVal */) {
            var idParts = e.type.split('.');
            var dp = idParts[idParts.length - 2];
            if (dp != 'action' && dp != 'timer' && dp != 'start' && dp != 'end') {
                return;
            }
            vis.binds['mytime'].countdownplain.setState(widgetID, data);
        }

        if (countdown_oid) {
            //console.log(`bind states ${widgetID}`);
            vis.binds['mytime'].bindStates(
                $div,
                [
                    `${countdown_oid}.action`,
                    `${countdown_oid}.end`,
                    `${countdown_oid}.timer`,
                    `${countdown_oid}.config`,
                    `${countdown_oid}.start`,
                ],
                onChange,
            );
            //}
        }
        var text = '';
        text += '<div class="timer"></div>';
        $(`#${widgetID}`).html(text);

        vis.binds['mytime'].stopTimer(widgetID);
        vis.binds['mytime'].countdownplain.setState(widgetID, data);
        if (countdown_oid) {
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownplain.intervaltime,
                vis.binds['mytime'].countdownplain.setState,
            );
        }
    },
    setState: function (widgetID, data) {
        var countdown_oid = data.countdown_oid ? vis.binds['mytime'].getCountdownId(data.countdown_oid) : null;
        if (countdown_oid === false) {
            console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
            return;
        }
        var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
        var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
        var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
        var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : 'stop';
        var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || '{}') : {};
        var format = data.countdown_format || 'dd\\d HH\\h mm\\m ss\\s';
        var stopbehaviour = config.stopbehaviour || 'timer';
        var htmlprepend = data.countdown_html_prepend || '';
        var htmlappend = data.countdown_html_append || '';

        var now = new Date().getTime() - (vis.binds['mytime'].serversync.serverTimeDiff || 0);
        var ms = 0;
        if (action == 'stop' || action == '') {
            $(`#${widgetID} .timer`).removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
            vis.binds['mytime'].stopTimer(widgetID);
            ms = stopbehaviour == 'timer' ? timer : 0;
        }
        if (action == 'run') {
            ms = end - now;
            $(`#${widgetID} .timer`).removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownplain.intervaltime,
                vis.binds['mytime'].countdownplain.setState,
            );
        }
        if (action == 'pause') {
            $(`#${widgetID} .timer`).removeClass('cdstop cdrun cdpause cdend').addClass('cdpause');
            vis.binds['mytime'].stopTimer(widgetID);
            ms = end - start;
        }
        if (ms <= 0) {
            ms = 0;
            vis.binds['mytime'].stopTimer(widgetID);
        }
        if (action == 'end') {
            $(`#${widgetID} .timer`).removeClass('cdstop cdrun cdpause cdend').addClass('cdend');
            vis.binds['mytime'].stopTimer(widgetID);
            if (stopbehaviour == 'timer') {
                ms = timer;
            } else {
                ms = 0;
            }
        }

        var text = '';
        if (action == 'end' || action == 'stop') {
            text += vis.binds['mytime'].formatDateFromMs(ms, format);
        }
        if (action == 'run') {
            text += vis.binds['mytime'].formatDateFromRange(now, end, format);
        }
        if (action == 'pause') {
            text += vis.binds['mytime'].formatDateFromRange(start, end, format);
        }
        $(`#${widgetID} .timer`).html(htmlprepend + text + htmlappend);
    },
};

export default countdownPlain;
