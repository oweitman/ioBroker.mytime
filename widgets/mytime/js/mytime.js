/*
    ioBroker.vis mytime Widget-Set

    Copyright 2020 oweitman oweitman@gmx.de
*/
'use strict';

import { version as pkgVersion } from '../../../package.json';
import countdownNixie from './widgetTypes/countdownNixie.js';
import countdownFlip from './widgetTypes/countdownFlip.js';
import countdownCircle from './widgetTypes/countdownCircle.js';
import reverseCountdownPlain from './widgetTypes/reverseCountdownPlain.js';
import countdownPlain from './widgetTypes/countdownPlain.js';
import wordclock from './widgetTypes/wordclock.js';
import clockPlain from './widgetTypes/clockPlain.js';
import clockNixie from './widgetTypes/clockNixie.js';
import clockFlip from './widgetTypes/clockFlip.js';
import support from './support/support.js';

/* global $, systemDictionary, vis */
fetch('widgets/mytime/myi18n/translations.json')
    .then(response => response.json())
    .then(i18n => $.extend(true, systemDictionary, i18n));

// Stop an existing synchronization loop before this bundle is initialized again.
vis.binds.mytime?.stopServerTimeSync?.();

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
    clockplain: clockPlain,
    clocknixie: clockNixie,
    clockflip: clockFlip,
    ...support,
};

vis.binds.mytime.showVersion();
vis.binds.mytime.calcServerTimeDiff();
