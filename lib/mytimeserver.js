const { adapter } = require("@iobroker/adapter-core");
const { mytimeCountdown } = require("./mytimeCountdown");
const { mytimeTimeserie } = require("./mytimeTimeserie");
const { ioUtil } = require("./ioUtil");

class mytimeclassNew {
    constructor(adapter) {
        this.adapter = adapter;
        this.objCountdown = null;
        this.objTimeseries = null;
        this.ioUtil = new ioUtil(adapter);
    }
    init() {
        this.ioUtil.logdebug("mytime init");
        this.objCountdown = new mytimeCountdown(this.adapter);
        this.objTimeseries = new mytimeTimeserie(this.adapter);
        this.ioUtil.setState("connection", true, "info");
        this.objCountdown.init();
        this.objTimeseries.init();
    }
    doStateChange(id, state) {
        this.ioUtil.logsilly("doStateChange");
        this.objCountdown && this.objCountdown.doStateChange(id, state);
    }
    processMessages(msg) {
        this.ioUtil.logdebug("processMessages mytime");
        this.objCountdown && this.objCountdown.processMessages(msg);
    }
    closeConnections() {
        this.ioUtil.closeConnections()
    }
}

module.exports = mytimeclassNew;
