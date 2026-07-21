/* global $, jQuery, vis */
import { toBoolSafe } from '../support/util.js';

const countdownFlip = {
    intervaltime: 500,
    flips: [],
    createWidget: function (widgetID, view, data, style) {
        var $div = $(`#${widgetID}`);
        // if nothing found => wait
        if (!$div.length || !jQuery().mtFlipClock) {
            return setTimeout(function () {
                vis.binds['mytime'].countdownflip.createWidget(widgetID, view, data, style);
            }, 100);
        }
        var countdown_oid = data.countdown_oid ? vis.binds['mytime'].getCountdownId(data.countdown_oid) : null;
        if (countdown_oid === false) {
            console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
            return;
        }

        var showsec = toBoolSafe(data.countdown_showsec);
        var showmin = toBoolSafe(data.countdown_showmin);
        var showhrs = toBoolSafe(data.countdown_showhrs);
        var showday = toBoolSafe(data.countdown_showday);

        var font = style['font-family'] && style['font-family'] != '' ? style['font-family'] : '';
        var color = data.countdown_color ? data.countdown_color : '';
        var bcolor = data.countdown_background_color ? data.countdown_background_color : '';
        var dotcolor = data.countdown_dot_color ? data.countdown_dot_color : '';

        var pattern = (showday ? '1' : '0') + (showhrs ? '1' : '0') + (showmin ? '1' : '0') + (showsec ? '1' : '0');

        if (pattern.indexOf('101') >= 0 || pattern.indexOf('1001') >= 0) {
            $(`#${widgetID}`).html('Error: Invalid Format');
            return;
        }

        function onChange(e /* , newVal, oldVal */) {
            var idParts = e.type.split('.');
            var dp = idParts[idParts.length - 2];
            if (dp != 'action' && dp != 'timer' && dp != 'start' && dp != 'end') {
                return;
            }
            vis.binds['mytime'].countdownflip.setState(widgetID, data, vis.binds['mytime'].countdownflip.setState);
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
        text += '<style>\n';
        if (font != '') {
            text += `#${widgetID} .flip-clock-wrapper {\n`;
            text += `   font-family:  ${font};\n`;
            text += '}\n';
        }
        if (bcolor != '' || color != '') {
            text += `#${widgetID} .flip-clock-wrapper ul li a div div.inn {\n`;
            if (bcolor != '') {
                text += `   background-color:  ${bcolor};\n`;
            }
            if (color != '') {
                text += `   color:  ${color};\n`;
            }
            text += '}\n';
        }
        if (dotcolor != '') {
            text += `#${widgetID} .flip-clock-dot {\n`;
            text += `   background-color:  ${dotcolor};\n`;
            text += '}\n';
        }
        text += '</style>\n';

        text += '<div class="timer"></div>';
        $(`#${widgetID}`).html(text);

        vis.binds['mytime'].countdownflip.flips[widgetID] = $(`#${widgetID} .timer`).mtFlipClock(0, {
            clockFace: 'Mytime',
            countdown: true,
            autoStart: false,
            pattern: pattern,
        });
        vis.binds['mytime'].stopTimer(widgetID);
        vis.binds['mytime'].countdownflip.setState(widgetID, data);
        if (countdown_oid) {
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownflip.intervaltime,
                vis.binds['mytime'].countdownflip.setState,
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
        var stopbehaviour = config.stopbehaviour || 'timer';

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
                vis.binds['mytime'].countdownflip.intervaltime,
                vis.binds['mytime'].countdownflip.setState,
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
        if (ms > 8639999000) {
            ms = 8639999000;
        }
        vis.binds['mytime'].countdownflip.flips[widgetID].setTime(parseInt(ms / 1000));
    },
};

export default countdownFlip;
