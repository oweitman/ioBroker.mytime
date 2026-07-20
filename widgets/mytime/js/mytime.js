/*
    ioBroker.vis mytime Widget-Set

    Copyright 2020 oweitman oweitman@gmx.de
*/
'use strict';

import { version as pkgVersion } from '../../../package.json';
import countdownNixie from './widgets/countdownNixie.js';
import countdownFlip from './widgets/countdownFlip.js';
import countdownCircle from './widgets/countdownCircle.js';
import reverseCountdownPlain from './widgets/reverseCountdownPlain.js';
import countdownPlain from './widgets/countdownPlain.js';
import wordclock from './widgets/wordclock.js';
import support from './support/support.js';

/* global $, systemDictionary, vis */
fetch('widgets/mytime/myi18n/translations.json')
    .then(response => response.json())
    .then(i18n => $.extend(true, systemDictionary, i18n));

vis.binds.mytime = {
    version: pkgVersion,
    showVersion() {
        if (this.version) {
            console.log(`Version mytime: ${this.version}`);
            this.version = null;
        }
    },
    intervals: [],
    serversync: {},
    countdownnixie: countdownNixie,
    countdownflip: countdownFlip,
    countdowncircle: countdownCircle,
    reversecountdownplain: reverseCountdownPlain,
    countdownplain: countdownPlain,
    wordclock,
    ...support,
};

vis.binds.mytime.showVersion();
vis.binds.mytime.calcServerTimeDiff();
