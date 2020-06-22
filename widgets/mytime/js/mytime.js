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
    




    countdownnixie: {
        intervaltime: 500,
        flips: [],
        createWidget: function (widgetID, view, data, style) {
            var $div = $('#' + widgetID);
            // if nothing found => wait
            if (!$div.length || !jQuery().FlipClock) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdownnixie.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid))==false) return;
            var showsec   = data.countdown_showsec;
            var showmin   = data.countdown_showmin;
            var showhrs   = data.countdown_showhrs;
            var showday   = data.countdown_showday;

            var font = (style['font-family'] && style['font-family'] != '') ? style['font-family'] : '';

            var color       = data.countdown_color     || '#FFE548';
            var glowcolor   = data.countdown_glowcolor || '#F58732';
            
            var pattern =   ((showday)?"1":"0") +
                            ((showhrs)?"1":"0") +
                            ((showmin)?"1":"0") +
                            ((showsec)?"1":"0");

            if (pattern.indexOf('101')>=0 || pattern.indexOf('1001')>=0) {
                $('#' + widgetID).html('Error: Invalid Format');
                return;
            }

            function onChange(e, newVal, oldVal) {
                var idParts = e.type.split('.');
                if (idParts[idParts.length-2]!='action' && idParts[idParts.length-2]!='timer') return;
                console.log(e.type + ' ' + newVal + ' ' + oldVal);
                vis.binds["mytime"].countdownnixie.setState(widgetID, data,vis.binds["mytime"].countdownnixie.setState);
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

            text += '<style> \n';
            
            text += '.cdclock p.separator,\n';
            text += '.cdclock section p.active {\n';
            text += '    color: '+ color +';\n';
            text += '    text-shadow: 0px 0px 20px '+ glowcolor +';\n';
            text += '}\n';
            
            text += '</style> \n';
      
            text += '<div class="cdclock">\n';
            
            if (showday) {
                text += '    <section class="days">\n';
                text += '        <div class="tens">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '        <div class="ones">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '    </section>\n';
            }
            if (showday && showhrs) text += '    <p class="separator">:</p>\n';
            if (showhrs) {            
                text += '    <section class="hours">\n';
                text += '        <div class="tens">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '        <div class="ones">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '    </section>\n';
            }
            if (showhrs && showmin) text += '    <p class="separator">:</p>\n';
            if (showmin) {
                text += '    <section class="mins">\n';
                text += '        <div class="tens">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '        <div class="ones">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '    </section>\n';
            }
            if (showmin && showsec) text += '    <p class="separator">:</p>\n';
            if (showsec) {
                text += '    <section class="secs">\n';
                text += '        <div class="tens">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '        <div class="ones">\n';
                text += '            <p>0</p>\n';
                text += '            <p>1</p>\n';
                text += '            <p>2</p>\n';
                text += '            <p>3</p>\n';
                text += '            <p>4</p>\n';
                text += '            <p>5</p>\n';
                text += '            <p>6</p>\n';
                text += '            <p>7</p>\n';
                text += '            <p>8</p>\n';
                text += '            <p>9</p>\n';
                text += '        </div>\n';
                text += '    </section>\n';
            }
            text += '</div>\n';

            text += '<div class="timer"></div>';
            $('#' + widgetID).html(text);

            vis.binds["mytime"].stopTimer(widgetID);
            vis.binds["mytime"].startTimer(
                widgetID,
                data,
                vis.binds["mytime"].countdownnixie.intervaltime,
                vis.binds["mytime"].countdownnixie.setState);
            if (vis.editMode) vis.binds["mytime"].countdownnixie.setState(widgetID,data);
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
            var stopbehaviour = config.stopbehaviour || 'timer';
            
            var showsec   = data.countdown_showsec;
            var showmin   = data.countdown_showmin;
            var showhrs   = data.countdown_showhrs;
            var showday   = data.countdown_showday;

            var pattern =   ((showday)?"1":"0") + 
                            ((showhrs)?"1":"0") + 
                            ((showmin)?"1":"0") + 
                            ((showsec)?"1":"0");
            
            var now = new Date().getTime();
            var ms=0;
            if (action=='stop') {
                $('#'+widgetID+' .cdclock').removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = (stopbehaviour=='timer')? timer:0;
            }
            if (action=='run') {
                ms = end-now;
                $('#'+widgetID+' .cdclock').removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
                vis.binds["mytime"].startTimer(
                    widgetID,
                    data,
                    vis.binds["mytime"].countdownnixie.intervaltime,
                    vis.binds["mytime"].countdownnixie.setState);
            }
            if (action=='pause') {
                $('#'+widgetID+' .cdclock').removeClass('cdstop cdrun cdpause cdend').addClass('cdpause');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].stopTimer(widgetID);
            }
            if (action=='end') {
                $('#'+widgetID+' .cdclock').removeClass('cdstop cdrun cdpause cdend').addClass('cdend');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = 0;
            }
            
            var cdObj = vis.binds["mytime"].formatDate(ms, 'dd:HH:mm:ss').split(':');
            if (showday) vis.binds["mytime"].countdownnixie.setDigits($('#' + widgetID+' .days'),  cdObj[0])
            if (showhrs) vis.binds["mytime"].countdownnixie.setDigits($('#' + widgetID+' .hours'), cdObj[1])
            if (showmin) vis.binds["mytime"].countdownnixie.setDigits($('#' + widgetID+' .mins'),  cdObj[2])
            if (showsec) vis.binds["mytime"].countdownnixie.setDigits($('#' + widgetID+' .secs'),  cdObj[3])
            
        },
        setDigits: function(section, digit) {
            const tens = [...$(section).find('.tens')[0].children];
            const ones = [...$(section).find('.ones')[0].children];
            var l = digit.length;
            tens.forEach(number => number.classList.remove('active'));
            tens[digit[l-2]].classList.add('active');
            ones.forEach(number => number.classList.remove('active'));
            ones[digit[l-1]].classList.add('active');
        },

    },
    
    
    
    
    countdownflip: {
        intervaltime: 500,
        flips: [],
        createWidget: function (widgetID, view, data, style) {
            var $div = $('#' + widgetID);
            // if nothing found => wait
            if (!$div.length || !jQuery().FlipClock) {
                return setTimeout(function () {
                    vis.binds['mytime'].countdownflip.createWidget(widgetID, view, data, style);
                }, 100);
            }
            var countdown_oid;
            if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid))==false) return;
            var showsec   = data.countdown_showsec;
            var showmin   = data.countdown_showmin;
            var showhrs   = data.countdown_showhrs;
            var showday   = data.countdown_showday;

            var font = (style['font-family'] && style['font-family'] != '') ? style['font-family'] : '';
            var color    = data.countdown_color ? data.countdown_color : '';
            var bcolor   = data.countdown_background_color ? data.countdown_background_color:'';
            var dotcolor = data.countdown_dot_color ? data.countdown_dot_color:'';

            var pattern =   ((showday)?"1":"0") +
                            ((showhrs)?"1":"0") +
                            ((showmin)?"1":"0") +
                            ((showsec)?"1":"0");

            if (pattern.indexOf('101')>=0 || pattern.indexOf('1001')>=0) {
                $('#' + widgetID).html('Error: Invalid Format');
                return;
            }

            function onChange(e, newVal, oldVal) {
                var idParts = e.type.split('.');
                if (idParts[idParts.length-2]!='action' && idParts[idParts.length-2]!='timer') return;
                console.log(e.type + ' ' + newVal + ' ' + oldVal);
                vis.binds["mytime"].countdownflip.setState(widgetID, data,vis.binds["mytime"].countdownflip.setState);
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
            text += '<style> \n';
            if (font != "") {
                text += '#'+widgetID + ' .flip-clock-wrapper {\n';
                text += '   font-family:  ' + font + '; \n';
                text += '} \n';
            }
            if (bcolor != "" || color != "") {
                text += '#'+widgetID + ' .flip-clock-wrapper ul li a div div.inn {\n';
                if (bcolor!="") text += '   background-color:  ' + bcolor + '; \n';
                if (color!="")  text += '   color:  ' + color + '; \n';
                text += '} \n';
            }
            if (dotcolor != "") {
                text += '#'+widgetID + ' .flip-clock-dot {\n';
                text += '   background-color:  ' + dotcolor + '; \n';
                text += '} \n';
            }
            text += '</style> \n';

            text += '<div class="timer"></div>';
            $('#' + widgetID).html(text);

            vis.binds["mytime"].countdownflip.flips[widgetID] = $('#' + widgetID+' .timer').mtFlipClock(0, {
                clockFace: 'Mytime',
                countdown: true,
                autoStart: false,
                pattern: pattern
            });
            vis.binds["mytime"].stopTimer(widgetID);
            vis.binds["mytime"].startTimer(
                widgetID,
                data,
                vis.binds["mytime"].countdownflip.intervaltime,
                vis.binds["mytime"].countdownflip.setState);
            if (vis.editMode) vis.binds["mytime"].countdownflip.setState(widgetID,data);
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
            var stopbehaviour = config.stopbehaviour || 'timer';

            var showsec   = data.countdown_showsec;
            var showmin   = data.countdown_showmin;
            var showhrs   = data.countdown_showhrs;
            var showday   = data.countdown_showday;

            var now = new Date().getTime();
            var ms=0;
            if (action=='stop') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = (stopbehaviour=='timer')? timer:0;
            }
            if (action=='run') {
                ms = end-now;
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
                vis.binds["mytime"].startTimer(
                    widgetID,
                    data,
                    vis.binds["mytime"].countdownflip.intervaltime,
                    vis.binds["mytime"].countdownflip.setState);
            }
            if (action=='pause') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdpause');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].stopTimer(widgetID);
            }
            if (action=='end') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdend');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = 0;
            }
            vis.binds["mytime"].countdownflip.flips[widgetID].setTime(parseInt(ms/1000));
        }
    },
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
            var showsec   = data.countdown_showsec;
            var showmin   = data.countdown_showmin;
            var showhrs   = data.countdown_showhrs;
            var showday   = data.countdown_showday;
            
            var pattern =   ((showsec)?"1":"0") + 
                            ((showmin)?"1":"0") + 
                            ((showhrs)?"1":"0") + 
                            ((showday)?"1":"0");
                            
            if (pattern.indexOf('101')>=0 || pattern.indexOf('1001')>=0) {
                $('#' + widgetID).html('Error: Invalid Format');
                return;
                
            }
            
            function onChange(e, newVal, oldVal) {
                var idParts = e.type.split('.');
                if (idParts[idParts.length-2]!='action' && idParts[idParts.length-2]!='timer') return;
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
            vis.binds["mytime"].stopTimer(widgetID);            
            vis.binds["mytime"].startTimer(
                widgetID,
                data,
                vis.binds["mytime"].countdowncircle.calcInterval(timer),
                vis.binds["mytime"].countdowncircle.setState);
            vis.binds["mytime"].countdowncircle.setState(widgetID,data);
        },
        calcInterval: function(timer) {
            return Math.min(Math.max(timer/720,25),500);
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
            var notimetext = data.countdown_notimetext;
            var format    = data.countdown_format || 'mm:ss';
            var stopbehaviour = config.stopbehaviour || 'timer';            
            var bcolor    = data.countdown_background || 'grey';
            var fcolor    = data.countdown_foreground || '#87ceeb';            
            var reverse   = data.countdown_reverse;
            var caps      = data.countdown_caps || 'straight';
            var showsec   = data.countdown_showsec;
            var showmin   = data.countdown_showmin;
            var showhrs   = data.countdown_showhrs;
            var showday   = data.countdown_showday;
            var ringgap   = data.countdown_ringgap || 5;

            var pattern =   ((showday)?"1":"0") + 
                            ((showhrs)?"1":"0") + 
                            ((showmin)?"1":"0") + 
                            ((showsec)?"1":"0");
            
            var now = new Date().getTime();
            var ms=0;
            if (action=='stop') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
                vis.binds["mytime"].stopTimer(widgetID);          
                ms = (stopbehaviour=='timer')? timer:0;
            }
            if (action=='run') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
                ms = end-now;
                vis.binds["mytime"].startTimer(
                    widgetID,
                    data,
                    vis.binds["mytime"].countdowncircle.calcInterval(timer),
                    callback);
            }
            if (action=='pause') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdpause');
                vis.binds["mytime"].stopTimer(widgetID);                
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].stopTimer(widgetID);
            }
            if (action=='end') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdend');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = 0;
            }

            var cdObjnow = vis.binds["mytime"].calcCountdownFromMiliSeconds(ms, pattern);
            var cdObjtimer = vis.binds["mytime"].calcCountdownFromMiliSeconds(timer, pattern);
            
            var canvas = $('#' + widgetID+' canvas');
            var ctx = canvas[0].getContext("2d");
            vis.binds["mytime"].countdowncircle.clearBase(ctx);
            
            ctx.lineWidth = linewidth;

            var radius=0;
            var x = ctx.canvas.width/2;
            var y = ctx.canvas.height/2;
            var length = Math.min(ctx.canvas.width,ctx.canvas.height);
//var radius=(length/2)-(linewidth/2);
            var startangle=0;
            var bound=0;
            var gap=0;
            ['seconds','minutes','hours','days'].forEach(ring => {
                bound = (ring=='seconds') ? length/2 : radius-(linewidth/2);
                gap = (ring=='seconds') ? 0 : ringgap;
                radius=vis.binds["mytime"].countdowncircle.calcRadius(bound,linewidth,gap);
                
                if (ring=='seconds' && pattern[3]=='1') {
                    startangle = (pattern[2]=='1') ? cdObjnow[ring]*360/60 || 0: cdObjnow[ring]*360/cdObjtimer[ring] || 0;
                    if (vis.editMode) startangle=180;
                    vis.binds["mytime"].countdowncircle.drawBase(ctx,x,y,radius,bcolor);
                    vis.binds["mytime"].countdowncircle.drawRing(ctx,x,y,radius,startangle,fcolor,caps,reverse);                       
                }
                if (ring=='minutes' && pattern[2]=='1') {
                    startangle = (pattern[1]=='1') ? cdObjnow[ring]*360/60 || 0: cdObjnow[ring]*360/cdObjtimer[ring] || 0;
                    if (vis.editMode) startangle=180;
                    vis.binds["mytime"].countdowncircle.drawBase(ctx,x,y,radius,bcolor);
                    vis.binds["mytime"].countdowncircle.drawRing(ctx,x,y,radius,startangle,fcolor,caps,reverse);                       
                }
                if (ring=='hours' && pattern[1]=='1') {
                    startangle = (pattern[0]=='1') ? cdObjnow[ring]*360/24 || 0 : cdObjnow[ring]*360/cdObjtimer[ring] || 0;
                    if (vis.editMode) startangle=180;
                    vis.binds["mytime"].countdowncircle.drawBase(ctx,x,y,radius,bcolor);
                    vis.binds["mytime"].countdowncircle.drawRing(ctx,x,y,radius,startangle,fcolor,caps,reverse);                       
                }
                if (ring=='days' && pattern[0]=='1') {
                    startangle = cdObjnow[ring]*360/cdObjtimer[ring] || 0;
                    if (vis.editMode) startangle=180;
                    vis.binds["mytime"].countdowncircle.drawBase(ctx,x,y,radius,bcolor);
                    vis.binds["mytime"].countdowncircle.drawRing(ctx,x,y,radius,startangle,fcolor,caps,reverse);                       
                }

            });

            if (!notimetext) vis.binds["mytime"].countdowncircle.drawText(widgetID, ms,format);
        },
        calcRadius: function(bound,linewidth,gap) {
            var radius = (bound)-(linewidth/2)-gap;
            return (radius >= (linewidth/2)) ? radius : (linewidth/2);
        },
        clearBase: function(ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        },
        drawBase: function(ctx,x,y,radius,color) {
            ctx.beginPath();
            ctx.arc(x, y, radius, (360*(Math.PI/180)), (0*(Math.PI/180)),1);
            ctx.strokeStyle = color; //bcolor
            ctx.stroke();
            ctx.closePath();            
        },
        drawRing: function(ctx,x,y,radius,startangle,color,caps,reverse) {
            if (caps=='straight') ctx.lineCap = "butt";
            if (caps=='round') ctx.lineCap = "round";

            ctx.beginPath();
            ctx.strokeStyle = color;
            var sh=-90*(Math.PI/180);
            
            if (reverse) {
                ctx.arc(x, y, radius, ((startangle)*(Math.PI/180)+sh), (0*(Math.PI/180)+sh),1);
            } else {
                ctx.arc(x, y, radius, ((360-startangle)*(Math.PI/180)+sh), (0*(Math.PI/180)+sh),1);
            }
            ctx.stroke();
            ctx.closePath();
        },
        drawText: function(widgetID, ms,format) {
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
                if (idParts[idParts.length-2]!='action' && idParts[idParts.length-2]!='timer') return;
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
            
            vis.binds["mytime"].stopTimer(widgetID);
            vis.binds["mytime"].startTimer(
                widgetID,
                data,
                vis.binds["mytime"].countdownplain.intervaltime,
                vis.binds["mytime"].countdownplain.setState);
            if (vis.editMode) vis.binds["mytime"].countdownplain.setState(widgetID,data);
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
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdstop');
                vis.binds["mytime"].stopTimer(widgetID);
                ms = (stopbehaviour=='timer')? timer:0;
            }
            if (action=='run') {
                ms = end-now;
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdrun');
                vis.binds["mytime"].startTimer(
                    widgetID,
                    data,
                    vis.binds["mytime"].countdownplain.intervaltime,
                    vis.binds["mytime"].countdownplain.setState);
            }
            if (action=='pause') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdpause');
                vis.binds["mytime"].stopTimer(widgetID);            
                ms = end-start;
            }
            if (ms<=0) {
                ms=0;
                vis.binds["mytime"].stopTimer(widgetID);           
            }
            if (action=='end') {
                $('#'+widgetID+' .timer').removeClass('cdstop cdrun cdpause cdend').addClass('cdend');
                vis.binds["mytime"].stopTimer(widgetID);            
                ms = 0;
            }

            var text = '';
            text += vis.binds["mytime"].formatDate(ms,format);
            $('#' + widgetID + ' .timer').html(text);
        }
    },
    startTimer: function(widgetID,data,time,callback) {
        if (vis.binds["mytime"].intervals[widgetID]) return;
        if (vis.editMode) return;
        var interval;
        interval = setInterval(callback,time,widgetID,data,callback);
        console.log('startTimer '+widgetID+' '+interval);
        vis.binds["mytime"].intervals[widgetID]=interval;
    },
    stopTimer: function(widgetID) {
        var interval;
        if (vis.editMode) return;
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

        vis.conn.gettingStates = 0;
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
                        
        if (pattern.indexOf('101')>=0 || pattern.indexOf('1001')>=0) {
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


