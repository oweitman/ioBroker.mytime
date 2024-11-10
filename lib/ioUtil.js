function xyz() {
    return "xyz";
}
class ioUtil {
    constructor(adapter) {
        this.adapter = adapter
        this.islogsilly = true;
        this.islogdebug = true;
        this.observers = [];
        this.doClose = false;
    }
    createObjectChannelAsync(stateTemplate, level1path, level2path) {
        this.logdebug("createObject " + stateTemplate.name);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + stateTemplate.name;
        const newobj = {
            type: "channel",
            common: stateTemplate,
            native: {}
        };
        return this.adapter.setObjectAsync(name, newobj);
    }
    createObjectAsync(stateTemplate, level1path, level2path) {
        this.logdebug("createObject " + stateTemplate.name);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + stateTemplate.name;
        const newobj = {
            type: "state",
            common: stateTemplate,
            native: {}
        };
        return this.adapter.setObjectAsync(name, newobj);
    }
    //todo callback
    createObjectState(stateTemplate, level1path, level2path, callback) {
        this.logdebug("createObject " + stateTemplate.name);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + stateTemplate.name;
        this.adapter.getObject(name, (err, obj) => {
            const newobj = {
                type: "state",
                common: stateTemplate,
                native: {}
            };
            if (!obj) {
                (callback) ? this.adapter.setObject(name, newobj, callback) : this.adapter.setObject(name, newobj);
            } else {
                if (callback) callback();
            }
        });
    }
    deleteObjectAsync(id, level1path, level2path) {
        this.logdebug("deleteObject " + id);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + id;
        return this.adapter.delObject(name, { recursive: true });
    }
    //todo callback
    deleteObject(id, level1path, level2path, callback) {
        this.logdebug("deleteObject " + id);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + id;
        this.adapter.delObject(name, callback);
    }
    setStateAsync(name, value, level1path, level2path) {
        this.logdebug("setState " + name);
        name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + name;
        return this.adapter.setState(name, value, true); // jshint ignore:line
    }
    //todo callback
    setStateNack(name, value, level1path, level2path, callback) {
        this.logdebug("setState " + name + " " + JSON.stringify(value));
        name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + name;
        (callback) ? this.adapter.setState(name, value, false, callback) : this.adapter.setState(name, value, true);
    }
    async getObjects(path) {
        const key = this.adapter.namespace + "." + path;
        return this.convertObjects(await this.adapter.getObjectListAsync({ startkey: key, endkey: key + "\u9999" }));
    }
    convertObjects(objects) {
        return objects.rows.reduce((acc, obj) => { acc[obj.id] = obj; return acc; }, {})
    }
    async getStates(pattern, level1path, level2path) {
        this.logdebug(`getStates ${pattern} ${level1path} ${level2path}`);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + pattern;
        return await this.adapter.getStatesAsync(name);
    }
    //todo callback
    getState(id, level1path = false, level2path = false, callback) {
        this.logdebug("getState " + id);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + id;
        this.adapter.getState(name, callback);
    }
    //todo callback
    createState(stateTemplate, level1path = false, level2path = false, callback) {
        this.logdebug("createState " + stateTemplate.name);
        const name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + stateTemplate.name;
        this.logdebug("Create Key " + name);
        this.adapter.createState(level1path, level2path, stateTemplate.name, stateTemplate, callback);
    }
    //todo callback
    setState(name, value, level1path, level2path, callback) {
        this.logdebug(`setState ${name}: ${value}`);
        name = (level1path ? level1path + "." : "") + (level2path ? level2path + "." : "") + name;
        (callback) ? this.adapter.setState(name, value, true, callback) : this.adapter.setState(name, value, true); // jshint ignore:line
    }
    setTimeout(id, callback, time, arg1 = null, arg2 = null) {
        this.logsilly("setTimeout " + id);
        if (this.doClose) return;
        this.clearTimeout(id);
        this.observers[id] = setTimeout(callback.bind(this), time, arg1, arg2);
    }
    clearTimeout(id) {
        this.logsilly("clearTimeout " + id);
        if (this.observers[id]) clearTimeout(this.observers[id]);
        delete this.observers[id];
    }
    clearInterval(id) {
        this.logsilly("clearInterval " + id);
        if (this.observers[id]) clearInterval(this.observers[id]);
        delete this.observers[id];
    }
    deleteObservers() {
        this.logdebug("deleteObservers");
        Object.keys(this.observers).map(i => this.clearTimeout(i));
    }
    closeConnections() {
        this.logdebug("closeConnections");
        this.deleteObservers();
        this.doClose = true;
    }
    logsilly(s) {
        if (this.islogsilly) this.adapter.log.silly(s);
    }
    logdebug(s) {
        if (this.islogdebug) this.adapter.log.debug(s);
    }
    logerror(s) {
        // @ts-ignore
        this.adapter.log.error(s);
    };
    loginfo(s) {
        this.adapter.log.info(s);
    }

}
module.exports = {
    ioUtil
};