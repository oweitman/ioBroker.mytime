/* global $, vis */
const wordclock = {
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
        text += '<style>\n';
        text += `#${widgetID} .wc__frame {\n`;
        text += '   display: table;\n';
        text += '   margin: auto;\n';
        text += '   position: relative;\n';
        text += '   top: 50%;\n';
        text += '   transform: translateY(-50%);\n';
        text += '}\n';
        text += `#${widgetID} .wc__frame__row {\n`;
        text += '   display: flex;\n';
        text += '}\n';
        text += `#${widgetID} .wc__column__left, .wc__column__right {\n`;
        text += '   display: flex;\n';
        text += `   width: ${withMinutes ? Math.max(minuteSize, secondSize) : '0'}px;\n`;
        text += '   flex-direction: column;\n';
        text += '   justify-content: space-around;\n';
        text += '   align-items: center;\n';
        text += '   line-height: 0px;\n';
        text += '}\n';
        text += `#${widgetID} .wc__column__middle {\n`;
        text += '   display: flex;\n';
        text += '   justify-content: space-around;\n';
        text += '   flex-grow: 1;\n';
        text += '}\n';
        text += `#${widgetID} .wc__minute {\n`;
        text += `   width: ${minuteSize}px;\n`;
        text += `   height: ${minuteSize}px;\n`;
        text += '}\n';
        text += `#${widgetID} .wc__minute_active {\n`;
        text += `   background-color: ${minuteColor};\n`;
        text += '   border-radius: 50%;\n';
        text += '}\n';
        text += `#${widgetID} .wc__second {\n`;
        text += '   display: inline-block;\n';
        text += '   border-radius: 50%;\n';
        text += '}\n';

        text += `#${widgetID} .wc__column__left .wc__second, .wc__column__right .wc__second {\n`;
        text += `   width: ${secondSize}px;\n`;
        text += `   height: ${secondSize}px;\n`;
        text += '}\n';
        text += `#${widgetID} .wc__column__middle .wc__second {\n`;
        text += `   width: ${secondSize}px;\n`;
        text += `   height: ${secondSize}px;\n`;
        text += '}\n';

        text += `#${widgetID} .wc__second__container {\n`;
        text += '   display: table-cell;\n';
        text += '   vertical-align: middle;\n';
        text += '   text-align: center;\n';
        text += '   line-height: 0px;\n';
        text += '}\n';
        text += `#${widgetID} .wc__second_active {\n`;
        text += `   background-color: ${secondColor};\n`;
        text += '   border-radius: 50%;\n';
        text += '}\n';

        text += `#${widgetID} .wc__wordclock {\n`;
        text += '   display: flex;\n';
        text += '   flex-direction: column;\n';
        text += `   margin: ${wordclockMargin}px;\n`;
        text += '}\n';
        text += `#${widgetID} .wc__row {\n`;
        text += '   display: flex;\n';
        text += '   flex-direction: row;\n';
        text += '   align-items: stretch;\n';
        text += '}\n';
        text += `#${widgetID} .wc__row__letter {\n`;
        text += '   width: 1em;\n';
        text += '   text-align:center;\n';
        text += `   color:${letterDeactivated};\n`;
        text += '   transition: color 1s;\n';
        text += '}\n';
        text += `#${widgetID} .wc__row__letter_active {\n`;
        text += `   color:${letterActivated};\n`;
        text += '}\n';
        text += '</style>\n';

        text += '<div class="wc__frame">\n';
        text += '  <div class="wc__frame__row wc__frame__row__top">\n';
        text += '    <div class="wc__column__left">\n';
        if (withMinutes) {
            text += '    <div class="wc__minute"></div>\n';
        }
        text += '    </div>\n';
        text += '    <div class="wc__column__middle">\n';
        if (withSeconds) {
            text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
        }
        text += '    </div>\n';
        text += '    <div class="wc__column__right">\n';
        if (withMinutes) {
            text += '    <div class="wc__minute"></div>\n';
        }
        text += '    </div>\n';
        text += '  </div>\n';
        text += '  <div class="wc__frame__row wc__frame__row__middle">\n';
        text += '    <div class="wc__column__left">\n';
        if (withSeconds) {
            text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
        }
        text += '    </div>\n';
        text += '    <div class="wc__column__middle">\n';
        text += '<div class="wc__wordclock">\n';

        for (const row of lang_pack.letterSet) {
            text += '<div class="wc__row">\n';
            for (const letter of row) {
                text += `<span class="wc__row__letter">${letter}</span>\n`;
            }
            text += '</div>\n';
        }
        text += '</div>\n';
        text += '    </div>\n';
        text += '    <div class="wc__column__right">\n';
        if (withSeconds) {
            text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
        }
        text += '    </div>\n';
        text += '  </div>\n';
        text += '  <div class="wc__frame__row wc__frame__row__bottom">\n';
        text += '    <div class="wc__column__left">\n';
        if (withMinutes) {
            text += '    <div class="wc__minute"></div>\n';
        }
        text += '    </div>\n';
        text += '    <div class="wc__column__middle">\n';
        if (withSeconds) {
            text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
        }
        text += '    </div>\n';
        text += '    <div class="wc__column__right">\n';
        if (withMinutes) {
            text += '    <div class="wc__minute"></div>\n';
        }
        text += '    </div>\n';
        text += '  </div>\n';
        text += '</div>\n';

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
};

export default wordclock;
