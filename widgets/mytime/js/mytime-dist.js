"use strict";(()=>{var W=Object.create;var H=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var Q=(e,s)=>()=>(e&&(s=e(e=0)),s);var q=(e,s)=>()=>(s||e((s={exports:{}}).exports,s),s.exports);var J=(e,s,i,a)=>{if(s&&typeof s=="object"||typeof s=="function")for(let t of z(s))!j.call(e,t)&&t!==i&&H(e,t,{get:()=>s[t],enumerable:!(a=G(s,t))||a.enumerable});return e};var D=(e,s,i)=>(i=e!=null?W(Y(e)):{},J(s||!e||!e.__esModule?H(i,"default",{value:e,enumerable:!0}):i,e));var O=(e,s,i)=>new Promise((a,t)=>{var r=l=>{try{d(i.next(l))}catch(m){t(m)}},c=l=>{try{d(i.throw(l))}catch(m){t(m)}},d=l=>l.done?a(l.value):Promise.resolve(l.value).then(r,c);d((i=i.apply(e,s)).next())});var U,L=Q(()=>{U="1.4.0"});var V=q(F=>{"use strict";L();fetch("widgets/mytime/i18n/translations.json").then(e=>O(F,null,function*(){let s=yield e.json();$.extend(!0,systemDictionary,s)}));vis.binds.mytime={version:U,showVersion:function(){vis.binds.mytime.version&&(console.log(`Version mytime: ${vis.binds.mytime.version}`),vis.binds.mytime.version=null)},intervals:[],serversync:{},countdownnixie:{intervaltime:500,flips:[],createWidget:function(e,s,i,a){var t=$(`#${e}`);if(!t.length||!jQuery().mtFlipClock)return setTimeout(function(){vis.binds.mytime.countdownnixie.createWidget(e,s,i,a)},100);var r;if(!i.countdown_oid||(r=vis.binds.mytime.getCountdownId(i.countdown_oid))==!1)return;var c=i.countdown_showsec,d=i.countdown_showmin,l=i.countdown_showhrs,m=i.countdown_showday,b=i.countdown_color_active||"#FFE548",u=i.countdown_color_inactive||"#323232",v=i.countdown_opacity_inactive||.35,E=i.countdown_glowcolor||"#F58732",f=(m?"1":"0")+(l?"1":"0")+(d?"1":"0")+(c?"1":"0");if(f.indexOf("101")>=0||f.indexOf("1001")>=0){$(`#${e}`).html("Error: Invalid Format");return}function p(o){var A=o.type.split(".");A[A.length-2]!="action"&&A[A.length-2]!="timer"||vis.binds.mytime.countdownnixie.setState(e,i,vis.binds.mytime.countdownnixie.setState)}r&&(vis.editMode||vis.binds.mytime.bindStates(t,[`${r}.action`,`${r}.end`,`${r}.timer`,`${r}.config`,`${r}.start`],p));var n="";n+=`<style> 
`,n+=`#${e} .cdclock p.separator,
`,n+=`#${e} .cdclock section p.active {
`,n+=`    color: ${b};
`,n+=`    text-shadow: 0px 0px 20px ${E};
`,n+=`}
`,n+=`#${e} .cdclock  {
`,n+=`    color: ${u}${`0${parseInt(255*v).toString(16)}`.slice(-2)};
`,n+=`}
`,n+=`</style> 
`,n+=`<div class="cdclock">
`,m&&(n+=`    <section class="days">
`,n+=`        <div class="tens">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`        <div class="ones">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`    </section>
`),m&&l&&(n+=`    <p class="separator">:</p>
`),l&&(n+=`    <section class="hours">
`,n+=`        <div class="tens">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`        <div class="ones">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`    </section>
`),l&&d&&(n+=`    <p class="separator">:</p>
`),d&&(n+=`    <section class="mins">
`,n+=`        <div class="tens">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`        <div class="ones">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`    </section>
`),d&&c&&(n+=`    <p class="separator">:</p>
`),c&&(n+=`    <section class="secs">
`,n+=`        <div class="tens">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`        <div class="ones">
`,n+=`            <p>0</p>
`,n+=`            <p>1</p>
`,n+=`            <p>2</p>
`,n+=`            <p>3</p>
`,n+=`            <p>4</p>
`,n+=`            <p>5</p>
`,n+=`            <p>6</p>
`,n+=`            <p>7</p>
`,n+=`            <p>8</p>
`,n+=`            <p>9</p>
`,n+=`        </div>
`,n+=`    </section>
`),n+=`</div>
`,n+='<div class="timer"></div>',$(`#${e}`).html(n),vis.binds.mytime.stopTimer(e),vis.binds.mytime.startTimer(e,i,vis.binds.mytime.countdownnixie.intervaltime,vis.binds.mytime.countdownnixie.setState),vis.editMode&&vis.binds.mytime.countdownnixie.setState(e,i)},setState:function(e,s){var i;if(!(!s.countdown_oid||(i=vis.binds.mytime.getCountdownId(s.countdown_oid))==!1)){var a=i?vis.states.attr(`${i}.start.val`):0,t=i?vis.states.attr(`${i}.end.val`):0,r=i?vis.states.attr(`${i}.timer.val`):0,c=i?vis.states.attr(`${i}.action.val`):"stop",d=i?JSON.parse(vis.states.attr(`${i}.config.val`)||"{}"):{},l=d.stopbehaviour||"timer",m=s.countdown_showsec,b=s.countdown_showmin,u=s.countdown_showhrs,v=s.countdown_showday,E=new Date().getTime()-(vis.binds.mytime.serversync.serverTimeDiff||0),f=0;(c=="stop"||c=="")&&($(`#${e} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop"),vis.binds.mytime.stopTimer(e),f=l=="timer"?r:0),c=="run"&&(f=t-E,$(`#${e} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun"),vis.binds.mytime.startTimer(e,s,vis.binds.mytime.countdownnixie.intervaltime,vis.binds.mytime.countdownnixie.setState)),c=="pause"&&($(`#${e} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause"),vis.binds.mytime.stopTimer(e),f=t-a),f<=0&&(f=0,vis.binds.mytime.stopTimer(e)),c=="end"&&($(`#${e} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend"),vis.binds.mytime.stopTimer(e),f=0);var p=vis.binds.mytime.formatDate(f,"dd:HH:mm:ss").split(":");v&&vis.binds.mytime.countdownnixie.setDigits($(`#${e} .days`),p[0]),u&&vis.binds.mytime.countdownnixie.setDigits($(`#${e} .hours`),p[1]),b&&vis.binds.mytime.countdownnixie.setDigits($(`#${e} .mins`),p[2]),m&&vis.binds.mytime.countdownnixie.setDigits($(`#${e} .secs`),p[3])}},setDigits:function(e,s){let i=[...$(e).find(".tens")[0].children],a=[...$(e).find(".ones")[0].children];var t=s.length;i.forEach(r=>r.classList.remove("active")),i[s[t-2]].classList.add("active"),a.forEach(r=>r.classList.remove("active")),a[s[t-1]].classList.add("active")}},countdownflip:{intervaltime:500,flips:[],createWidget:function(e,s,i,a){var t=$(`#${e}`);if(!t.length||!jQuery().mtFlipClock)return setTimeout(function(){vis.binds.mytime.countdownflip.createWidget(e,s,i,a)},100);var r;if(!i.countdown_oid||(r=vis.binds.mytime.getCountdownId(i.countdown_oid))==!1)return;var c=i.countdown_showsec,d=i.countdown_showmin,l=i.countdown_showhrs,m=i.countdown_showday,b=a["font-family"]&&a["font-family"]!=""?a["font-family"]:"",u=i.countdown_color?i.countdown_color:"",v=i.countdown_background_color?i.countdown_background_color:"",E=i.countdown_dot_color?i.countdown_dot_color:"",f=(m?"1":"0")+(l?"1":"0")+(d?"1":"0")+(c?"1":"0");if(f.indexOf("101")>=0||f.indexOf("1001")>=0){$(`#${e}`).html("Error: Invalid Format");return}function p(o){var A=o.type.split(".");A[A.length-2]!="action"&&A[A.length-2]!="timer"||vis.binds.mytime.countdownflip.setState(e,i,vis.binds.mytime.countdownflip.setState)}r&&(vis.editMode||vis.binds.mytime.bindStates(t,[`${r}.action`,`${r}.end`,`${r}.timer`,`${r}.config`,`${r}.start`],p));var n="";n+=`<style> 
`,b!=""&&(n+=`#${e} .flip-clock-wrapper {
`,n+=`   font-family:  ${b}; 
`,n+=`} 
`),(v!=""||u!="")&&(n+=`#${e} .flip-clock-wrapper ul li a div div.inn {
`,v!=""&&(n+=`   background-color:  ${v}; 
`),u!=""&&(n+=`   color:  ${u}; 
`),n+=`} 
`),E!=""&&(n+=`#${e} .flip-clock-dot {
`,n+=`   background-color:  ${E}; 
`,n+=`} 
`),n+=`</style> 
`,n+='<div class="timer"></div>',$(`#${e}`).html(n),vis.binds.mytime.countdownflip.flips[e]=$(`#${e} .timer`).mtFlipClock(0,{clockFace:"Mytime",countdown:!0,autoStart:!1,pattern:f}),vis.binds.mytime.stopTimer(e),vis.binds.mytime.startTimer(e,i,vis.binds.mytime.countdownflip.intervaltime,vis.binds.mytime.countdownflip.setState),vis.editMode&&vis.binds.mytime.countdownflip.setState(e,i)},setState:function(e,s){var i;if(!(!s.countdown_oid||(i=vis.binds.mytime.getCountdownId(s.countdown_oid))==!1)){var a=i?vis.states.attr(`${i}.start.val`):0,t=i?vis.states.attr(`${i}.end.val`):0,r=i?vis.states.attr(`${i}.timer.val`):0,c=i?vis.states.attr(`${i}.action.val`):"stop",d=i?JSON.parse(vis.states.attr(`${i}.config.val`)||"{}"):{},l=d.stopbehaviour||"timer",m=new Date().getTime()-(vis.binds.mytime.serversync.serverTimeDiff||0),b=0;(c=="stop"||c=="")&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop"),vis.binds.mytime.stopTimer(e),b=l=="timer"?r:0),c=="run"&&(b=t-m,$(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun"),vis.binds.mytime.startTimer(e,s,vis.binds.mytime.countdownflip.intervaltime,vis.binds.mytime.countdownflip.setState)),c=="pause"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause"),vis.binds.mytime.stopTimer(e),b=t-a),b<=0&&(b=0,vis.binds.mytime.stopTimer(e)),c=="end"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend"),vis.binds.mytime.stopTimer(e),b=0),vis.binds.mytime.countdownflip.flips[e].setTime(parseInt(b/1e3))}}},countdowncircle:{intervaltime:500,createWidget:function(e,s,i,a){var t=$(`#${e}`);if(!t.length)return setTimeout(function(){vis.binds.mytime.countdowncircle.createWidget(e,s,i,a)},100);var r;if(!i.countdown_oid||(r=vis.binds.mytime.getCountdownId(i.countdown_oid))==!1)return;var c=i.countdown_showsec,d=i.countdown_showmin,l=i.countdown_showhrs,m=i.countdown_showday,b=(c?"1":"0")+(d?"1":"0")+(l?"1":"0")+(m?"1":"0");if(b.indexOf("101")>=0||b.indexOf("1001")>=0){$(`#${e}`).html("Error: Invalid Format");return}function u(p){var n=p.type.split(".");n[n.length-2]!="action"&&n[n.length-2]!="timer"||vis.binds.mytime.countdowncircle.setState(e,i,vis.binds.mytime.countdowncircle.setState)}r&&(vis.editMode||vis.binds.mytime.bindStates(t,[`${r}.action`,`${r}.end`,`${r}.timer`,`${r}.config`,`${r}.start`],u));var v=$(`#${e}`).width(),E=$(`#${e}`).height(),f="";f+=`<style> 
`,f+=`#${e} .timer {
`,f+=`   position:  absolute; 
`,f+=`   left:      50%; 
`,f+=`   top:       50%; 
`,f+=`   transform: translate(-50%, -50%); 
`,f+=`} 
`,f+=`</style> 
`,f+=`<canvas class="canvas" width="${v}" height="${E}"></canvas>`,f+='<div class="timer"></div>',$(`#${e}`).html(f),vis.binds.mytime.stopTimer(e),vis.binds.mytime.countdowncircle.setState(e,i),vis.binds.mytime.startTimer(e,i,vis.binds.mytime.countdowncircle.intervaltime,vis.binds.mytime.countdowncircle.setState)},calcInterval:function(e){return Math.min(Math.max(e/720,25),500)},setState:function(e,s,i){var a;if(!(!s.countdown_oid||(a=vis.binds.mytime.getCountdownId(s.countdown_oid))==!1)){var t=a?vis.states.attr(`${a}.start.val`):0,r=a?vis.states.attr(`${a}.end.val`):0,c=a?vis.states.attr(`${a}.timer.val`):0,d=a?vis.states.attr(`${a}.action.val`):"stop",l=a?JSON.parse(vis.states.attr(`${a}.config.val`)||"{}"):{},m=s.countdown_width||20,b=s.countdown_notimetext,u=s.countdown_format||"mm:ss",v=l&&l.stopbehaviour||"timer",E=s.countdown_background||"grey",f=s.countdown_foreground||"#87ceeb",p=s.countdown_reverse,n=s.countdown_caps||"straight",o=s.countdown_showsec,A=s.countdown_showmin,R=s.countdown_showhrs,B=s.countdown_showday,P=s.countdown_ringgap||5,T=(B?"1":"0")+(R?"1":"0")+(A?"1":"0")+(o?"1":"0"),Z=new Date().getTime()-(vis.binds.mytime.serversync.serverTimeDiff||0),S=0;(d=="stop"||d=="")&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop"),vis.binds.mytime.stopTimer(e),S=v=="timer"?c:0),d=="run"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun"),S=r-Z,vis.binds.mytime.startTimer(e,s,vis.binds.mytime.countdowncircle.calcInterval(c),i)),d=="pause"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause"),vis.binds.mytime.stopTimer(e),S=r-t),S<=0&&(S=0,vis.binds.mytime.stopTimer(e)),d=="end"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend"),vis.binds.mytime.stopTimer(e),S=0);var g=vis.binds.mytime.calcCountdownFromMiliSeconds(S,T),C=vis.binds.mytime.calcCountdownFromMiliSeconds(c,T),x=$(`#${e} canvas`),y=x[0].getContext("2d");vis.binds.mytime.countdowncircle.clearBase(y),y.lineWidth=m;var k=0,N=y.canvas.width/2,h=y.canvas.height/2,K=Math.min(y.canvas.width,y.canvas.height),w=0,I=0,M=0;["seconds","minutes","hours","days"].forEach(_=>{I=_=="seconds"?K/2:k-m/2,M=_=="seconds"?0:P,k=vis.binds.mytime.countdowncircle.calcRadius(I,m,M),_=="seconds"&&T[3]=="1"&&(w=T[2]=="1"?g[_]*360/60||0:g[_]*360/C[_]||0,vis.editMode&&(w=180),vis.binds.mytime.countdowncircle.drawBase(y,N,h,k,E),vis.binds.mytime.countdowncircle.drawRing(y,N,h,k,w,f,n,p)),_=="minutes"&&T[2]=="1"&&(w=T[1]=="1"?g[_]*360/60||0:g[_]*360/C[_]||0,vis.editMode&&(w=180),vis.binds.mytime.countdowncircle.drawBase(y,N,h,k,E),vis.binds.mytime.countdowncircle.drawRing(y,N,h,k,w,f,n,p)),_=="hours"&&T[1]=="1"&&(w=T[0]=="1"?g[_]*360/24||0:g[_]*360/C[_]||0,vis.editMode&&(w=180),vis.binds.mytime.countdowncircle.drawBase(y,N,h,k,E),vis.binds.mytime.countdowncircle.drawRing(y,N,h,k,w,f,n,p)),_=="days"&&T[0]=="1"&&(w=g[_]*360/C[_]||0,vis.editMode&&(w=180),vis.binds.mytime.countdowncircle.drawBase(y,N,h,k,E),vis.binds.mytime.countdowncircle.drawRing(y,N,h,k,w,f,n,p))}),b||vis.binds.mytime.countdowncircle.drawText(e,S,u)}},calcRadius:function(e,s,i){var a=e-s/2-i;return a>=s/2?a:s/2},clearBase:function(e){e.clearRect(0,0,e.canvas.width,e.canvas.height)},drawBase:function(e,s,i,a,t){e.beginPath(),e.arc(s,i,a,360*(Math.PI/180),0*(Math.PI/180),1),e.strokeStyle=t,e.stroke(),e.closePath()},drawRing:function(e,s,i,a,t,r,c,d){c=="straight"&&(e.lineCap="butt"),c=="round"&&(e.lineCap="round"),e.beginPath(),e.strokeStyle=r;var l=-90*(Math.PI/180);d?e.arc(s,i,a,t*(Math.PI/180)+l,0*(Math.PI/180)+l,1):e.arc(s,i,a,(360-t)*(Math.PI/180)+l,0*(Math.PI/180)+l,1),e.stroke(),e.closePath()},drawText:function(e,s,i){var a="";a+=vis.binds.mytime.formatDate(s,i),$(`#${e} .timer`).html(a)}},reversecountdownplain:{intervaltime:500,createWidget:function(e,s,i,a){var t=$(`#${e}`);if(!t.length)return setTimeout(function(){vis.binds.mytime.reversecountdownplain.createWidget(e,s,i,a)},100);i.datetime=i.countdown_datetime||new Date().toISOString();var r="";r+='<div class="timer"></div>',$(`#${e}`).html(r),vis.binds.mytime.stopTimer(e),vis.binds.mytime.startTimer(e,i,vis.binds.mytime.reversecountdownplain.intervaltime,vis.binds.mytime.reversecountdownplain.setState),vis.editMode&&vis.binds.mytime.reversecountdownplain.setState(e,i)},setState:function(e,s){var i=s.countdown_format||"dd\\d HH\\h mm\\m ss\\s",a=s.countdown_html_prepend||"",t=s.countdown_html_append||"",r=new Date().getTime()-(vis.binds.mytime.serversync.serverTimeDiff||0),c=new Date(s.datetime).getTime(),d=r-c,l="";l+=vis.binds.mytime.formatDate(d,i),$(`#${e} .timer`).html(a+l+t)}},countdownplain:{intervaltime:500,createWidget:function(e,s,i,a){var t=$(`#${e}`);if(!t.length)return setTimeout(function(){vis.binds.mytime.countdownplain.createWidget(e,s,i,a)},100);var r;if(!i.countdown_oid||(r=vis.binds.mytime.getCountdownId(i.countdown_oid))==!1)return;function c(l){var m=l.type.split(".");m[m.length-2]!="action"&&m[m.length-2]!="timer"||vis.binds.mytime.countdownplain.setState(e,i)}r&&(vis.editMode||vis.binds.mytime.bindStates(t,[`${r}.action`,`${r}.end`,`${r}.timer`,`${r}.config`,`${r}.start`],c));var d="";d+='<div class="timer"></div>',$(`#${e}`).html(d),vis.binds.mytime.stopTimer(e),vis.binds.mytime.startTimer(e,i,vis.binds.mytime.countdownplain.intervaltime,vis.binds.mytime.countdownplain.setState),vis.editMode&&vis.binds.mytime.countdownplain.setState(e,i)},setState:function(e,s){var i;if(!(!s.countdown_oid||(i=vis.binds.mytime.getCountdownId(s.countdown_oid))==!1)){var a=i?vis.states.attr(`${i}.start.val`):0,t=i?vis.states.attr(`${i}.end.val`):0,r=i?vis.states.attr(`${i}.timer.val`):0,c=i?vis.states.attr(`${i}.action.val`):"stop",d=i?JSON.parse(vis.states.attr(`${i}.config.val`)||"{}"):{},l=s.countdown_format||"dd\\d HH\\h mm\\m ss\\s",m=d.stopbehaviour||"timer",b=new Date().getTime()-(vis.binds.mytime.serversync.serverTimeDiff||0),u=0;(c=="stop"||c=="")&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop"),vis.binds.mytime.stopTimer(e),u=m=="timer"?r:0),c=="run"&&(u=t-b,$(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun"),vis.binds.mytime.startTimer(e,s,vis.binds.mytime.countdownplain.intervaltime,vis.binds.mytime.countdownplain.setState)),c=="pause"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause"),vis.binds.mytime.stopTimer(e),u=t-a),u<=0&&(u=0,vis.binds.mytime.stopTimer(e)),c=="end"&&($(`#${e} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend"),vis.binds.mytime.stopTimer(e),u=0);var v="";v+=vis.binds.mytime.formatDate(u,l),$(`#${e} .timer`).html(v)}}},wordclock:{lang_pack:[],lang_map:{english:"EN",german:"DE",swiss:"CH_BERN",swabian:"DE_SWG",italian:"IT",spanish:"ES",russian:"RU",french:"fr-CA",turkish:"TR",dutch:"NL"},createWidget:function(e,s,i,a){var t=$(`#${e}`);if(!t.length)return setTimeout(function(){vis.binds.mytime.wordclock.createWidget(e,s,i,a)},100);var r=i.language||"english",c=i.letterActivated||"#fff",d=i.letterDeactivated||"#333",l=i.wordclockMargin||0,m=i.withMinutes||!1,b=i.withSeconds||!1,u=i.minuteSize||5,v=i.secondSize||5,E=i.minuteColor||"green",f=i.secondColor||"blue",p=this.lang_map[r],n=this.lang_pack.find(A=>A.langCode==p),o="";o+=`<style> 
`,o+=`#${e} .wc__frame {
`,o+=`   display: table; 
`,o+=`   margin: auto; 
`,o+=`   position: relative; 
`,o+=`   top: 50%; 
`,o+=`   transform: translateY(-50%); 
`,o+=`} 
`,o+=`#${e} .wc__frame__row {
`,o+=`   display: flex; 
`,o+=`} 
`,o+=`#${e} .wc__column__left, .wc__column__right {
`,o+=`   display: flex; 
`,o+=`   width: ${m?Math.max(u,v):"0"}px; 
`,o+=`   flex-direction: column; 
`,o+=`   justify-content: space-around; 
`,o+=`   align-items: center; 
`,o+=`   line-height: 0px; 
`,o+=`} 
`,o+=`#${e} .wc__column__middle {
`,o+=`   display: flex; 
`,o+=`   justify-content: space-around; 
`,o+=`   flex-grow: 1; 
`,o+=`} 
`,o+=`#${e} .wc__minute {
`,o+=`   width: ${u}px; 
`,o+=`   height: ${u}px; 
`,o+=`} 
`,o+=`#${e} .wc__minute_active {
`,o+=`   background-color: ${E}; 
`,o+=`   border-radius: 50%; 
`,o+=`} 
`,o+=`#${e} .wc__second {
`,o+=`   display: inline-block; 
`,o+=`   border-radius: 50%; 
`,o+=`} 
`,o+=`#${e} .wc__column__left .wc__second, .wc__column__right .wc__second {
`,o+=`   width: ${v}px; 
`,o+=`   height: ${v}px; 
`,o+=`} 
`,o+=`#${e} .wc__column__middle .wc__second {
`,o+=`   width: ${v}px; 
`,o+=`   height: ${v}px; 
`,o+=`} 
`,o+=`#${e} .wc__second__container {
`,o+=`   display: table-cell; 
`,o+=`   vertical-align: middle; 
`,o+=`   text-align: center; 
`,o+=`   line-height: 0px; 
`,o+=`} 
`,o+=`#${e} .wc__second_active {
`,o+=`   background-color: ${f}; 
`,o+=`   border-radius: 50%; 
`,o+=`} 
`,o+=`#${e} .wc__wordclock {
`,o+=`   display: flex; 
`,o+=`   flex-direction: column; 
`,o+=`   margin: ${l}px; 
`,o+=`} 
`,o+=`#${e} .wc__row {
`,o+=`   display: flex; 
`,o+=`   flex-direction: row; 
`,o+=`   align-items: stretch; 
`,o+=`} 
`,o+=`#${e} .wc__row__letter {
`,o+=`   width: 1em; 
`,o+=`   text-align:center; 
`,o+=`   color:${d}; 
`,o+=`   transition: color 1s; 
`,o+=`} 
`,o+=`#${e} .wc__row__letter_active {
`,o+=`   color:${c}; 
`,o+=`} 
`,o+=`</style> 
`,o+=`<div class="wc__frame"> 
`,o+=`  <div class="wc__frame__row wc__frame__row__top"> 
`,o+=`    <div class="wc__column__left"> 
`,m&&(o+=`    <div class="wc__minute"></div> 
`),o+=`    </div> 
`,o+=`    <div class="wc__column__middle"> 
`,b&&(o+=`    <div class="wc__second__container"><div class="wc__second"></div></div> 
`.repeat(15)),o+=`    </div> 
`,o+=`    <div class="wc__column__right"> 
`,m&&(o+=`    <div class="wc__minute"></div> 
`),o+=`    </div> 
`,o+=`  </div> 
`,o+=`  <div class="wc__frame__row wc__frame__row__middle"> 
`,o+=`    <div class="wc__column__left"> 
`,b&&(o+=`    <div class="wc__second__container"><div class="wc__second"></div></div> 
`.repeat(15)),o+=`    </div> 
`,o+=`    <div class="wc__column__middle"> 
`,o+=`<div class="wc__wordclock"> 
`;for(let A of n.letterSet){o+=`<div class="wc__row"> 
`;for(let R of A)o+=`<span class="wc__row__letter">${R}</span> 
`;o+=`</div> 
`}o+=`</div> 
`,o+=`    </div> 
`,o+=`    <div class="wc__column__right"> 
`,b&&(o+=`    <div class="wc__second__container"><div class="wc__second"></div></div> 
`.repeat(15)),o+=`    </div> 
`,o+=`  </div> 
`,o+=`  <div class="wc__frame__row wc__frame__row__bottom"> 
`,o+=`    <div class="wc__column__left"> 
`,m&&(o+=`    <div class="wc__minute"></div> 
`),o+=`    </div> 
`,o+=`    <div class="wc__column__middle"> 
`,b&&(o+=`    <div class="wc__second__container"><div class="wc__second"></div></div> 
`.repeat(15)),o+=`    </div> 
`,o+=`    <div class="wc__column__right"> 
`,m&&(o+=`    <div class="wc__minute"></div> 
`),o+=`    </div> 
`,o+=`  </div> 
`,o+=`</div> 
`,$(`#${e}`).html(o),vis.binds.mytime.stopTimer(e),vis.binds.mytime.startTimer(e,i,1e3,vis.binds.mytime.wordclock.render.bind(this)),this.render(e,i)},render:function(e,s){var i=s.timezone||vis.binds.mytime.getCurrentTimezone(),a=s.language||"english",t=this.lang_map[a],r=this.lang_pack.find(A=>A.langCode==t),c=new Date;c=vis.binds.mytime.convertDate2Timezone(c,i);var d=c.getMinutes()%5,l=$(`#${e} .wc__frame`),m=l.find(" .wc__wordclock"),b=m.find(".wc__row__letter");b.removeClass("wc__row__letter_active");for(var u=r.timeString(c.getHours(),c.getMinutes()).split(" "),v=r.letterSet.map(A=>A.join("")).join(""),E=0,f=0;f<u.length;f++){var p=v.indexOf(u[f],E);E=p+1,b.slice(p,p+u[f].length).addClass("wc__row__letter_active")}var n=l.find(".wc__minute");n.removeClass("wc__minute_active"),d==1&&n.eq(0).addClass("wc__minute_active"),d==2&&(n.eq(0).addClass("wc__minute_active"),n.eq(1).addClass("wc__minute_active")),d==3&&(n.eq(0).addClass("wc__minute_active"),n.eq(1).addClass("wc__minute_active"),n.eq(3).addClass("wc__minute_active")),d==4&&(n.eq(0).addClass("wc__minute_active"),n.eq(1).addClass("wc__minute_active"),n.eq(2).addClass("wc__minute_active"),n.eq(3).addClass("wc__minute_active"));var o=$([].concat(l.find(".wc__frame__row__top .wc__column__middle .wc__second ").get(),l.find(".wc__frame__row__middle .wc__column__right .wc__second ").get(),l.find(".wc__frame__row__bottom .wc__column__middle .wc__second ").get().reverse(),l.find(".wc__frame__row__middle .wc__column__left .wc__second ").get().reverse()));o.removeClass("wc__second_active"),o.slice(0,c.getSeconds()).addClass("wc__second_active")},addLanguage:function(e){this.lang_pack.push(e)}},startTimer:function(e,s,i,a){if(!vis.binds.mytime.intervals[e]&&!vis.editMode){var t;t=setInterval(a,i,e,s,a),vis.binds.mytime.intervals[e]=t}},stopTimer:function(e){var s;vis.editMode||(s=vis.binds.mytime.intervals[e]?vis.binds.mytime.intervals[e]:null,s&&delete vis.binds.mytime.intervals[e],s&&clearInterval(s))},getCountdownId:function(e){var s=e.split(".");return s[2]!="Countdowns"?!1:(s.pop(),s.join("."))},calcCountdownFromMiliSeconds:function(e,s){var i={};return s[0]=="1"&&(i.days=Math.floor(e/1e3/60/60/24),e-=i.days*1e3*60*60*24),s[1]=="1"&&(i.hours=Math.floor(e/1e3/60/60),e-=i.hours*1e3*60*60),s[2]=="1"&&(i.minutes=Math.floor(e/1e3/60),e-=i.minutes*1e3*60),s[3]=="1"&&(i.seconds=Math.floor(e/1e3),e-=i.seconds*1e3),i},bindStates:function(e,s,i){var a=$(e),t=a.data("bound");if(t)for(var r=0;r<t.length;r++)vis.states.unbind(t[r],i);a.data("bound",null),a.data("bindHandler",null),vis.conn.gettingStates=0,vis.conn.getStates(s,function(c,d){vis.binds.mytime.updateStates(d),vis.conn.subscribe(s);for(var l=0;l<s.length;l++)s[l]=`${s[l]}.val`,vis.states.bind(s[l],i);a.data("bound",s),a.data("bindHandler",i)}.bind({change_callback:i}))},updateStates:function(e){for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var i=e[s];try{if(vis.editMode)vis.states[`${s}.val`]=i.val,vis.states[`${s}.ts`]=i.ts,vis.states[`${s}.ack`]=i.ack,vis.states[`${s}.lc`]=i.lc,i.q!==void 0&&i.q!==null&&(vis.states[`${s}.q`]=i.q);else{let a={};a[`${s}.val`]=i.val,a[`${s}.ts`]=i.ts,a[`${s}.ack`]=i.ack,a[`${s}.lc`]=i.lc,i.q!==void 0&&i.q!==null&&(a[`${s}.q`]=i.q),vis.states.attr(a)}}catch(a){console.error(`Error: can't create states object for ${s}(${a})`)}}},formatDate:function(e,s){function i(m,b){var u=`${m}`;for(b=b||2;u.length<b;)u=`0${u}`;return u}var a=(s.search(/(^|[^\\])d/g)>=0?"1":"0")+(s.search(/(^|[^\\])H/g)>=0?"1":"0")+(s.search(/(^|[^\\])m/g)>=0?"1":"0")+(s.search(/(^|[^\\])s/g)>=0?"1":"0");if(a.indexOf("101")>=0||a.indexOf("1001")>=0)return"Error: Invalid Format";var t=vis.binds.mytime.calcCountdownFromMiliSeconds(e,a),r=t.days;s=s.replace(/(^|[^\\])dd/g,`$1${i(r)}`),s=s.replace(/(^|[^\\])d/g,`$1${r}`);var c=t.hours;s=s.replace(/(^|[^\\])HH+/g,`$1${i(c)}`),s=s.replace(/(^|[^\\])H/g,`$1${c}`);var d=t.minutes;s=s.replace(/(^|[^\\])mm+/g,`$1${i(d)}`),s=s.replace(/(^|[^\\])m/g,`$1${d}`);var l=t.seconds;return s=s.replace(/(^|[^\\])ss+/g,`$1${i(l)}`),s=s.replace(/(^|[^\\])s/g,`$1${l}`),s=s.replace(/\\(.)/g,"$1"),s},getTimezones:function(){return timezones.map(e=>e.label)},convertDate2Timezone:function(e,s){return new Date((typeof e=="string"?new Date(e):e).toLocaleString("en-US",{timeZone:s}))},getCurrentTimezone:function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},attrSelect:function(e,s){var i={};if(e==="timezone"){s=s||this.getTimezones();for(var a="",t=vis.widgets[vis.activeWidgets].data.timezone||this.getCurrentTimezone(),r=0;r<s.length;r++)s[r]===t?a+=`<option value="${s[r]}" selected="selected">${s[r]}</option>`:a+=`<option value="${s[r]}">${s[r]}</option>`;i={input:`<select type="text" id="inspect_${e}">${a}</select>`}}return i},calcServerTimeDiff:function(){return O(this,null,function*(){try{let e=yield this.sendToAsync("mytime.0","getServerTime"),s=new Date().getTime();this.serversync.serverTimeDiff=e-s}catch(e){console.log(e)}setTimeout(()=>{this.calcServerTimeDiff()},15e3)})},sendToAsync:function(e,s,i){return O(this,null,function*(){return console.log(`sendToAsync ${s} ${i||"no parameters"}`),new Promise((a,t)=>{try{vis.conn||t("no vis.conn object"),vis.conn.sendTo(e,s,i,function(r){a(r)})}catch(r){t(r)}})})}};vis.binds.mytime.showVersion();vis.binds.mytime.calcServerTimeDiff()});var ne=D(V());vis.binds.mytime.wordclock.addLanguage({langCode:"CH_BERN",letterSet:[["\xC4","S","M","I","S","C","H","U","F","\xDC","F"],["Z","\xC4","H","N","Z","W","\xC4","N","Z","G","I"],["N","A","B","H","V","I","E","R","T","U","L"],["V","O","R","N","A","B","H","A","U","B","I"],["E","I","S","S","Z","W","\xD6","I","W","E","I"],["D","R","\xDC","\xDC","E","A","V","I","E","R","I"],["F","\xDC","F","I","N","S","\xC4","C","H","S","I"],["S","I","B","N","I","I","A","C","H","T","I"],["N","\xDC","N","I","Z","\xC4","H","N","I","L","F"],["E","U","F","I","F","Z","W","\xD6","U","F","I"]],timeString:function(e,s,i={round:!1}){var a="\xC4S ISCH ";e%=12,e==0&&(e=12);var t=["EIS","ZW\xD6I","DR\xDC\xDC","VIERI","F\xDCFI","S\xC4CHSI","SIBNI","ACHTI","N\xDCNI","Z\xC4HNI","EUFI","ZW\xD6UFI"];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=e==1?"EIS":t[e-1];break;case 5:a+=`F\xDCF AB ${t[e-1]}`;break;case 10:a+=`Z\xC4H AB ${t[e-1]}`;break;case 15:a+=`VIERTU AB ${t[e-1]}`;break;case 20:a+=`ZW\xC4NZG AB ${t[e-1]}`;break;case 25:a+=`F\xDCF VOR HAUBI ${t[e%12]}`;break;case 30:a+=`HAUBI ${t[e%12]}`;break;case 35:a+=`F\xDCF AB HAUBI ${t[e%12]}`;break;case 40:a+=`ZW\xC4NZG VOR ${t[e%12]}`;break;case 45:a+=`VIERTU VOR ${t[e%12]}`;break;case 50:a+=`Z\xC4H VOR ${t[e%12]}`;break;case 55:a+=`F\xDCF VOR ${t[e%12]}`;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"DE",letterSet:[["E","S","T","I","S","T","I","M","E","I","N","E"],["V","I","E","R","T","E","L","A","Z","E","H","N"],["Z","W","A","N","Z","I","G","F","\xDC","N","F","N"],["N","A","C","H","V","O","R","D","H","A","L","B"],["D","A","T","Z","W","\xD6","L","F","E","I","N","S"],["Z","W","E","I","D","R","E","I","V","I","E","R"],["F","\xDC","N","F","S","E","C","H","S","E","L","F"],["E","S","I","E","B","E","N","A","C","H","T","T"],["N","E","U","N","I","Z","E","H","N","U","H","R"]],timeString:function(e,s,i={round:!1}){var a="ES IST ";e%=12,e==0&&(e=12);var t=["EINS ","ZWEI ","DREI ","VIER ","F\xDCNF ","SECHS ","SIEBEN ","ACHT ","NEUN ","ZEHN ","ELF ","ZW\xD6LF "];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=`${e==1?"EIN ":t[e-1]}UHR`;break;case 5:a+=`F\xDCNF NACH ${t[e-1]}`;break;case 10:a+=`ZEHN NACH ${t[e-1]}`;break;case 15:a+=`VIERTEL NACH ${t[e-1]}`;break;case 20:a+=`ZWANZIG NACH ${t[e-1]}`;break;case 25:a+=`F\xDCNF VOR HALB ${t[e%12]}`;break;case 30:a+=`HALB ${t[e%12]}`;break;case 35:a+=`F\xDCNF NACH HALB ${t[e%12]}`;break;case 40:a+=`ZWANZIG VOR ${t[e%12]}`;break;case 45:a+=`VIERTEL VOR ${t[e%12]}`;break;case 50:a+=`ZEHN VOR ${t[e%12]}`;break;case 55:a+=`F\xDCNF VOR ${t[e%12]}`;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"DE_SWG",letterSet:[["E","S","K","I","S","C","H","F","U","N","K"],["D","R","E","I","V","I","E","R","T","L","A"],["Z","E","H","N","B","I","E","F","\xDC","N","F"],["N","A","C","H","G","E","R","T","V","O","R"],["H","A","L","B","X","F","\xDC","N","F","E","I"],["O","I","S","E","C","H","S","E","L","F","E"],["Z","W","O","I","E","A","C","H","T","E","D"],["D","R","E","I","E","Z","W","\xD6","L","F","E"],["Z","E","H","N","E","U","N","E","U","H","L"],["S","I","E","B","N","E","V","I","E","R","E"]],timeString:function(e,s,i={round:!1}){var a="ES ISCH ";e%=12,e==0&&(e=12);var t=["OISE","ZWOIE","DREIE","VIERE","F\xDCNFE","SECHSE","SIEBNE","ACHTE","NEUNE","ZEHNE","ELFE","ZW\xD6LFE"];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=t[e-1];break;case 5:a+=`F\xDCNF NACH ${t[e-1]}`;break;case 10:a+=`ZEHN NACH ${t[e-1]}`;break;case 15:a+=`VIERTL ${t[e%12]}`;break;case 20:a+=`ZEHN VOR HALB ${t[e%12]}`;break;case 25:a+=`F\xDCNF VOR HALB ${t[e%12]}`;break;case 30:a+=`HALB ${t[e%12]}`;break;case 35:a+=`F\xDCNF NACH HALB ${t[e%12]}`;break;case 40:a+=`ZEHN NACH HALB ${t[e%12]}`;break;case 45:a+=`DREIVIERTL ${t[e%12]}`;break;case 50:a+=`ZEHN VOR ${t[e%12]}`;break;case 55:a+=`F\xDCNF VOR ${t[e%12]}`;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"EN",letterSet:[["I","T","E","I","S","Z","S","J","U","S","T"],["A","F","T","E","R","N","E","A","R","L","Y"],["A","C","Q","U","A","R","T","E","R","K","O"],["T","W","E","N","T","Y","F","I","V","E","X"],["H","A","L","F","C","T","E","N","E","T","O"],["P","A","S","T","B","S","E","V","E","N","L"],["O","N","E","T","W","O","T","H","R","E","E"],["F","O","U","R","F","I","V","E","S","I","X"],["N","I","N","E","K","T","W","E","L","V","E"],["E","I","G","H","T","E","L","E","V","E","N"],["T","E","N","P","Y","O","C","L","O","C","K"]],timeString:function(e,s,i={round:!1,fuzzyTime:"none"}){var a="IT IS ";e%=12,e==0&&(e=12);var t=["ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN","ELEVEN","TWELVE"];switch((i.fuzzyTime=="both"||i.fuzzyTime=="after")&&s%5<=2&&s%5!=0&&(a+="JUST AFTER "),(i.fuzzyTime=="both"||i.fuzzyTime=="before")&&s%5>=3&&(s>55&&(e=(e+1)%12,e==0&&(e=12)),a+="NEARLY "),(i.round||i.fuzzyTime=="both"||i.fuzzyTime=="before"?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=`${t[e-1]} OCLOCK`;break;case 5:a+=`FIVE PAST ${t[e-1]}`;break;case 10:a+=`TEN PAST ${t[e-1]}`;break;case 15:a+=`A QUARTER PAST ${t[e-1]}`;break;case 20:a+=`TWENTY PAST ${t[e-1]}`;break;case 25:a+=`TWENTYFIVE PAST ${t[e-1]}`;break;case 30:a+=`HALF PAST ${t[e-1]}`;break;case 35:a+=`TWENTYFIVE TO ${t[e%12]}`;break;case 40:a+=`TWENTY TO ${t[e%12]}`;break;case 45:a+=`A QUARTER TO ${t[e%12]}`;break;case 50:a+=`TEN TO ${t[e%12]}`;break;case 55:a+=`FIVE TO ${t[e%12]}`;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"NL",letterSet:[["H","E","T","K","I","S","A","V","I","J","F"],["T","I","E","N","A","T","Z","V","O","O","R"],["O","V","E","R","M","E","K","W","A","R","T"],["H","A","L","F","S","P","M","O","V","E","R"],["V","O","O","R","T","H","G","E","E","N","S"],["T","W","E","E","A","M","C","D","R","I","E"],["V","I","E","R","V","I","J","F","Z","E","S"],["Z","E","V","E","N","O","N","E","G","E","N"],["A","C","H","T","T","I","E","N","E","L","F"],["T","W","A","A","L","F","P","M","U","U","R"]],timeString:function(e,s,i={round:!1}){var a="HET IS ";e%=12,e==0&&(e=12);var t=["EEN","TWEE","DRIE","VIER","VIJF","ZES","ZEVEN","ACHT","NEGEN","TIEN","ELF","TWAALF"];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=`${e==1?"EEN":t[e-1]} UUR`;break;case 5:a+=`VIJF OVER ${t[e-1]}`;break;case 10:a+=`TIEN OVER ${t[e-1]}`;break;case 15:a+=`KWART OVER ${t[e-1]}`;break;case 20:a+=`TIEN VOOR HALF ${t[e-1]}`;break;case 25:a+=`VIJF VOOR HALF ${t[e%12]}`;break;case 30:a+=`HALF ${t[e%12]}`;break;case 35:a+=`VIJF OVER HALF ${t[e%12]}`;break;case 40:a+=`TIEN OVER HALF ${t[e%12]}`;break;case 45:a+=`KWART OVER ${t[e%12]}`;break;case 50:a+=`TIEN VOOR ${t[e%12]}`;break;case 55:a+=`VIJF VOOR ${t[e%12]}`;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"IT",letterSet:[["S","O","N","O","R","L","E","B","O","R","E"],["\xC8","R","L","'","U","N","A","D","U","E","Z"],["T","R","E","O","T","T","O","N","O","V","E"],["D","I","E","C","I","U","N","D","I","C","I"],["D","O","D","I","C","I","S","E","T","T","E"],["Q","U","A","T","T","R","O","C","S","E","I"],["C","I","N","Q","U","E","S","M","E","N","O"],["E","C","U","N","O","Q","U","A","R","T","O"],["V","E","N","T","I","C","I","N","Q","U","E"],["D","I","E","C","I","E","M","E","Z","Z","A"]],timeString:function(e,s,i={round:!1}){var a="";e%=12;var t=(i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60,r=["DODICI ","UNA ","DUE ","TRE ","QUATTRO ","CINQUE ","SEI ","SETTE ","OTTO ","NOVE ","DIECI ","UNDICI "];switch(e==1&&t<30||e==0&&t>30?a+="\xC8 L' ":a+="SONO LE ORE ",t>=5&&(t<35?a+=`${r[e]}E `:a+=`${r[e+1==12?0:e+1]}MENO `),t){case 0:a+=r[e];break;case 5:a+="CINQUE ";break;case 10:a+="DIECI ";break;case 15:a+="UN QUARTO ";break;case 20:a+="VENTI ";break;case 25:a+="VENTICINQUE ";break;case 30:a+="MEZZA ";break;case 35:a+="VENTICINQUE ";break;case 40:a+="VENTI ";break;case 45:a+="UN QUARTO ";break;case 50:a+="DIECI ";break;case 55:a+="CINQUE ";break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"fr-CA",letterSet:[["I","L","W","E","S","T","B","S","I","X","G"],["U","N","D","E","U","X","T","R","A","I","S"],["Q","U","A","T","R","E","D","O","U","Z","E"],["C","I","N","Q","S","E","P","T","D","I","X"],["H","U","I","T","F","N","E","U","F","K","I"],["O","N","Z","E","C","H","E","U","R","E","S"],["E","T","D","U","T","R","E","N","T","E","R"],["M","O","I","N","S","H","D","E","M","I","K"],["D","I","X","Z","Q","U","A","R","T","S","D"],["G","A","M","V","T","U","A","R","T","U","C"],["V","I","N","G","T","-","C","I","N","Q","R"]],timeString:function(e,s,i={round:!1}){var a="IL EST ";e%=12,e==0&&(e=12);var t=["UN","DEUX","TROIS","QUATRE","CINQ","SIX","SEPT","HUIT","NEUF","DIX","ONZE","DOUZE"];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=`${t[e-1]} HEURES`;break;case 5:a+=`${t[e-1]} HEURES CINQ`;break;case 10:a+=`${t[e-1]} HEURES DIX`;break;case 15:a+=`${t[e-1]} HEURES ET QUART`;break;case 20:a+=`${t[e-1]} HEURES ET VINGT`;break;case 25:a+=`${t[e-1]} HEURES ET VINGT-CINQ`;break;case 30:a+=`${t[e-1]} HEURES ET DEMI`;break;case 35:a+=`${t[e-1]} HEURES TRENTE CINQ`;break;case 40:a+=`${t[e%12]} HEURES MOINS VINGT`;break;case 45:a+=`${t[e%12]} HEURES MOINS QUART`;break;case 50:a+=`${t[e%12]} HEURES MOINS DIX`;break;case 55:a+=`${t[e%12]} HEURES MOINS CINQ`;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"RU",letterSet:[["\u041E","\u0414","\u0418","\u041D","\u041F","\u042F","\u0422","\u042C","\u0414","\u0412","\u0410"],["\u0414","\u0415","\u0428","\u0415","\u0421","\u0422","\u042C","\u0412","\u042F","\u0422","\u042C"],["\u0412","\u041E","\u0427","\u0415","\u0421","\u0415","\u041C","\u042C","\u0422","\u0420","\u0418"],["\u0422","\u042B","\u0414","\u0412","\u0415","\u0420","\u0415","\u0421","\u042F","\u0422","\u042C"],["\u041D","\u0410","\u0414","\u0426","\u0410","\u0422","\u042C","\u0427","\u0410","\u0421","\u0410"],["\u0427","\u0410","\u0421","\u041E","\u0412","\u0414","\u0421","\u041E","\u0420","\u041E","\u041A"],["\u0422","\u0420","\u0418","\u0414","\u0412","\u0410","\u0414","\u041F","\u042F","\u0422","\u042C"],["\u041F","\u042F","\u0422","\u041D","\u0410","\u0414","\u0415","\u0426","\u0410","\u0422","\u042C"],["\u0410","\u041C","\u0414","\u0415","\u0421","\u042F","\u0422","\u0421","\u042F","\u0422","\u042C"],["\u041F","\u042F","\u0422","\u042C","\u042F","\u0420","\u041C","\u0418","\u041D","\u0423","\u0422"]],timeString:function(e,s,i={round:!1}){var a="\u0421\u0415\u0419\u0427\u0410\u0421 ";e%=12,e==0&&(e=12);var t=["\u0427\u0410\u0421 ","\u0414\u0412\u0410 \u0427\u0410\u0421\u0410 ","\u0422\u0420\u0418 \u0427\u0410\u0421\u0410 ","\u0427\u0415 \u0422\u042B \u0420\u0415 \u0427\u0410\u0421\u0410 ","\u041F\u042F\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ","\u0428\u0415\u0421\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ","\u0421\u0415\u041C\u042C \u0427\u0410\u0421\u041E\u0412 ","\u0412\u041E \u0421\u0415\u041C\u042C \u0427\u0410\u0421\u041E\u0412 ","\u0414\u0415 \u0412\u042F\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ","\u0414\u0415 \u0421\u042F\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ","\u041E\u0414\u0418\u041D \u041D\u0410\u0414\u0426\u0410\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ","\u0414\u0412\u0415 \u041D\u0410\u0414\u0426\u0410\u0422\u042C \u0427\u0410\u0421\u041E\u0412 "];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=t[e-1];break;case 5:a+=`${t[e]}\u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 10:a+=`${t[e]}\u0414\u0415 \u0421\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 15:a+=`${t[e]}\u041F\u042F\u0422\u041D\u0410\u0414 \u0426\u0410\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 20:a+=`${t[e]}\u0414\u0412\u0410\u0414 \u0426\u0410\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 25:a+=`${t[e]}\u0414\u0412\u0410\u0414 \u0426\u0410\u0422\u042C \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 30:a+=`${t[e]}\u0422\u0420\u0418\u0414 \u0426\u0410\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 35:a+=`${t[e]}\u0422\u0420\u0418\u0414 \u0426\u0410\u0422\u042C \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 40:a+=`${t[e]}\u0421\u041E\u0420\u041E\u041A \u041C\u0418\u041D\u0423\u0422 `;break;case 45:a+=`${t[e]}\u0421\u041E\u0420\u041E\u041A \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break;case 50:a+=`${t[e]}\u041F\u042F\u0422\u042C \u0414\u0415\u0421\u042F\u0422 \u041C\u0418\u041D\u0423\u0422 `;break;case 55:a+=`${t[e]}\u041F\u042F\u0422\u042C \u0414\u0415\u0421\u042F\u0422 \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"ES",letterSet:[["E","S","O","N","E","L","A","S","U","N","A"],["D","O","S","I","T","R","E","S","O","A","M"],["C","U","A","T","R","O","C","I","N","C","O"],["S","E","I","S","A","S","I","E","T","E","N"],["O","C","H","O","N","U","E","V","E","P","M"],["L","A","D","I","E","Z","S","O","N","C","E"],["D","O","C","E","L","Y","M","E","N","O","S"],["O","V","E","I","N","T","E","D","I","E","Z"],["V","E","I","N","T","I","C","I","N","C","O"],["M","E","D","I","A","C","U","A","R","T","O"]],timeString:function(e,s,i={round:!1}){var a="";e%=12;var t=["SON LAS DOCE ","ES LA UNA ","SON LAS DOS  ","SON LAS TRES ","SON LAS CUATRO ","SON LAS CINCO ","SON LAS SEIS ","SON LAS SIETE ","SON LAS OCHO ","SON LAS NUEVE ","SON LAS DIEZ ","SON LAS ONCE "];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=t[e];break;case 5:a+=`${t[e]}Y CINCO `;break;case 10:a+=`${t[e]}Y DIEZ `;break;case 15:a+=`${t[e]}Y CUARTO `;break;case 20:a+=`${t[e]}Y VEINTE `;break;case 25:a+=`${t[e]}Y VEINTICINCO `;break;case 30:a+=`${t[e]}Y MEDIA `;break;case 35:a+=`${t[e]}MENOS VEINTICINCO `;break;case 40:a+=`${t[e]}MENOS VEINTE `;break;case 45:a+=`${t[e]}MENOS CUARTO `;break;case 50:a+=`${t[e]}MENOS DIEZ `;break;case 55:a+=`${t[e]}MENOS DIEZ `;break}return a}});vis.binds.mytime.wordclock.addLanguage({langCode:"TR",letterSet:[["S","A","A","T","R","O","N","U","\xDC","\xC7","\xDC"],["B","\u0130","R","\u0130","A","L","T","I","Y","I","D"],["\u0130","K","\u0130","Y","\u0130","D","O","K","U","Z","U"],["D","\xD6","R","D","\xDC","Y","E","D","\u0130","Y","\u0130"],["S","E","K","I","Z","\u0130","Y","A","R","I","M"],["D","\xD6","R","T","A","M","S","B","E","\u015E","\u0130"],["K","P","M","O","T","U","Z","K","I","R","K"],["E","L","L","\u0130","O","N","Y","\u0130","R","M","\u0130"],["B","U","\xC7","U","K","\xC7","E","Y","R","E","K"],["B","E","\u015E","M","G","E","\xC7","\u0130","Y","O","R"]],timeString:function(e,s,i={round:!1}){var a="SAAT ";e%=12;var t=["ON \u0130K\u0130 ","B\u0130R ","\u0130K\u0130 ","\xDC\xC7 ","D\xD6RT ","BE\u015E ","ALTI ","YED\u0130 ","SEKIZ ","DOKUZ ","ON ","ON B\u0130R "],r=["ON \u0130K\u0130Y\u0130 ","B\u0130R\u0130 ","\u0130K\u0130Y\u0130 ","\xDC\xC7\xDC ","D\xD6RD\xDC ","BE\u015E\u0130 ","ALTIYI ","YED\u0130Y\u0130 ","SEKIZ\u0130 ","DOKUZU ","ONU ","ON B\u0130R\u0130 "];switch((i.round?Math.round(s/5)*5:Math.floor(s/5)*5)%60){case 0:a+=`${t[e]} `;break;case 5:a+=`${r[e]}BE\u015E GE\xC7\u0130YOR `;break;case 10:a+=`${r[e]}ON GE\xC7\u0130YOR `;break;case 15:a+=`${r[e]}ON BE\u015E GE\xC7\u0130YOR `;break;case 20:a+=`${r[e]}Y\u0130RM\u0130 GE\xC7\u0130YOR `;break;case 25:a+=`${r[e]}Y\u0130RM\u0130 BE\u015E GE\xC7\u0130YOR `;break;case 30:a+=`${t[e]}BU\xC7UK `;break;case 35:a+=`${r[e]}OTUZ  BE\u015E GE\xC7\u0130YOR `;break;case 40:a+=`${r[e]}KIRK GE\xC7\u0130YOR `;break;case 45:a+=`${r[e]}KIRK BE\u015E GE\xC7\u0130YOR `;break;case 50:a+=`${r[e]}ELL\u0130 GE\xC7\u0130YOR `;break;case 55:a+=`${r[e]}ELL\u0130 BE\u015E GE\xC7\u0130YOR `;break}return a}});})();
//# sourceMappingURL=mytime-dist.js.map
