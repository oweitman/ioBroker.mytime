"use strict";

/*
 * Created with @iobroker/create-adapter v2.6.3
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

// Load your modules here, e.g.:
// const fs = require("fs");

const mytimerequire = require(__dirname +"/lib/mytimeserver.js");
let mytimeserver;
class Mytime extends utils.Adapter {

    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: "mytime",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        this.log.debug("main onReady start");

        // Initialize your adapter here
        if (!mytimeserver) {
            this.log.debug("main onReady open mytime");
            mytimeserver = new mytimerequire(this);
        }

        // in this template all states changes inside the adapters namespace are subscribed
        this.subscribeStates("*");
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            this.log.debug("main onUnload try");

            mytimeserver.closeConnections();
            this.log.info("cleaned everything up...");
            callback();
        } catch (e) {
            this.log.debug("main onUnload error");
            callback();
        }
    }

    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */
    onStateChange(id, state) {
        if (state) {
            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
            if (mytimeserver) mytimeserver.doStateChange(id,state);
        } else {
            // The state was deleted
            this.log.info(`state ${id} deleted`);
        }
    }

    /**
      * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
      * Using this method requires "common.message" property to be set to true in io-package.json
      * @param {ioBroker.Message} obj
      */
    onMessage(obj) {
        if (typeof obj === "object" && obj.message) {
            if (obj.command === "send") {
                // e.g. send email or pushover or whatever
                this.log.info("send command");
                // Send response in callback if required
                if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
            }
        }
        mytimeserver.processMessages(obj);
    }

}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new Mytime(options);
} else {
    // otherwise start the instance directly
    new Mytime();
}