/*
todo

*/ 

function mytimeclass(adapter) {

    this.stateTemplate = {
        'config': {
            name:   'config',
            read:   true,
            write:  false,
            type:   'string',
            role:   'value'
        },
        'start': {
            name:   'start',
            read:   true,
            write:  true,
            type:   'number',
            role:   'value'
        },
        'end': {
            name:   'end',
            read:   true,
            write:  true,
            type:   'number',
            role:   'value'
        },
        'timer': {
            name:   'timer',
            read:   true,
            write:  true,
            type:   'number',
            role:   'value'
        },
        'action': {
            name:   'action',
            read:   true,
            write:  false,
            type:   'string',
            role:   'value'
        },
        'cmd': {
            name:   'cmd',
            read:   true,
            write:  true,
            type:   'string',
            role:   'state',
            def:    ' '
        },
        'name': {
            name:   'name',
            read:   true,
            write:  false,
            type:   'string',
            role:   'state',
            def:    ' '
        },
    };

    this.adapter = adapter;
    this.log = {};
    this.logsilly = true;
    this.logdebug = true;
    this.observers = [];
    this.CountdownPath = 'Countdown';    
	this.countdownInfo = null;

    this.init = function() {
        this.log.debug('init');               
        this.setState('connection', true, 'info');
		this.setCountdownInfo(this.adapter.config.counter || {});
		//this.countdownInfo = this.adapter.config.counter || {};
		//this.readCountdownInfo(this.doObserverServer.bind(this));
        this.doObserverServer();
    };
    this.doObserverServer = function() {
        this.log.silly('doObserverServer');
        this.checkCountdownStatus();
        this.setTimeout('doObserver',this.doObserverServer.bind(this),1000);
    };
    this.checkCountdownStatus = function() {
        this.getCountdownInfo({},function(data){
            for (keycd in data) {
                if (data[keycd].action=='run' && data[keycd].end <= new Date().getTime()) this.setStateNack('cmd','end',this.CountdownPath,keycd,data[keycd]);
            }
        }.bind(this));
    };
    this.doStateChange = function(id,state) {
        this.log.silly('doStateChange');
        // Warning, state can be null if it was deleted
        if (!id || !state || state.ack ) {
            return;
        }
        const idParts = id.split('.');
        idParts.shift();
        idParts.shift();
        if (idParts[0] == this.CountdownPath )    this.doCountdownStateChange(idParts,state);
        
    }        
    this.doCountdownStateChange = function(idParts,state) {
        this.log.debug('doCountdownStateChange ' + JSON.stringify([idParts,state]));
        idParts.shift();
        if (idParts[idParts.length-1] == 'cmd') {
            if (state.val.toString().trim() != '') this.doCmd(idParts,state);
        }
    };

    this.parseTime = function(time) {
        var d = new Date();
        var match = /(?<hrs>\d+)*:?(?<min>\d\d)?:?(?<sec>\d\d)?\s*(?<mer>pm|am)?/i.exec(time);
        d.setHours(
            parseInt((match.groups.hrs||0)) + 
            parseInt((match.groups.mer=='pm' ? 12:0))
        );
        d.setMinutes(
            parseInt((match.groups.min||0))
        );
        d.setSeconds(
            parseInt((match.groups.sec||0))
        );
        return d;
    };
    
    this.doCmd = function(idParts,state) {
        this.log.debug('doCmd ' + JSON.stringify([idParts,state]));
        var name = idParts.slice(0,-1).join('.');
        var value = state.val.toString();
        if ('+-\=#$'.indexOf(value[0]) >= 0) {
            var operator = value.trim()[0];
            var msnew = this.calcTime2Milíseconds(value.substr(1));
            this.getCounddownData(name,function(data){
                var msold = data.timer || 0;
                if (operator=='\=') data.timer = (msnew<0)?0:msnew;
                if (operator=='+') data.timer = msold + msnew;
                if (operator=='-') data.timer = (msold - msnew<0)?0:msold - msnew;
                if (operator=='#') {
                    var now =   (new Date()).getTime();
                    var fdate = Date.parse(value.substr(1));
                    if (!isNaN(fdate)) {
                        data.timer = (fdate-now > 0) ? fdate-now : 0;
                    }
                }
                if (operator=='$') {
                    var now =   (new Date()).getTime();
                    var d = this.parseTime(value.substr(1));
                    if (now >= d.getTime()) d.setDate(d.getDate() + 1);
                    data.timer = (d.getTime()-now > 0) ? d.getTime()-now : 0;
                }
				this.countdownInfo[name].timer=data.timer;
                this.setState('timer',data.timer,this.CountdownPath,name);
            }.bind(this));
            this.setState(idParts[1],' ',this.CountdownPath,idParts[0]);
        }
        var action='stop';
        if (value.toLowerCase() == 'start') {
            this.getCounddownData(name,function(data){
                var now = (new Date()).getTime();
                if (data.action == 'pause') {
                    var diff = data.end-data.start;
                    diff = (diff<0)?data.timer:diff;
					this.countdownInfo[name].start=now;
					this.countdownInfo[name].end=now+diff;
                    this.setState('start',now,this.CountdownPath,name);
                    this.setState('end',now+diff,this.CountdownPath,name);
                    action = 'run';
                }
                if (data.action == 'stop') {
					this.countdownInfo[name].start=now;
					this.countdownInfo[name].end=now+data.timer;
                    this.setState('start',now,this.CountdownPath,name);
                    this.setState('end',now+data.timer,this.CountdownPath,name);
                    action = 'run';
                }
                if (data.action == 'end') {
					this.countdownInfo[name].start=now;
					this.countdownInfo[name].end=now+data.timer;
                    this.setState('start',now,this.CountdownPath,name);
                    this.setState('end',now+data.timer,this.CountdownPath,name);
                    action = 'run';
                }
                if (data.action == 'run') {
					this.countdownInfo[name].start=now;
					this.countdownInfo[name].end=now+data.timer;
                    this.setState('start',now,this.CountdownPath,name);
                    this.setState('end',now+data.timer,this.CountdownPath,name);
                    action = 'run';
                }
				this.countdownInfo[name].action=action;
                this.setState('action',action,this.CountdownPath,name);
            }.bind(this));
        }
        if (value.toLowerCase() == 'pause') {
            this.getCounddownData(name,function(data){
                var now = (new Date()).getTime();
                if (data.action == 'run') {
					this.countdownInfo[name].start=now;
                    this.setState('start',now,this.CountdownPath,name);
                    action = 'pause';
                }
                if (data.action == 'pause') {
                    var diff = data.end-data.start;
                    diff = (diff<0)?data.timer:diff;
					this.countdownInfo[name].start=now;
					this.countdownInfo[name].end=now+diff;
                    this.setState('start',now,this.CountdownPath,name);
                    this.setState('end',now+diff,this.CountdownPath,name);
                    action = 'run';
                }
                if (data.action == 'stop') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
                }
                if (data.action == 'end') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
                }
				this.countdownInfo[name].action=action;
                this.setState('action',action,this.CountdownPath,name);
            }.bind(this));       
        }
        if (value.toLowerCase() == 'stop') {
            this.getCounddownData(name,function(data){
                var now = (new Date()).getTime();
                if (data.action == 'run') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
				}
                if (data.action == 'pause') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
                }
                if (data.action == 'stop') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
                }
                if (data.action == 'end') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
                }
				this.countdownInfo[name].action=action;
                this.setState('action',action,this.CountdownPath,name);
            }.bind(this));
        }
        if (value.toLowerCase() == 'end') {
            this.getCounddownData(name,function(data){
                var now = (new Date()).getTime();
                if (data.action == 'run') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'end';
                }
                if (data.action == 'pause') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'end';
                }
                if (data.action == 'stop') {
					this.countdownInfo[name].start=0;
					this.countdownInfo[name].end=0;
                    this.setState('start',0,this.CountdownPath,name);
                    this.setState('end',0,this.CountdownPath,name);
                    action = 'stop';
                }
                if (data.action == 'end') {
                    action = 'end';
                }
				this.countdownInfo[name].action=action;
                this.setState('action',action,this.CountdownPath,name);
            }.bind(this));
        }
        if (value.toLowerCase() == 'setstop2timer') {
            this.getCounddownData(name,function(data){
                data.config.stopbehaviour='timer';
				this.countdownInfo[name].config.stopbehaviour='timer';
                this.setState('config',JSON.stringify(data.config),this.CountdownPath,name);
            }.bind(this));
        }
        if (value.toLowerCase() == 'setstop2zero') {
            this.getCounddownData(name,function(data){
                data.config.stopbehaviour='zero';
				this.countdownInfo[name].config.stopbehaviour='zero';
                this.setState('config',JSON.stringify(data.config),this.CountdownPath,name);
            }.bind(this));
        }

        this.setState('cmd',' ',this.CountdownPath,name);
    }
    this.getCounddownData = function(timerid,callback) {
        this.log.debug('getCounddownData ' + timerid);
        this.getStates('*',this.CountdownPath,timerid,function(timerid,err, state){
            var data = {};
            data.start   = state[this.adapter.namespace+'.'+this.CountdownPath+'.'+timerid+'.start'].val  || 0;
            data.end     = state[this.adapter.namespace+'.'+this.CountdownPath+'.'+timerid+'.end'].val    || 0;
            data.action  = state[this.adapter.namespace+'.'+this.CountdownPath+'.'+timerid+'.action'].val || 'stop';
            data.timer   = state[this.adapter.namespace+'.'+this.CountdownPath+'.'+timerid+'.timer'].val  || 0;
            data.config  = JSON.parse(state[this.adapter.namespace+'.'+this.CountdownPath+'.'+timerid+'.config'].val);
            callback(data);
        }.bind(this,timerid));
    }
    this.calcTime2Milíseconds = function(timestr) {
        var aTime = timestr.split(':');
        var ms=0;
        if (aTime.length>0) ms+=aTime.pop()*1000;             //sec
        if (aTime.length>0) ms+=aTime.pop()*60*1000;          //min
        if (aTime.length>0) ms+=aTime.pop()*60*60*1000;       //hr
        if (aTime.length>0) ms+=aTime.pop()*24*60*60*1000;    //days
        return ms;
    }

    this.processMessages = function(msg) {
        this.log.debug('processMessages' + JSON.stringify(msg));
        if (msg.command === 'getCountdownInfo') {
            this.log.debug('send getCountdownInfo');
            this.getCountdownInfo(msg);
        }
        if (msg.command === 'setCountdownInfo') {
            this.log.debug('send setCountdownInfo');
            this.setCountdownInfo(msg);
        }
    }
    this.getCountdownInfo = function(msg,callback=null) {
        this.log.silly('getCountdownInfo ' + JSON.stringify(msg));
		if (msg.callback) this.adapter.sendTo(msg.from, msg.command, this.countdownInfo, msg.callback);
		if (callback) callback(JSON.parse(JSON.stringify(this.countdownInfo)));
    }

	this.readCountdownInfo = function(callback) {
        this.log.silly('readCountdownInfo ');
        this.adapter.getStates(this.adapter.namespace+'.*', (err, res) => {
            var data = {};
            for (let key in res) {
                var parts = key.split('.');
                if (parts[2]!='Countdown') continue;
                var name = parts.slice(3,-1).join('.');
                if (!data.hasOwnProperty(name)) {
                    data[name]={};
                    data[name].name = name;
                }                
                data[name][parts[parts.length-1]]= res[key].val;
            }
			this.countdownInfo = data;
			if (callback) callback(data);
        });
	}
    this.setCountdownInfo = function(msgnew) {
        this.log.debug('setCountdownInfo ' + JSON.stringify(msgnew));
		this.readCountdownInfo(function(msgold){
			if (Object.keys(msgnew).length==0 && Object.keys(msgold).length>0) {
				this.doMigration(msgold);
				msgnew=msgold;
			}
            for (keycd in msgnew) {
                for (keyprop in msgnew[keycd]) {
                    if (this.stateTemplate[keyprop]) {
                        var stateTemplate = JSON.parse(JSON.stringify(this.stateTemplate[keyprop]));                   
                        this.createObject(stateTemplate,this.CountdownPath,keycd,function(name,value,path){
							if (!this.countdownInfo[path]) this.countdownInfo[path]={};
							this.countdownInfo[path][name]=value;
                            this.setState(name,value,this.CountdownPath,path);                                
                        }.bind(this,stateTemplate.name,msgnew[keycd][keyprop],keycd));
                        if (msgold[keycd]) msgold[keycd].exist = true;
                    }
                }
            }
            for (keycd in msgold) {
                for (keyprop in msgold[keycd]) {                
                    if (!msgold[keycd].exist || false) {
						delete this.countdownInfo[keycd][keyprop];
                        this.deleteObject(keyprop,this.CountdownPath,keycd);
                    }
                }
            }
            if (msgnew.callback) this.adapter.sendTo(msgnew.from, msgnew.command, 'ok', msgnew.callback);
        }.bind(this));
    }
    this.doMigration = function(newConfiguration) {
		this.log.info('Migration in progress. Adapter restart is neccesary!');               
		this.saveConfiguration(newConfiguration);
	}
	this.saveConfiguration = function(newConfiguration) {
		
		var saveConfiguration = {counter:newConfiguration};
		var instanceId = ["system.adapter",this.adapter.name,this.adapter.instance].join(".");
		var xx = this.adapter.getObject("system.adapter.mytime");
		var that=this;
        this.adapter.getForeignObject(instanceId, function(err,_oldObj) {
			oldObj = _oldObj || {};

			for (const a in saveConfiguration) {
				if (saveConfiguration.hasOwnProperty(a)) {
					oldObj.native[a] = saveConfiguration[a];
				}
			}

			that.adapter.setForeignObject(instanceId, oldObj);
			
		});
	}
    this.createState = function(stateTemplate,level1path=false,level2path=false,callback) {       
        this.log.debug('createState ' + stateTemplate.name);
        const name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + stateTemplate.name;
        this.log.debug('Create Key ' + name);
        this.adapter.createState(level1path,level2path,stateTemplate.name,stateTemplate,callback);
    };
    this.setState = function(name, value,level1path=false,level2path=false,callback=false) {
        this.log.debug('setState ' + name + ' ' + JSON.stringify(value));
        name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + name;
        (callback) ? this.adapter.setState(name, value, true, callback) : this.adapter.setState(name, value, true);
    };
    this.setStateNack = function(name, value,level1path=false,level2path=false,callback=false) {
        this.log.debug('setState ' + name + ' ' + JSON.stringify(value));
        name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + name;
        (callback) ? this.adapter.setState(name, value, false, callback) : this.adapter.setState(name, value, true);
    };
    this.getStates = function(pattern, level1path=false,level2path=false,callback) {
        this.log.debug('getStates ' + pattern);
        const name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + pattern;
        this.adapter.getStates(name, callback);
    };    
    this.getState = function(id, level1path=false,level2path=false,callback) {
        this.log.debug('getState ' + id);
        const name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + id;
        this.adapter.getState(name, callback);
    };
    this.deleteObject = function(id, level1path=false,level2path=false,callback) {
        this.log.debug('deleteObject ' + id);
        const name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + id;
        this.adapter.delObject(name, callback);
    };
    this.createObject = function(stateTemplate,level1path=false,level2path=false,callback=false) {
        this.log.debug('createObject ' + stateTemplate.name);
        const name = (level1path ? level1path + '.' : '') + (level2path ? level2path + '.' : '') + stateTemplate.name;
        this.adapter.getObject(name, (err, obj) => {
            var newobj = {
                    type: 'state',
                    common: stateTemplate,
                    native: {}
                };            
            if (!obj) {
                (callback) ? this.adapter.setObject(name,newobj,callback) : this.adapter.setObject(name,newobj);
            } else {
                if (callback) callback();
            }
        }); 
    } 
    this.setTimeout = function(id,callback,time) {
        this.log.silly('setTimeout ' + id);
        this.clearTimeout(id);
        this.observers[id]= setTimeout(callback.bind(this),time);
    };
    this.setInterval = function(id,callback,time) {
        this.log.debug('setInterval ' + id);
        this.clearInterval(id);
        this.observers[id]= setInterval(callback.bind(this),time);
    };
    this.clearInterval = function(id) {
        this.log.silly('clearInterval ' + id);
        if (this.observers[id]) clearInterval(this.observers[id]);
        delete this.observers[id];
    };
    this.clearTimeout = function(id) {
        this.log.silly('clearTimeout ' + id);
        if (this.observers[id]) clearTimeout(this.observers[id]);
        delete this.observers[id];
    };
    this.deleteObservers = function() {
        this.log.debug('deleteObservers');        
        this.clearTimeout('doObserver');
    };
    this.closeConnections = function() {
        this.log.debug('closeConnections');        
        this.deleteObservers();
    }
    this.log.silly = function(s) {
        if (this.logsilly) this.adapter.log.silly(s);
    }.bind(this);
    this.log.debug = function(s) {
        if (this.logdebug) this.adapter.log.debug(s);
    }.bind(this);
    this.log.error = function(s) {
        this.adapter.log.error(s);
    }.bind(this);
    this.log.info = function(s) {
        this.adapter.log.info(s);
    }.bind(this);
    
    this.init.bind(this)();

}
module.exports = mytimeclass;