/*
    ioBroker.vis mytime Widget-Set

    version: "0.0.1"

    Copyright 2020 oweitman oweitman@gmx.de
*/
'use strict';

import { version as pkgVersion } from '../../../package.json';

/* global $, systemDictionary, jQuery, vis */
// add translations for edit mode
fetch('widgets/mytime/i18n/translations.json').then(async res => {
    let i18n = await res.json();

    $.extend(
        true, //
        systemDictionary,
        i18n,
    );
});

// this code can be placed directly in mytime.html
vis.binds['mytime'] = {
    version: pkgVersion,
    showVersion: function () {
        if (vis.binds['mytime'].version) {
            console.log(`Version mytime: ${vis.binds['mytime'].version}`);
            vis.binds['mytime'].version = null;
        }
    },
    intervals: [],
    serversync: {},
    countdownnixie: {
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
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            var showsec = data.countdown_showsec;
            var showmin = data.countdown_showmin;
            var showhrs = data.countdown_showhrs;
            var showday = data.countdown_showday;

            // var font = (style['font-family'] && style['font-family'] != '') ? style['font-family'] : '';

            var color_act = data.countdown_color_active || '#FFE548';
            var color_inact = data.countdown_color_inactive || '#323232';
            var opacity_inact = data.countdown_opacity_inactive || 0.35;
            var glowcolor = data.countdown_glowcolor || '#F58732';

            var pattern = (showday ? '1' : '0') + (showhrs ? '1' : '0') + (showmin ? '1' : '0') + (showsec ? '1' : '0');

            if (pattern.indexOf('101') >= 0 || pattern.indexOf('1001') >= 0) {
                $(`#${widgetID}`).html('Error: Invalid Format');
                return;
            }

            function onChange(e /* , newVal, oldVal */) {
                var idParts = e.type.split('.');
                if (idParts[idParts.length - 2] != 'action' && idParts[idParts.length - 2] != 'timer') {
                    return;
                }
                vis.binds['mytime'].countdownnixie.setState(
                    widgetID,
                    data,
                    vis.binds['mytime'].countdownnixie.setState,
                );
            }

            if (countdown_oid) {
                //if (!vis.editMode) {
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

            text += '<style> \n';

            text += `#${widgetID} .cdclock p.separator,\n`;
            text += `#${widgetID} .cdclock section p.active {\n`;
            text += `    color: ${color_act};\n`;
            text += `    text-shadow: 0px 0px 20px ${glowcolor};\n`;
            text += '}\n';
            text += `#${widgetID} .cdclock  {\n`;
            text += `    color: ${color_inact}${`0${parseInt(255 * opacity_inact).toString(16)}`.slice(-2)};\n`;
            text += '}\n';

            text += '</style> \n';

            text += '<div class="cdclock">\n';

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
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownnixie.intervaltime,
                vis.binds['mytime'].countdownnixie.setState,
            );
            if (vis.editMode) {
                vis.binds['mytime'].countdownnixie.setState(widgetID, data);
            }
        },
        setState: function (widgetID, data) {
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
            var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
            var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
            var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : 'stop';
            var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || '{}') : {};
            var stopbehaviour = config.stopbehaviour || 'timer';

            var showsec = data.countdown_showsec;
            var showmin = data.countdown_showmin;
            var showhrs = data.countdown_showhrs;
            var showday = data.countdown_showday;

            /*             var pattern = ((showday) ? "1" : "0") +
                            ((showhrs) ? "1" : "0") +
                            ((showmin) ? "1" : "0") +
                            ((showsec) ? "1" : "0"); */

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
                ms = 0;
            }

            var cdObj = vis.binds['mytime'].formatDate(ms, 'dd:HH:mm:ss').split(':');
            if (showday) {
                vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .days`), cdObj[0]);
            }
            if (showhrs) {
                vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .hours`), cdObj[1]);
            }
            if (showmin) {
                vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .mins`), cdObj[2]);
            }
            if (showsec) {
                vis.binds['mytime'].countdownnixie.setDigits($(`#${widgetID} .secs`), cdObj[3]);
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
    },
    countdownflip: {
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
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            var showsec = data.countdown_showsec;
            var showmin = data.countdown_showmin;
            var showhrs = data.countdown_showhrs;
            var showday = data.countdown_showday;

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
                if (idParts[idParts.length - 2] != 'action' && idParts[idParts.length - 2] != 'timer') {
                    return;
                }
                vis.binds['mytime'].countdownflip.setState(widgetID, data, vis.binds['mytime'].countdownflip.setState);
            }

            if (countdown_oid) {
                //if (!vis.editMode) {
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
            text += '<style> \n';
            if (font != '') {
                text += `#${widgetID} .flip-clock-wrapper {\n`;
                text += `   font-family:  ${font}; \n`;
                text += '} \n';
            }
            if (bcolor != '' || color != '') {
                text += `#${widgetID} .flip-clock-wrapper ul li a div div.inn {\n`;
                if (bcolor != '') {
                    text += `   background-color:  ${bcolor}; \n`;
                }
                if (color != '') {
                    text += `   color:  ${color}; \n`;
                }
                text += '} \n';
            }
            if (dotcolor != '') {
                text += `#${widgetID} .flip-clock-dot {\n`;
                text += `   background-color:  ${dotcolor}; \n`;
                text += '} \n';
            }
            text += '</style> \n';

            text += '<div class="timer"></div>';
            $(`#${widgetID}`).html(text);

            vis.binds['mytime'].countdownflip.flips[widgetID] = $(`#${widgetID} .timer`).mtFlipClock(0, {
                clockFace: 'Mytime',
                countdown: true,
                autoStart: false,
                pattern: pattern,
            });
            vis.binds['mytime'].stopTimer(widgetID);
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownflip.intervaltime,
                vis.binds['mytime'].countdownflip.setState,
            );
            if (vis.editMode) {
                vis.binds['mytime'].countdownflip.setState(widgetID, data);
            }
        },
        setState: function (widgetID, data) {
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
            var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
            var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
            var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : 'stop';
            var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || '{}') : {};
            var stopbehaviour = config.stopbehaviour || 'timer';

            /*             var showsec = data.countdown_showsec;
                        var showmin = data.countdown_showmin;
                        var showhrs = data.countdown_showhrs;
                        var showday = data.countdown_showday; */

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
                ms = 0;
            }
            vis.binds['mytime'].countdownflip.flips[widgetID].setTime(parseInt(ms / 1000));
        },
    },
    countdowncircle: {
        intervaltime: 500,
        createWidget: function (widgetID, view, data, style) {
            var $div = $(`#${widgetID}`);
            // if nothing found => wait
            if (!$div.length) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdowncircle.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            // var timer = countdown_oid ? vis.states.attr(countdown_oid + '.timer.val') ? vis.states.attr(countdown_oid + '.timer.val') : 0 : 0;
            var showsec = data.countdown_showsec;
            var showmin = data.countdown_showmin;
            var showhrs = data.countdown_showhrs;
            var showday = data.countdown_showday;

            var pattern = (showsec ? '1' : '0') + (showmin ? '1' : '0') + (showhrs ? '1' : '0') + (showday ? '1' : '0');

            if (pattern.indexOf('101') >= 0 || pattern.indexOf('1001') >= 0) {
                $(`#${widgetID}`).html('Error: Invalid Format');
                return;
            }

            function onChange(e /* , newVal, oldVal */) {
                var idParts = e.type.split('.');
                if (idParts[idParts.length - 2] != 'action' && idParts[idParts.length - 2] != 'timer') {
                    return;
                }
                vis.binds['mytime'].countdowncircle.setState(
                    widgetID,
                    data,
                    vis.binds['mytime'].countdowncircle.setState,
                );
            }

            if (countdown_oid) {
                //if (!vis.editMode) {
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

            var width = $(`#${widgetID}`).width();
            var height = $(`#${widgetID}`).height();
            var text = '';

            text += '<style> \n';
            text += `#${widgetID} .timer {\n`;
            text += '   position:  absolute; \n';
            text += '   left:      50%; \n';
            text += '   top:       50%; \n';
            text += '   transform: translate(-50%, -50%); \n';
            text += '} \n';
            text += '</style> \n';

            text += `<canvas class="canvas" width="${width}" height="${height}"></canvas>`;
            text += '<div class="timer"></div>';
            $(`#${widgetID}`).html(text);
            vis.binds['mytime'].stopTimer(widgetID);
            vis.binds['mytime'].countdowncircle.setState(widgetID, data);
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                //vis.binds["mytime"].countdowncircle.calcInterval(timer),
                vis.binds['mytime'].countdowncircle.intervaltime,
                vis.binds['mytime'].countdowncircle.setState,
            );
        },
        calcInterval: function (timer) {
            return Math.min(Math.max(timer / 720, 25), 500);
        },
        setState: function (widgetID, data, callback) {
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
            var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
            var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
            var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : 'stop';
            var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || '{}') : {};
            var linewidth = data.countdown_width || 20;
            var notimetext = data.countdown_notimetext;
            var format = data.countdown_format || 'mm:ss';
            var stopbehaviour = (config && config.stopbehaviour) || 'timer';
            var bcolor = data.countdown_background || 'grey';
            var fcolor = data.countdown_foreground || '#87ceeb';
            var reverse = data.countdown_reverse;
            var caps = data.countdown_caps || 'straight';
            var showsec = data.countdown_showsec;
            var showmin = data.countdown_showmin;
            var showhrs = data.countdown_showhrs;
            var showday = data.countdown_showday;
            var ringgap = data.countdown_ringgap || 5;

            var pattern = (showday ? '1' : '0') + (showhrs ? '1' : '0') + (showmin ? '1' : '0') + (showsec ? '1' : '0');

            var now = new Date().getTime() - (vis.binds['mytime'].serversync.serverTimeDiff || 0);
            var ms = 0;
            if (action == 'stop' || action == '') {
                $(`#${widgetID} .timer`).removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
                vis.binds['mytime'].stopTimer(widgetID);
                ms = stopbehaviour == 'timer' ? timer : 0;
            }
            if (action == 'run') {
                $(`#${widgetID} .timer`).removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
                ms = end - now;
                vis.binds['mytime'].startTimer(
                    widgetID,
                    data,
                    vis.binds['mytime'].countdowncircle.calcInterval(timer),
                    callback,
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
                ms = 0;
            }

            var cdObjnow = vis.binds['mytime'].calcCountdownFromMiliSeconds(ms, pattern);
            var cdObjtimer = vis.binds['mytime'].calcCountdownFromMiliSeconds(timer, pattern);

            var canvas = $(`#${widgetID} canvas`);
            var ctx = canvas[0].getContext('2d');
            vis.binds['mytime'].countdowncircle.clearBase(ctx);

            ctx.lineWidth = linewidth;

            var radius = 0;
            var x = ctx.canvas.width / 2;
            var y = ctx.canvas.height / 2;
            var length = Math.min(ctx.canvas.width, ctx.canvas.height);
            //var radius=(length/2)-(linewidth/2);
            var startangle = 0;
            var bound = 0;
            var gap = 0;
            ['seconds', 'minutes', 'hours', 'days'].forEach(ring => {
                bound = ring == 'seconds' ? length / 2 : radius - linewidth / 2;
                gap = ring == 'seconds' ? 0 : ringgap;
                radius = vis.binds['mytime'].countdowncircle.calcRadius(bound, linewidth, gap);

                if (ring == 'seconds' && pattern[3] == '1') {
                    startangle =
                        pattern[2] == '1'
                            ? (cdObjnow[ring] * 360) / 60 || 0
                            : (cdObjnow[ring] * 360) / cdObjtimer[ring] || 0;
                    if (vis.editMode) {
                        startangle = 180;
                    }
                    vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                    vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, fcolor, caps, reverse);
                }
                if (ring == 'minutes' && pattern[2] == '1') {
                    startangle =
                        pattern[1] == '1'
                            ? (cdObjnow[ring] * 360) / 60 || 0
                            : (cdObjnow[ring] * 360) / cdObjtimer[ring] || 0;
                    if (vis.editMode) {
                        startangle = 180;
                    }
                    vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                    vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, fcolor, caps, reverse);
                }
                if (ring == 'hours' && pattern[1] == '1') {
                    startangle =
                        pattern[0] == '1'
                            ? (cdObjnow[ring] * 360) / 24 || 0
                            : (cdObjnow[ring] * 360) / cdObjtimer[ring] || 0;
                    if (vis.editMode) {
                        startangle = 180;
                    }
                    vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                    vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, fcolor, caps, reverse);
                }
                if (ring == 'days' && pattern[0] == '1') {
                    startangle = (cdObjnow[ring] * 360) / cdObjtimer[ring] || 0;
                    if (vis.editMode) {
                        startangle = 180;
                    }
                    vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                    vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, fcolor, caps, reverse);
                }
            });

            if (!notimetext) {
                vis.binds['mytime'].countdowncircle.drawText(widgetID, ms, format);
            }
        },
        calcRadius: function (bound, linewidth, gap) {
            var radius = bound - linewidth / 2 - gap;
            return radius >= linewidth / 2 ? radius : linewidth / 2;
        },
        clearBase: function (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        },
        drawBase: function (ctx, x, y, radius, color) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 360 * (Math.PI / 180), 0 * (Math.PI / 180), 1);
            ctx.strokeStyle = color; //bcolor
            ctx.stroke();
            ctx.closePath();
        },
        drawRing: function (ctx, x, y, radius, startangle, color, caps, reverse) {
            if (caps == 'straight') {
                ctx.lineCap = 'butt';
            }
            if (caps == 'round') {
                ctx.lineCap = 'round';
            }

            ctx.beginPath();
            ctx.strokeStyle = color;
            var sh = -90 * (Math.PI / 180);

            if (reverse) {
                ctx.arc(x, y, radius, startangle * (Math.PI / 180) + sh, 0 * (Math.PI / 180) + sh, 1);
            } else {
                ctx.arc(x, y, radius, (360 - startangle) * (Math.PI / 180) + sh, 0 * (Math.PI / 180) + sh, 1);
            }
            ctx.stroke();
            ctx.closePath();
        },
        drawText: function (widgetID, ms, format) {
            var text = '';
            text += vis.binds['mytime'].formatDate(ms, format);
            $(`#${widgetID} .timer`).html(text);
        },
    },
    reversecountdownplain: {
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

            var ms = now - end;

            var text = '';
            text += vis.binds['mytime'].formatDate(ms, format);
            $(`#${widgetID} .timer`).html(htmlprepend + text + htmlappend);
        },
    },
    countdownplain: {
        intervaltime: 500,
        createWidget: function (widgetID, view, data, style) {
            var $div = $(`#${widgetID}`);
            // if nothing found => wait
            if (!$div.length) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdownplain.createWidget(widgetID, view, data, style);
                }, 100);
            }

            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }

            function onChange(e /* , newVal, oldVal */) {
                var idParts = e.type.split('.');
                if (idParts[idParts.length - 2] != 'action' && idParts[idParts.length - 2] != 'timer') {
                    return;
                }
                vis.binds['mytime'].countdownplain.setState(widgetID, data);
            }

            if (countdown_oid) {
                //if (!vis.editMode) {
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
            vis.binds['mytime'].startTimer(
                widgetID,
                data,
                vis.binds['mytime'].countdownplain.intervaltime,
                vis.binds['mytime'].countdownplain.setState,
            );
            if (vis.editMode) {
                vis.binds['mytime'].countdownplain.setState(widgetID, data);
            }
        },
        setState: function (widgetID, data) {
            var countdown_oid;
            if (
                !data.countdown_oid ||
                (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false
            ) {
                return;
            }
            var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
            var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
            var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
            var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : 'stop';
            var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || '{}') : {};
            var format = data.countdown_format || 'dd\\d HH\\h mm\\m ss\\s';
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
                ms = 0;
            }

            var text = '';
            text += vis.binds['mytime'].formatDate(ms, format);
            $(`#${widgetID} .timer`).html(text);
        },
    },
    wordclock: {
        lang_pack: [],
        lang_map: {
            english: 'EN',
            german: 'DE',
            swiss: 'CH_BERN',
            swabian: 'DE_SWG',
            italian: 'IT',
            spanish: 'ES',
            russian: 'RU',
            french: 'fr-CA',
            turkish: 'TR',
            dutch: 'NL',
        },
        createWidget: function (widgetID, view, data, style) {
            var $div = $(`#${widgetID}`);
            // if nothing found => wait
            if (!$div.length) {
                return setTimeout(function () {
                    vis.binds['mytime'].wordclock.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var language = data.language || 'english';
            var letterActivated = data.letterActivated || '#fff';
            var letterDeactivated = data.letterDeactivated || '#333';
            var wordclockMargin = data.wordclockMargin || 0;
            var withMinutes = data.withMinutes || false;
            var withSeconds = data.withSeconds || false;
            var minuteSize = data.minuteSize || 5;
            var secondSize = data.secondSize || 5;
            var minuteColor = data.minuteColor || 'green';
            var secondColor = data.secondColor || 'blue';
            var lang_key = this.lang_map[language];
            var lang_pack = this.lang_pack.find(el => el.langCode == lang_key);

            var text = '';
            text += '<style> \n';
            text += `#${widgetID} .wc__frame {\n`;
            text += '   display: table; \n';
            text += '   margin: auto; \n';
            text += '   position: relative; \n';
            text += '   top: 50%; \n';
            text += '   transform: translateY(-50%); \n';
            text += '} \n';
            text += `#${widgetID} .wc__frame__row {\n`;
            text += '   display: flex; \n';
            text += '} \n';
            text += `#${widgetID} .wc__column__left, .wc__column__right {\n`;
            text += '   display: flex; \n';
            text += `   width: ${withMinutes ? Math.max(minuteSize, secondSize) : '0'}px; \n`;
            text += '   flex-direction: column; \n';
            text += '   justify-content: space-around; \n';
            text += '   align-items: center; \n';
            text += '   line-height: 0px; \n';
            text += '} \n';
            text += `#${widgetID} .wc__column__middle {\n`;
            text += '   display: flex; \n';
            text += '   justify-content: space-around; \n';
            text += '   flex-grow: 1; \n';
            text += '} \n';
            text += `#${widgetID} .wc__minute {\n`;
            text += `   width: ${minuteSize}px; \n`;
            text += `   height: ${minuteSize}px; \n`;
            text += '} \n';
            text += `#${widgetID} .wc__minute_active {\n`;
            text += `   background-color: ${minuteColor}; \n`;
            text += '   border-radius: 50%; \n';
            text += '} \n';
            text += `#${widgetID} .wc__second {\n`;
            text += '   display: inline-block; \n';
            text += '   border-radius: 50%; \n';
            text += '} \n';

            text += `#${widgetID} .wc__column__left .wc__second, .wc__column__right .wc__second {\n`;
            text += `   width: ${secondSize}px; \n`;
            text += `   height: ${secondSize}px; \n`;
            text += '} \n';
            text += `#${widgetID} .wc__column__middle .wc__second {\n`;
            text += `   width: ${secondSize}px; \n`;
            text += `   height: ${secondSize}px; \n`;
            text += '} \n';

            text += `#${widgetID} .wc__second__container {\n`;
            text += '   display: table-cell; \n';
            text += '   vertical-align: middle; \n';
            text += '   text-align: center; \n';
            text += '   line-height: 0px; \n';
            text += '} \n';
            text += `#${widgetID} .wc__second_active {\n`;
            text += `   background-color: ${secondColor}; \n`;
            text += '   border-radius: 50%; \n';
            text += '} \n';

            text += `#${widgetID} .wc__wordclock {\n`;
            text += '   display: flex; \n';
            text += '   flex-direction: column; \n';
            text += `   margin: ${wordclockMargin}px; \n`;
            text += '} \n';
            text += `#${widgetID} .wc__row {\n`;
            text += '   display: flex; \n';
            text += '   flex-direction: row; \n';
            text += '   align-items: stretch; \n';
            text += '} \n';
            text += `#${widgetID} .wc__row__letter {\n`;
            text += '   width: 1em; \n';
            text += '   text-align:center; \n';
            text += `   color:${letterDeactivated}; \n`;
            text += '   transition: color 1s; \n';
            text += '} \n';
            text += `#${widgetID} .wc__row__letter_active {\n`;
            text += `   color:${letterActivated}; \n`;
            text += '} \n';
            text += '</style> \n';

            text += '<div class="wc__frame"> \n';
            text += '  <div class="wc__frame__row wc__frame__row__top"> \n';
            text += '    <div class="wc__column__left"> \n';
            if (withMinutes) {
                text += '    <div class="wc__minute"></div> \n';
            }
            text += '    </div> \n';
            text += '    <div class="wc__column__middle"> \n';
            if (withSeconds) {
                text += '    <div class="wc__second__container"><div class="wc__second"></div></div> \n'.repeat(15);
            }
            text += '    </div> \n';
            text += '    <div class="wc__column__right"> \n';
            if (withMinutes) {
                text += '    <div class="wc__minute"></div> \n';
            }
            text += '    </div> \n';
            text += '  </div> \n';
            text += '  <div class="wc__frame__row wc__frame__row__middle"> \n';
            text += '    <div class="wc__column__left"> \n';
            if (withSeconds) {
                text += '    <div class="wc__second__container"><div class="wc__second"></div></div> \n'.repeat(15);
            }
            text += '    </div> \n';
            text += '    <div class="wc__column__middle"> \n';
            text += '<div class="wc__wordclock"> \n';

            for (const row of lang_pack.letterSet) {
                text += '<div class="wc__row"> \n';
                for (const letter of row) {
                    text += `<span class="wc__row__letter">${letter}</span> \n`;
                }
                text += '</div> \n';
            }
            text += '</div> \n';
            text += '    </div> \n';
            text += '    <div class="wc__column__right"> \n';
            if (withSeconds) {
                text += '    <div class="wc__second__container"><div class="wc__second"></div></div> \n'.repeat(15);
            }
            text += '    </div> \n';
            text += '  </div> \n';
            text += '  <div class="wc__frame__row wc__frame__row__bottom"> \n';
            text += '    <div class="wc__column__left"> \n';
            if (withMinutes) {
                text += '    <div class="wc__minute"></div> \n';
            }
            text += '    </div> \n';
            text += '    <div class="wc__column__middle"> \n';
            if (withSeconds) {
                text += '    <div class="wc__second__container"><div class="wc__second"></div></div> \n'.repeat(15);
            }
            text += '    </div> \n';
            text += '    <div class="wc__column__right"> \n';
            if (withMinutes) {
                text += '    <div class="wc__minute"></div> \n';
            }
            text += '    </div> \n';
            text += '  </div> \n';
            text += '</div> \n';

            $(`#${widgetID}`).html(text);
            vis.binds['mytime'].stopTimer(widgetID);
            vis.binds['mytime'].startTimer(widgetID, data, 1000, vis.binds['mytime'].wordclock.render.bind(this));
            this.render(widgetID, data);
        },
        render: function (widgetID, data) {
            var timezone = data.timezone || vis.binds['mytime'].getCurrentTimezone();
            var language = data.language || 'english';
            var lang_key = this.lang_map[language];
            var lang_pack = this.lang_pack.find(el => el.langCode == lang_key);
            var date = new Date();
            date = vis.binds['mytime'].convertDate2Timezone(date, timezone);
            var min_rest = date.getMinutes() % 5;
            var $frame = $(`#${widgetID} .wc__frame`);
            var $wordclock = $frame.find(' .wc__wordclock');
            var $letters = $wordclock.find('.wc__row__letter');
            $letters.removeClass('wc__row__letter_active');
            var timewords = lang_pack.timeString(date.getHours(), date.getMinutes()).split(' ');
            var displayChars = lang_pack.letterSet.map(row => row.join('')).join('');
            var offset = 0;
            for (var j = 0; j < timewords.length; j++) {
                var start = displayChars.indexOf(timewords[j], offset);
                offset = start + 1;
                $letters.slice(start, start + timewords[j].length).addClass('wc__row__letter_active');
            }
            var $minutes = $frame.find('.wc__minute');
            $minutes.removeClass('wc__minute_active');
            if (min_rest == 1) {
                $minutes.eq(0).addClass('wc__minute_active');
            }
            if (min_rest == 2) {
                $minutes.eq(0).addClass('wc__minute_active');
                $minutes.eq(1).addClass('wc__minute_active');
            }
            if (min_rest == 3) {
                $minutes.eq(0).addClass('wc__minute_active');
                $minutes.eq(1).addClass('wc__minute_active');
                $minutes.eq(3).addClass('wc__minute_active');
            }
            if (min_rest == 4) {
                $minutes.eq(0).addClass('wc__minute_active');
                $minutes.eq(1).addClass('wc__minute_active');
                $minutes.eq(2).addClass('wc__minute_active');
                $minutes.eq(3).addClass('wc__minute_active');
            }
            var $seconds = $(
                [].concat(
                    $frame.find('.wc__frame__row__top .wc__column__middle .wc__second ').get(),
                    $frame.find('.wc__frame__row__middle .wc__column__right .wc__second ').get(),
                    $frame.find('.wc__frame__row__bottom .wc__column__middle .wc__second ').get().reverse(),
                    $frame.find('.wc__frame__row__middle .wc__column__left .wc__second ').get().reverse(),
                ),
            );
            $seconds.removeClass('wc__second_active');
            $seconds.slice(0, date.getSeconds()).addClass('wc__second_active');
        },
        addLanguage: function (language_pack) {
            this.lang_pack.push(language_pack);
        },
    },
    startTimer: function (widgetID, data, time, callback) {
        if (vis.binds['mytime'].intervals[widgetID]) {
            return;
        }
        if (vis.editMode) {
            return;
        }
        var interval;
        interval = setInterval(callback, time, widgetID, data, callback);
        vis.binds['mytime'].intervals[widgetID] = interval;
    },
    stopTimer: function (widgetID) {
        var interval;
        if (vis.editMode) {
            return;
        }
        interval = vis.binds['mytime'].intervals[widgetID] ? vis.binds['mytime'].intervals[widgetID] : null;
        if (interval) {
            delete vis.binds['mytime'].intervals[widgetID];
        }
        if (interval) {
            clearInterval(interval);
        }
    },
    getCountdownId: function (countdown_oid) {
        var idParts = countdown_oid.split('.');
        if (idParts[2] != 'Countdowns') {
            return false;
        }
        idParts.pop();
        return idParts.join('.');
    },
    calcCountdownFromMiliSeconds: function (miliseconds, pattern) {
        var ret = {};

        if (pattern[0] == '1') {
            ret.days = Math.floor(miliseconds / 1000 / 60 / 60 / 24);
            miliseconds -= ret.days * 1000 * 60 * 60 * 24;
        }
        if (pattern[1] == '1') {
            ret.hours = Math.floor(miliseconds / 1000 / 60 / 60);
            miliseconds -= ret.hours * 1000 * 60 * 60;
        }
        if (pattern[2] == '1') {
            ret.minutes = Math.floor(miliseconds / 1000 / 60);
            miliseconds -= ret.minutes * 1000 * 60;
        }
        if (pattern[3] == '1') {
            ret.seconds = Math.floor(miliseconds / 1000);
            miliseconds -= ret.seconds * 1000;
        }

        return ret;
    },
    bindStates: function (elem, bound, change_callback) {
        var $div = $(elem);
        var boundstates = $div.data('bound');
        if (boundstates) {
            for (var i = 0; i < boundstates.length; i++) {
                vis.states.unbind(boundstates[i], change_callback);
            }
        }
        $div.data('bound', null);
        $div.data('bindHandler', null);
        if (vis.editMode) {
            vis.binds['mytime'].getStates(bound, undefined, undefined);
        } else {
            vis.binds['mytime'].getStates(bound, $div, change_callback);
        }
    },
    getStates: function (bound, $div, change_callback) {
        vis.conn.gettingStates = 0;
        vis.conn.getStates(
            bound,
            function (error, states) {
                vis.binds['mytime'].updateStates(states);
                vis.conn.subscribe(bound);
                for (var i = 0; i < bound.length; i++) {
                    bound[i] = `${bound[i]}.val`;
                    if (change_callback) {
                        vis.states.bind(bound[i], change_callback);
                    }
                }
                if ($div) {
                    $div.data('bound', bound);
                    $div.data('bindHandler', change_callback);
                }
            }.bind({ change_callback }),
        );
    },
    updateStates: function (states) {
        for (var id in states) {
            if (!Object.prototype.hasOwnProperty.call(states, id)) {
                continue;
            }
            var obj = states[id];
            try {
                if (vis.editMode) {
                    vis.states[`${id}.val`] = obj.val;
                    vis.states[`${id}.ts`] = obj.ts;
                    vis.states[`${id}.ack`] = obj.ack;
                    vis.states[`${id}.lc`] = obj.lc;
                    if (obj.q !== undefined && obj.q !== null) {
                        vis.states[`${id}.q`] = obj.q;
                    }
                } else {
                    const oo = {};
                    oo[`${id}.val`] = obj.val;
                    oo[`${id}.ts`] = obj.ts;
                    oo[`${id}.ack`] = obj.ack;
                    oo[`${id}.lc`] = obj.lc;
                    if (obj.q !== undefined && obj.q !== null) {
                        oo[`${id}.q`] = obj.q;
                    }
                    vis.states.attr(oo);
                }
            } catch (e) {
                console.error(`Error: can't create states object for ${id}(${e})`);
            }
        }
    },
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
    getTimezones: function () {
        return this.timezones.map(el => el.label);
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
    calcServerTimeDiff: async function () {
        try {
            let serverTime = await this.sendToAsync('mytime.0', 'getServerTime');
            let now = new Date().getTime();
            this.serversync.serverTimeDiff = now - serverTime;

            // Erfolgreich? Dann erneut in 15 Sekunden aufrufen
            setTimeout(() => {
                this.calcServerTimeDiff();
            }, 15000);
        } catch (error) {
            console.log('Error retrieving server time:', error);

            // Bei Fehler in 1 Sekunde erneut versuchen
            setTimeout(() => {
                this.calcServerTimeDiff();
            }, 1000);
        }
    },
    sendToAsync: async function (instance, command, sendData) {
        // console.log(`sendToAsync ${command} ${sendData || 'no parameters'}`);
        return new Promise((resolve, reject) => {
            try {
                if (!vis.conn) {
                    reject('no vis.conn object');
                }
                vis.conn.sendTo(instance, command, sendData, function (receiveData) {
                    resolve(receiveData);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
};

vis.binds['mytime'].showVersion();
vis.binds['mytime'].calcServerTimeDiff();
