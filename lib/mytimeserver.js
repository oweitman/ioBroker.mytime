const { mytimeCountdown } = require('./mytimeCountdown');
const { mytimeTimeserie } = require('./mytimeTimeserie');
const { ioUtil } = require('./ioUtil');

/**
 * mytime dispatcher class
 */
class mytimeclassNew {
    /**
     * Creates a new instance of mytimeclassNew.
     *
     * The constructor creates an instance of ioUtil and sets some default values.
     *
     * @param adapter - The ioBroker adapter instance.
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.objCountdown = null;
        this.objTimeseries = null;
        this.ioUtil = new ioUtil(adapter);
    }
    /**
     * Initialize the mytimeclassNew instance.
     *
     * This method is called by the adapter during startup. It creates
     * instances of mytimeCountdown and mytimeTimeserie and calls
     * their init methods.
     *
     */
    init() {
        this.ioUtil.logdebug('mytime init');
        this.objCountdown = new mytimeCountdown(this.adapter);
        this.objTimeseries = new mytimeTimeserie(this.adapter);
        this.ioUtil.setState('connection', true, 'info', null, null);
        this.objCountdown.init();
        this.objTimeseries.init();
    }
    /**
     * Calls the doStateChange method of mytimeCountdown if it exists.
     *
     * This method is called by the adapter whenever a state changes.
     *
     * @param id - The id of the changed state.
     * @param state - The changed state.
     */
    doStateChange(id, state) {
        this.ioUtil.logsilly('doStateChange');
        this.objCountdown && this.objCountdown.doStateChange(id, state);
    }
    /**
     * Processes incoming messages by delegating them to the mytimeCountdown instance.
     *
     * This method logs the message processing action and calls the processMessages
     * method of the mytimeCountdown instance if it exists.
     *
     * @param msg - The message object to be processed.
     */
    processMessages(msg) {
        this.ioUtil.logdebug('processMessages mytime');
        this.objCountdown && this.objCountdown.processMessages(msg);
    }
    /**
     * Close all connections.
     *
     * This method logs the action and calls the closeConnections
     * method of the ioUtil instance if it exists.
     */
    closeConnections() {
        this.ioUtil.closeConnections();
    }
}

module.exports = mytimeclassNew;
