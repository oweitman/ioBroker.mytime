/* global $, jQuery, vis */
import { toBoolSafe } from '../support/util.js';

const countdownNixie = {
    intervaltime: 500,
    flips: [],
    createWidget: function (widgetID, view, data, style) {
        var $div = $(`#${widgetID}`);
        // if nothing found => wait
        if (!$div.length || !jQuery().mtFlipClock) {
            return setTimeout(function () {
                vis.binds['mytime'].countdownnixie.createWidget(widgetID, view, data, style);
            }, 100);
        }
        var countdown_oid = data.countdown_oid ? vis.binds['mytime'].getCountdownId(data.countdown_oid) : null;
        if (countdown_oid === false) {
            console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
            return;
        }
        var mytime = vis.binds['mytime'];
        var showsec = toBoolSafe(data.countdown_showsec);
        var showmin = toBoolSafe(data.countdown_showmin);
        var showhrs = toBoolSafe(data.countdown_showhrs);
        var showday = toBoolSafe(data.countdown_showday);
        var showweek = toBoolSafe(data.countdown_showweek);
        var showmonth = toBoolSafe(data.countdown_showmonth);
        var showyear = toBoolSafe(data.countdown_showyear);
        var units = {
            years: showyear,
            months: showmonth,
            weeks: showweek,
            days: showday,
            hours: showhrs,
            minutes: showmin,
            seconds: showsec,
        };
        var error = mytime.validateCountdownUnits(units);
        if (error) {
            return error;
        }

        var color_act = data.countdown_color_active || '#FFE548';
        var color_inact = data.countdown_color_inactive || '#323232';
        var opacity_inact = data.countdown_opacity_inactive || 0.35;
        var glowcolor = data.countdown_glowcolor || '#F58732';

        function onChange(e /* , newVal, oldVal */) {
            var idParts = e.type.split('.');
            var dp = idParts[idParts.length - 2];
            if (dp != 'action' && dp != 'timer' && dp != 'start' && dp != 'end') {
                return;
            }
            vis.binds['mytime'].countdownnixie.setState(widgetID, data, vis.binds['mytime'].countdownnixie.setState);
        }

        if (countdown_oid) {
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

        text += `#${widgetID} .cdclock p.separator,\n`;
        text += `#${widgetID} .cdclock section p.active {\n`;
        text += `    color: ${color_act};\n`;
        text += `    text-shadow: 0px 0px 20px ${glowcolor};\n`;
        text += '}\n';
        text += `#${widgetID} .cdclock  {\n`;
        text += `    color: ${color_inact}${`0${parseInt(255 * opacity_inact).toString(16)}`.slice(-2)};\n`;
        text += '}\n';

        text += '</style>\n';

        text += '<div class="cdclock">\n';
        if (showyear) {
            text += '    <section class="years">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        if (showyear && (showmonth || showweek || showday || showhrs || showmin || showsec)) {
            text += '    <p class="separator">:</p>\n';
        }
        if (showmonth) {
            text += '    <section class="months">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        if (showmonth && (showday || showhrs || showmin || showsec)) {
            text += '    <p class="separator">:</p>\n';
        }
        if (showweek) {
            text += '    <section class="weeks">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        if (showweek && (showday || showhrs || showmin || showsec)) {
            text += '    <p class="separator">:</p>\n';
        }
        if (showday) {
            text += '    <section class="days">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        if (showday && showhrs) {
            text += '    <p class="separator">:</p>\n';
        }
        if (showhrs) {
            text += '    <section class="hours">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        if (showhrs && showmin) {
            text += '    <p class="separator">:</p>\n';
        }
        if (showmin) {
            text += '    <section class="mins">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        if (showmin && showsec) {
            text += '    <p class="separator">:</p>\n';
        }
        if (showsec) {
            text += '    <section class="secs">\n';
            text += '        <div class="tens">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '        <div class="ones">\n';
            text += '            <p>0</p>\n';
            text += '            <p>1</p>\n';
            text += '            <p>2</p>\n';
            text += '            <p>3</p>\n';
            text += '            <p>4</p>\n';
            text += '            <p>5</p>\n';
            text += '            <p>6</p>\n';
            text += '            <p>7</p>\n';
            text += '            <p>8</p>\n';
            text += '            <p>9</p>\n';
            text += '        </div>\n';
            text += '    </section>\n';
        }
        text += '</div>\n';

        text += '<div class="timer"></div>';
        $(`#${widgetID}`).html(text);

        vis.binds['mytime'].stopTimer(widgetID);
        vis.binds['mytime'].countdownnixie.setState(widgetID, data);
        if (countdown_oid) {
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownnixie.intervaltime,
                vis.binds['mytime'].countdownnixie.setState,
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

        var mytime = vis.binds['mytime'];
        var showsec = toBoolSafe(data.countdown_showsec);
        var showmin = toBoolSafe(data.countdown_showmin);
        var showhrs = toBoolSafe(data.countdown_showhrs);
        var showday = toBoolSafe(data.countdown_showday);
        var showweek = toBoolSafe(data.countdown_showweek);
        var showmonth = toBoolSafe(data.countdown_showmonth);
        var showyear = toBoolSafe(data.countdown_showyear);
        var units = {
            years: showyear,
            months: showmonth,
            weeks: showweek,
            days: showday,
            hours: showhrs,
            minutes: showmin,
            seconds: showsec,
        };
        var error = mytime.validateCountdownUnits(units);
        if (error) {
            return error;
        }

        var now = new Date().getTime() - (vis.binds['mytime'].serversync.serverTimeDiff || 0);
        var ms = 0;
        if (action == 'stop' || action == '') {
            $(`#${widgetID} .cdclock`).removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
            vis.binds['mytime'].stopTimer(widgetID);
            ms = stopbehaviour == 'timer' ? timer : 0;
        }
        if (action == 'run') {
            ms = end - now;
            $(`#${widgetID} .cdclock`).removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownnixie.intervaltime,
                vis.binds['mytime'].countdownnixie.setState,
            );
        }
        if (action == 'pause') {
            $(`#${widgetID} .cdclock`).removeClass('cdstop cdrun cdpause cdend').addClass('cdpause');
            vis.binds['mytime'].stopTimer(widgetID);
            ms = end - start;
        }
        if (ms <= 0) {
            ms = 0;
            vis.binds['mytime'].stopTimer(widgetID);
        }
        if (action == 'end') {
            $(`#${widgetID} .cdclock`).removeClass('cdstop cdrun cdpause cdend').addClass('cdend');
            vis.binds['mytime'].stopTimer(widgetID);
            if (stopbehaviour == 'timer') {
                ms = timer;
            } else {
                ms = 0;
            }
        }

        let cdObj;
        let format = '';
        if (units.weeks) {
            format = 'YYYY:ww:dd:HH:mm:ss';
        } else {
            format = 'YYYY:MM:dd:HH:mm:ss';
        }
        if (action == 'end' || action == 'stop') {
            cdObj = vis.binds['mytime'].formatDateFromMs(ms, format).split(':');
        }
        if (action == 'run') {
            cdObj = vis.binds['mytime'].formatDateFromRange(now, end, format).split(':');
        }
        if (action == 'pause') {
            cdObj = vis.binds['mytime'].formatDateFromRange(start, end, format).split(':');
        }

        if (showyear) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .years`), cdObj[0]);
        }
        if (showmonth) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .months`), cdObj[1]);
        }
        if (showweek) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .weeks`), cdObj[1]);
        }
        if (showday) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .days`), cdObj[2]);
        }
        if (showhrs) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .hours`), cdObj[3]);
        }
        if (showmin) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .mins`), cdObj[4]);
        }
        if (showsec) {
            vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .secs`), cdObj[5]);
        }
    },
    setDigits: function (section, digit) {
        const tens = [...$(section).find('.tens')[0].children];
        const ones = [...$(section).find('.ones')[0].children];
        var l = digit.length;
        tens.forEach(number => number.classList.remove('active'));
        tens[digit[l - 2]].classList.add('active');
        ones.forEach(number => number.classList.remove('active'));
        ones[digit[l - 1]].classList.add('active');
    },
};

export default countdownNixie;
