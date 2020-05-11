/*
    ioBroker.vis mytime Widget-Set

    version: "0.0.1"

    Copyright 2020 oweitman oweitman@gmx.de
*/
'use strict';

// add translations for edit mode
$.get( 'adapter/mytime/words.js', function(script) {
    let translation = script.substring(script.indexOf('{'), script.length);
    translation = translation.substring(0, translation.lastIndexOf(';'));
    $.extend(systemDictionary, JSON.parse(translation));
});

// this code can be placed directly in mytime.html
vis.binds['mytime'] = {
    version: '0.0.1',
    showVersion: function () {
        if (vis.binds['mytime'].version) {
            console.log('Version mytime: ' + vis.binds['mytime'].version);
            vis.binds['mytime'].version = null;
        }
    },
    intervals: [],
    countdown: {
        createWidget: function (widgetID, view, data, style) {
            var $div = $('#' + widgetID);
            // if nothing found => wait
            if (!$div.length) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdown.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].countdown.getCountdownId(data.countdown_oid))==false) return;
            var start   = countdown_oid ? vis.states.attr(countdown_oid + '.start.val')   : 0;
            var end     = countdown_oid ? vis.states.attr(countdown_oid + '.end.val')     : 0;
            var timer   = countdown_oid ? vis.states.attr(countdown_oid + '.timer.val')  : 0;
            var action  = countdown_oid ? vis.states.attr(countdown_oid + '.action.val')  : 'stop';
            var act = vis.states.attr('mytime.0.Countdown.test.action');

            function onChange(e, newVal, oldVal) {
                var idParts = e.type.split('.');
                if (idParts[4]!='action' && idParts[4]!='timer') return;
                console.log(e.type + ' ' + newVal + ' ' + oldVal);
                vis.binds["mytime"].countdown.setState(widgetID, data);
            }

            if (countdown_oid) {
                if (1 || !vis.editMode) {
                    vis.binds["mytime"].bindStates($div,[
                        countdown_oid + '.action',
                        countdown_oid + '.end',
                        countdown_oid + '.timer',
                        countdown_oid + '.start'],onChange);
                }
            }
            var text = '';
            text += '<div class="timer"></div>';
            $('#' + widgetID).html(text);
            vis.binds["mytime"].countdown.startTimer(widgetID,data);
        },
        getCountdownId: function(countdown_oid) {
            var idParts = countdown_oid.split('.');
            if (idParts[2] != 'Countdown') return false;
            idParts.pop();
            return idParts.join('.');
        },
        setState: function(widgetID,data) {
            console.log('setState ' + new Date().getTime());
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].countdown.getCountdownId(data.countdown_oid))==false) return;
            var start   = countdown_oid ? vis.states.attr(countdown_oid + '.start.val')   : 0;
            var end     = countdown_oid ? vis.states.attr(countdown_oid + '.end.val')     : 0;
            var timer   = countdown_oid ? vis.states.attr(countdown_oid + '.timer.val')  : 0;
            var action  = countdown_oid ? vis.states.attr(countdown_oid + '.action.val')  : 'stop';
            var format = data.format || 'dd\\d HH\\h mm\\m ss\\s';

            var now = new Date().getTime();
            var ms=0;
            if (action=='stop') {
                vis.binds["mytime"].countdown.stopTimer(widgetID);            
                ms = timer;
            }
            if (action=='run') {
                ms = end-now;
                vis.binds["mytime"].countdown.startTimer(widgetID,data);
            }
            if (action=='pause') {
                vis.binds["mytime"].countdown.stopTimer(widgetID);            
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].countdown.stopTimer(widgetID);
                //vis.conn.setState(countdown_oid + '.cmd','end');                
            }
            if (action=='end') {
                vis.binds["mytime"].countdown.stopTimer(widgetID);            
                ms = 0;
            }

            var text = '';
            text += vis.binds["mytime"].formatDate(ms,format);
            $('#' + widgetID + ' .timer').html(text);
        },
        startTimer: function(widgetID,data) {
            if (vis.binds["mytime"].intervals[widgetID]) return;
            console.log('startTimer');
            var interval;
            interval = setInterval(vis.binds["mytime"].countdown.setState,500,widgetID,data);
            vis.binds["mytime"].intervals[widgetID]=interval;
        },
        stopTimer: function(widgetID) {
            console.log('stopTimer');
            var interval;
            interval = (vis.binds["mytime"].intervals[widgetID]) ? vis.binds["mytime"].intervals[widgetID] : null;
            if (interval) delete vis.binds["mytime"].intervals[widgetID];
            if (interval) clearInterval(interval);
        },
    },
    calcCountdownFromMiliSeconds: function(miliseconds,pattern) {
        var ret = {};
        if (pattern[0]=='1') {
            ret.days = Math.floor(miliseconds / 1000 / 60 / 60 / 24);
            miliseconds -= ret.days * 1000*60*60*24;
        }
        if (pattern[1]=='1') {
            ret.hours = Math.floor(miliseconds / 1000 / 60 / 60 );
            miliseconds -= ret.hours * 1000*60*60;
        }
        if (pattern[2]=='1') {
            ret.minutes = Math.floor(miliseconds / 1000 / 60 );
            miliseconds -= ret.minutes * 1000*60;
        }
        if (pattern[3]=='1') {
            ret.seconds = Math.floor(miliseconds / 1000  );
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

        vis.conn.gettingStates =0;
        vis.conn.getStates(bound, function (error, states) {

            vis.updateStates(states);
            vis.conn.subscribe(bound);
            for (var i=0;i<bound.length;i++) {
                bound[i]=bound[i]+'.val';
                vis.states.bind(bound[i] , change_callback);            
            }
            $div.data('bound', bound);
            $div.data('bindHandler', change_callback);
        }.bind({change_callback}));                
    },
    formatDate: function (ms, format) {
        

        function ii(i, len) {
            var s = i + "";
            len = len || 2;
            while (s.length < len) s = "0" + s;
            return s;
        }

        var pattern =   ((format.search(/(^|[^\\])d/g)>=0)?"1":"0") + 
                        ((format.search(/(^|[^\\])H/g)>=0)?"1":"0") + 
                        ((format.search(/(^|[^\\])m/g)>=0)?"1":"0") + 
                        ((format.search(/(^|[^\\])s/g)>=0)?"1":"0");
                        
        if (pattern.indexOf('101')>=0) {
            return 'Error: Invalid Format';
            
        }

        var cdObj = vis.binds["mytime"].calcCountdownFromMiliSeconds(ms, pattern);

        var d = cdObj.days;
        format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
        format = format.replace(/(^|[^\\])d/g, "$1" + d);

        var H = cdObj.hours;
        format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
        format = format.replace(/(^|[^\\])H/g, "$1" + H);

        var m = cdObj.minutes;
        format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
        format = format.replace(/(^|[^\\])m/g, "$1" + m);

        var s = cdObj.seconds;
        format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
        format = format.replace(/(^|[^\\])s/g, "$1" + s);

        format = format.replace(/\\(.)/g, "$1");

        return format;
    },
};

vis.binds['mytime'].showVersion();
