import runtime from './runtime.js';
import countdown from './countdown.js';
import timezones from './timezones.js';
import serverSync from './serverSync.js';
import clock from './clock.js';

export default {
    ...runtime,
    ...countdown,
    ...timezones,
    ...serverSync,
    ...clock,
};
