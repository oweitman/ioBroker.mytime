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
    countdowncircle: {
        intervaltime: 25,
        createWidget: function (widgetID, view, data, style) {
            var $div = $('#' + widgetID);
            // if nothing found => wait
            if (!$div.length) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdowncircle.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid))==false) return;
            var timer     = countdown_oid ? vis.states.attr(countdown_oid + '.timer.val')  : 0;

            function onChange(e, newVal, oldVal) {
                var idParts = e.type.split('.');
                if (idParts[4]!='action' && idParts[4]!='timer') return;
                console.log(e.type + ' ' + newVal + ' ' + oldVal);
                vis.binds["mytime"].countdowncircle.setState(widgetID, data,vis.binds["mytime"].countdowncircle.setState);
            }

            if (countdown_oid) {
                if (1 || !vis.editMode) {
                    vis.binds["mytime"].bindStates($div,[
                        countdown_oid + '.action',
                        countdown_oid + '.end',
                        countdown_oid + '.timer',
                        countdown_oid + '.config',
                        countdown_oid + '.start'],onChange);
                }
            }
            var width=$('#' + widgetID).width();
            var height=$('#' + widgetID).height();
            var text = '';
            
            text += '<style> \n';
            text += '#'+widgetID + ' .timer {\n';
            text += '   position:  absolute; \n';
            text += '   left:      50%; \n';
            text += '   top:       50%; \n';
            text += '   transform: translate(-50%, -50%); \n';
            text += '} \n';
            text += '</style> \n';            
            
            text += '<canvas class="canvas" width="'+width+'" height="'+height+'"></canvas>';
            text += '<div class="timer"></div>';
            $('#' + widgetID).html(text);
            vis.binds["mytime"].startTimer(
                widgetID,
                data,
                vis.binds["mytime"].countdowncircle.calcInterval(timer),
                vis.binds["mytime"].countdowncircle.setState);
            
        },
        calcInterval: function(timer) {
            return Math.max((timer/720).toFixed(0),25);
        },
        setState: function(widgetID,data,callback) {
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid))==false) return;
            var start     = countdown_oid ? vis.states.attr(countdown_oid + '.start.val')   : 0;
            var end       = countdown_oid ? vis.states.attr(countdown_oid + '.end.val')     : 0;
            var timer     = countdown_oid ? vis.states.attr(countdown_oid + '.timer.val')  : 0;            
            var action    = countdown_oid ? vis.states.attr(countdown_oid + '.action.val')  : 'stop';
            var config  = countdown_oid ? JSON.parse(vis.states.attr(countdown_oid + '.config.val')) : {};            
            var linewidth = data.countdown_width || 20; 
            var format    = data.countdown_format || 'mm:ss';
            var stopbehaviour = config.stopbehaviour || 'timer';            
            var bcolor    = data.countdown_background || 'grey';
            var fcolor    = data.countdown_foreground || '#87ceeb';            
            var reverse   = data.countdown_reverse;
            var caps      = data.countdown_caps || 'straight';
            
            var now = new Date().getTime();
            var ms=0;
            if (action=='stop') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('stop');                
                vis.binds["mytime"].stopTimer(widgetID);          
                ms = (stopbehaviour=='timer')? timer:0;
            }
            if (action=='run') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('run');                
                ms = end-now;
                vis.binds["mytime"].startTimer(
                    widgetID,
                    data,
                    vis.binds["mytime"].countdowncircle.calcInterval(timer),
                    callback);
            }
            if (action=='pause') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('pause');                
                vis.binds["mytime"].stopTimer(widgetID);                
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].stopTimer(widgetID);
            }
            if (action=='end') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('end');                                
                vis.binds["mytime"].stopTimer(widgetID);
                ms = 0;
            }
            
            var startangle = ms*360/timer
            if (vis.editMode) startangle=180;
                        
            var canvas = $('#' + widgetID+' canvas');
            var ctx = canvas[0].getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            var length = Math.min(ctx.canvas.width,ctx.canvas.height);
            var radius=(length/2)-(linewidth/2);

            var x = ctx.canvas.width/2;
            var y = ctx.canvas.height/2;
            ctx.beginPath();
            ctx.lineWidth = linewidth;
            if (caps=='straight') ctx.lineCap = "butt";
            if (caps=='round') ctx.lineCap = "round";
            var sh=0;
            ctx.arc(x, y, radius, (360*(Math.PI/180)), (0*(Math.PI/180)),1);
            ctx.strokeStyle = bcolor;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            var sh=-90*(Math.PI/180);
            if (reverse) {
                ctx.arc(x, y, radius, ((startangle)*(Math.PI/180)+sh), (0*(Math.PI/180)+sh),1);
            } else {
                ctx.arc(x, y, radius, ((360-startangle)*(Math.PI/180)+sh), (0*(Math.PI/180)+sh),1);
            }
            ctx.strokeStyle = fcolor;
            ctx.stroke();
            ctx.closePath();
            var text = '';
            text += vis.binds["mytime"].formatDate(ms,format);
            $('#' + widgetID + ' .timer').html(text);

        },            




    },            
    countdownplain: {
        intervaltime: 500,        
        createWidget: function (widgetID, view, data, style) {
            var $div = $('#' + widgetID);
            // if nothing found => wait
            if (!$div.length) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdownplain.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid))==false) return;

            function onChange(e, newVal, oldVal) {
                var idParts = e.type.split('.');
                if (idParts[4]!='action' && idParts[4]!='timer') return;
                console.log(e.type + ' ' + newVal + ' ' + oldVal);
                vis.binds["mytime"].countdownplain.setState(widgetID, data);
            }

            if (countdown_oid) {
                if (1 || !vis.editMode) {
                    vis.binds["mytime"].bindStates($div,[
                        countdown_oid + '.action',
                        countdown_oid + '.end',
                        countdown_oid + '.timer',
                        countdown_oid + '.config',
                        countdown_oid + '.start'],onChange);
                }
            }
            var text = '';
            text += '<div class="timer"></div>';
            $('#' + widgetID).html(text);
            
            vis.binds["mytime"].startTimer(
                widgetID,
                data,
                vis.binds["mytime"].countdownplain.intervaltime,
                vis.binds["mytime"].countdownplain.setState);
            
        },
        setState: function(widgetID,data) {
            console.log('setState ' + new Date().getTime());
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid))==false) return;
            var start   = countdown_oid ? vis.states.attr(countdown_oid + '.start.val')   : 0;
            var end     = countdown_oid ? vis.states.attr(countdown_oid + '.end.val')     : 0;
            var timer   = countdown_oid ? vis.states.attr(countdown_oid + '.timer.val')  : 0;
            var action  = countdown_oid ? vis.states.attr(countdown_oid + '.action.val')  : 'stop';
            var config  = countdown_oid ? JSON.parse(vis.states.attr(countdown_oid + '.config.val')) : {};
            var format = data.countdown_format || 'dd\\d HH\\h mm\\m ss\\s';
            var stopbehaviour = config.stopbehaviour || 'timer';

            var now = new Date().getTime();
            var ms=0;
            if (action=='stop') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('stop');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = (stopbehaviour=='timer')? timer:0;
            }
            if (action=='run') {
                ms = end-now;
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('run');
                vis.binds["mytime"].startTimer(
                    widgetID,
                    data,
                    vis.binds["mytime"].countdownplain.intervaltime,
                    vis.binds["mytime"].countdownplain.setState);
            }
            if (action=='pause') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('pause');
                vis.binds["mytime"].stopTimer(widgetID);            
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].stopTimer(widgetID);           
            }
            if (action=='end') {
                $('#'+widgetID+' .timer').removeClass('stop run pause end').addClass('end');
                vis.binds["mytime"].stopTimer(widgetID);            
                ms = 0;
            }

            var text = '';
            text += vis.binds["mytime"].formatDate(ms,format);
            $('#' + widgetID + ' .timer').html(text);
        },
        xstartTimer: function(widgetID,data) {
            if (vis.binds["mytime"].intervals[widgetID]) return;
            var interval;
            interval = setInterval(vis.binds["mytime"].countdownplain.setState,500,widgetID,data);
            console.log('startTimer '+interval);
            vis.binds["mytime"].intervals[widgetID]=interval;
        },
        xstopTimer: function(widgetID) {
            var interval;
            interval = (vis.binds["mytime"].intervals[widgetID]) ? vis.binds["mytime"].intervals[widgetID] : null;
            console.log('stopTimer '+interval);
            if (interval) delete vis.binds["mytime"].intervals[widgetID];
            if (interval) clearInterval(interval);
        },
    },
    startTimer: function(widgetID,data,time,callback) {
        if (vis.binds["mytime"].intervals[widgetID]) return;
        var interval;
        interval = setInterval(callback,time,widgetID,data,callback);
        console.log('startTimer '+widgetID+' '+interval);
        vis.binds["mytime"].intervals[widgetID]=interval;
    },
    stopTimer: function(widgetID) {
        var interval;
        interval = (vis.binds["mytime"].intervals[widgetID]) ? vis.binds["mytime"].intervals[widgetID] : null;
        console.log('stopTimer '+widgetID+' '+interval);
        if (interval) delete vis.binds["mytime"].intervals[widgetID];
        if (interval) clearInterval(interval);
    },
    getCountdownId: function(countdown_oid) {
        var idParts = countdown_oid.split('.');
        if (idParts[2] != 'Countdown') return false;
        idParts.pop();
        return idParts.join('.');
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
