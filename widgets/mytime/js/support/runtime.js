/* global $, vis */

const runtime = {
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
        if (idParts[2] != 'Countdowns' || idParts.length < 4) {
            return false;
        }
        idParts = idParts.slice(0, 4);
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
        var boundHandler = $div.data('bindHandler');
        if (boundstates) {
            for (var i = 0; i < boundstates.length; i++) {
                vis.states.unbind(boundstates[i], boundHandler);
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
        //console.log('updateStates', states);
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
};

export default runtime;
