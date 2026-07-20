/* global $, vis */
import { toBoolSafe } from '../support/util.js';

const countdownCircle = {
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
        if (!data.countdown_oid || (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false) {
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

        var error = mytime.validateCountdownUnits({
            Y: showyear,
            M: showmonth,
            w: showweek,
            d: showday,
            H: showhrs,
            m: showmin,
            s: showsec,
        });
        if (error) {
            $(`#${widgetID}`).html(error);
            return error;
        }

        function onChange(e /* , newVal, oldVal */) {
            var idParts = e.type.split('.');
            var dp = idParts[idParts.length - 2];
            if (dp != 'action' && dp != 'timer' && dp != 'start' && dp != 'end') {
                return;
            }
            vis.binds['mytime'].countdowncircle.setState(widgetID, data);
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

        var width = $(`#${widgetID}`).width();
        var height = $(`#${widgetID}`).height();
        var text = '';

        text += '<style>\n';
        text += `#${widgetID} .timer {\n`;
        text += '   position:  absolute;\n';
        text += '   left:      50%;\n';
        text += '   top:       50%;\n';
        text += '   transform: translate(-50%, -50%);\n';
        text += '}\n';
        text += '</style>\n';

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
    setState: function (widgetID, data) {
        var countdown_oid;
        if (!data.countdown_oid || (countdown_oid = vis.binds['mytime'].getCountdownId(data.countdown_oid)) == false) {
            console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
            return;
        }
        var mytime = vis.binds['mytime'];

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

        var colorSec = data.countdown_color_second || '#87ceeb';
        var colorMin = data.countdown_color_minute || '#87ceeb';
        var colorHrs = data.countdown_color_hour || '#87ceeb';
        var colorDay = data.countdown_color_day || '#87ceeb';
        var colorWeek = data.countdown_color_week || '#87ceeb';
        var colorMonth = data.countdown_color_month || '#87ceeb';
        var colorYear = data.countdown_color_year || '#87ceeb';

        var reverse = data.countdown_reverse;
        var partring = data.countdown_partring;
        var caps = data.countdown_caps || 'straight';
        var ringgap = data.countdown_ringgap || 5;
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
                vis.binds['mytime'].countdowncircle.setState,
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

        var cdObjnow = mytime.calcCountdownFromMilliseconds(ms, units);
        var cdObjtimer = mytime.calcCountdownFromMilliseconds(timer, units);

        var canvas = $(`#${widgetID} canvas`);
        var ctx = canvas[0].getContext('2d');
        vis.binds['mytime'].countdowncircle.clearBase(ctx);

        ctx.lineWidth = linewidth;

        var radius, bound, gap;
        var x = ctx.canvas.width / 2;
        var y = ctx.canvas.height / 2;
        var length = Math.min(ctx.canvas.width, ctx.canvas.height);
        //var radius=(length/2)-(linewidth/2);
        var startangle = 0;

        const order = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
        const smallestUnit = order.reverse().find(unit => units[unit] === true);

        order.forEach(ring => {
            if (!units[ring]) {
                return;
            }
            if ((ring == 'weeks' && !units.weeks) || (ring == 'months' && !units.months)) {
                return;
            }
            bound = bound == undefined ? length / 2 : radius - linewidth / 2;
            gap = gap == undefined ? 0 : ringgap;
            radius = vis.binds['mytime'].countdowncircle.calcRadius(bound, linewidth, gap);

            if (ring === 'seconds' && units.seconds) {
                const isFull = smallestUnit === 'seconds' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 60;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorSec, caps, reverse);
            }

            if (ring === 'minutes' && units.minutes) {
                const isFull = smallestUnit === 'minutes' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 60;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorMin, caps, reverse);
            }
            if (ring === 'hours' && units.minutes) {
                const isFull = smallestUnit === 'hours' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 24;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorHrs, caps, reverse);
            }
            if (ring === 'days' && units.minutes) {
                const isFull = smallestUnit === 'days' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 365;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorDay, caps, reverse);
            }
            if (ring === 'weeks' && units.minutes) {
                const isFull = smallestUnit === 'weeks' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 52;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorWeek, caps, reverse);
            }
            if (ring === 'months' && units.minutes) {
                const isFull = smallestUnit === 'months' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 12;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorMonth, caps, reverse);
            }
            if (ring === 'years' && units.minutes) {
                const isFull = smallestUnit === 'years' && partring === false;
                const denom = isFull ? cdObjtimer[ring] : 12;

                startangle = (cdObjnow[ring] * 360) / denom || 0;

                if (vis.editMode) {
                    startangle = 180;
                }

                vis.binds['mytime'].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
                vis.binds['mytime'].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorYear, caps, reverse);
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
            ctx.arc(x, y, radius, (360 - startangle) * (Math.PI / 180) + sh, 0 * (Math.PI / 180) + sh, 1);
        } else {
            ctx.arc(x, y, radius, startangle * (Math.PI / 180) + sh, 0 * (Math.PI / 180) + sh, 1);
        }
        ctx.stroke();
        ctx.closePath();
    },
    drawText: function (widgetID, ms, format) {
        var text = '';
        text += vis.binds['mytime'].formatDateFromMs(ms, format);
        $(`#${widgetID} .timer`).html(text);
    },
};

export default countdownCircle;
