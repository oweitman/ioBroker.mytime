/* global $, vis */
import { toBoolSafe } from '../support/util.js';

const dateUnits = {
    Y: ['year', 'years'],
    M: ['month', 'months'],
    D: ['day', 'days'],
};
const timeUnits = [
    ['hours', 'hours'],
    ['minutes', 'mins'],
    ['seconds', 'secs'],
];

function getUnits(data) {
    var order = data.clock_date_order || 'DMY';
    return [...order.split('').map(key => dateUnits[key]), ...timeUnits];
}

function digitColumn(className) {
    return `<div class="${className}">${Array.from({ length: 10 }, (_value, digit) => `<p>${digit}</p>`).join('')}</div>`;
}

const clockNixie = {
    intervaltime: 250,
    createWidget: function (widgetID, view, data) {
        var $div = $(`#${widgetID}`);
        if (!$div.length) {
            return setTimeout(() => vis.binds['mytime'].clocknixie.createWidget(widgetID, view, data), 100);
        }
        var enabled = getUnits(data).filter(([key]) => toBoolSafe(data[`clock_show${key}`]));
        var active = data.clock_color_active || '#FFE548';
        var inactive = data.clock_color_inactive || '#323232';
        var opacity = data.clock_opacity_inactive === undefined ? 0.35 : Number(data.clock_opacity_inactive);
        var glow = data.clock_glowcolor || '#F58732';
        var alpha = `0${Math.round(255 * opacity).toString(16)}`.slice(-2);
        var content = `<style>#${widgetID} .cdclock p.separator,#${widgetID} .cdclock section p.active{color:${active};text-shadow:0 0 20px ${glow}}#${widgetID} .cdclock{color:${inactive}${alpha}}</style>`;
        content += '<div class="cdclock">';
        enabled.forEach(([_key, className], index) => {
            if (index) {
                content += '<p class="separator">:</p>';
            }
            content += `<section class="${className}">${digitColumn('tens')}${digitColumn('ones')}</section>`;
        });
        content += '</div>';
        $div.html(content);
        vis.binds['mytime'].stopTimer(widgetID);
        clockNixie.setState(widgetID, data);
        vis.binds['mytime'].startTimer(widgetID, data, clockNixie.intervaltime, clockNixie.setState);
    },
    setState: function (widgetID, data) {
        var parts = vis.binds['mytime'].getClockParts(data);
        getUnits(data).forEach(([key, className]) => {
            if (toBoolSafe(data[`clock_show${key}`])) {
                var value = key === 'year' ? parts[key] % 100 : parts[key];
                vis.binds['mytime'].countdownnixie.setDigits(
                    $(`#${widgetID} .${className}`),
                    vis.binds['mytime'].pad(value, 2),
                );
            }
        });
    },
};

export default clockNixie;
