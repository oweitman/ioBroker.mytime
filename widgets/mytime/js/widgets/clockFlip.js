/* global $, jQuery, vis */
import { toBoolSafe } from '../support/util.js';

const dateUnits = {
    Y: ['year', 'day', 86400],
    M: ['month', 'day', 86400],
    D: ['day', 'day', 86400],
};
const timeUnits = [
    ['hours', 'hours', 3600],
    ['minutes', 'minutes', 60],
    ['seconds', 'seconds', 1],
];

function getUnits(data) {
    var order = data.clock_date_order || 'DMY';
    return [...order.split('').map(key => dateUnits[key]), ...timeUnits];
}

const clockFlip = {
    intervaltime: 250,
    flips: {},
    createWidget: function (widgetID, view, data, style) {
        var $div = $(`#${widgetID}`);
        if (!$div.length || !jQuery().mtFlipClock) {
            return setTimeout(() => vis.binds['mytime'].clockflip.createWidget(widgetID, view, data, style), 100);
        }
        var enabled = getUnits(data).filter(([key]) => toBoolSafe(data[`clock_show${key}`]));
        var font = style['font-family'] || '';
        var color = data.clock_color || '';
        var background = data.clock_background_color || '';
        var dots = data.clock_dot_color || '';
        var content = `<style>#${widgetID} .clock-flip{display:flex;align-items:flex-start;white-space:nowrap}`;
        content += `#${widgetID} .clock-flip-unit{flex:0 0 140px;width:140px}`;
        content += `#${widgetID} .clock-flip-unit .flip-clock-wrapper{display:flex;width:140px;min-width:140px;margin:0}`;
        content += `#${widgetID} .clock-flip-separator{font-size:48px;line-height:100px;margin:0 4px}`;
        if (font) content += `#${widgetID} .flip-clock-wrapper{font-family:${font}}`;
        if (color || background) content += `#${widgetID} .flip-clock-wrapper ul li a div div.inn{${color ? `color:${color};` : ''}${background ? `background-color:${background};` : ''}}`;
        if (dots) content += `#${widgetID} .flip-clock-dot{background-color:${dots}}#${widgetID} .clock-flip-separator{color:${dots}}`;
        content += `#${widgetID} .clock-flip-unit{display:inline-block}</style><div class="clock-flip">`;
        enabled.forEach(([key], index) => {
            if (index) content += '<span class="clock-flip-separator">:</span>';
            content += `<span class="clock-flip-unit clock-${key}"></span>`;
        });
        content += '</div>';
        $div.html(content);
        clockFlip.flips[widgetID] = {};
        enabled.forEach(([key, faceUnit]) => {
            var pattern = faceUnit === 'day' ? '1000' : faceUnit === 'hours' ? '0100' : faceUnit === 'minutes' ? '0010' : '0001';
            clockFlip.flips[widgetID][key] = $(`#${widgetID} .clock-${key}`).mtFlipClock(0, {
                clockFace: 'Mytime', countdown: false, autoStart: false, pattern,
            });
        });
        vis.binds['mytime'].stopTimer(widgetID);
        clockFlip.setState(widgetID, data);
        vis.binds['mytime'].startTimer(widgetID, data, clockFlip.intervaltime, clockFlip.setState);
    },
    setState: function (widgetID, data) {
        var parts = vis.binds['mytime'].getClockParts(data);
        getUnits(data).forEach(([key, _faceUnit, multiplier]) => {
            var flip = clockFlip.flips[widgetID] && clockFlip.flips[widgetID][key];
            if (flip) flip.setTime((key === 'year' ? parts[key] % 100 : parts[key]) * multiplier);
        });
    },
};

export default clockFlip;
