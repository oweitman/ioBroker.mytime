/* global vis */

const serverSync = {
    calcServerTimeDiff: async function () {
        const sync = this.serversync;
        if (sync.running || sync.timer) {
            return;
        }

        sync.running = true;
        sync.stopped = false;
        let nextDelay = 15000;

        try {
            let serverTime = await this.sendToAsync('mytime.0', 'getServerTime');
            let now = new Date().getTime();
            sync.serverTimeDiff = now - serverTime;
            sync.retryDelay = 1000;
        } catch (error) {
            console.log('Error retrieving server time:', error);
            nextDelay = sync.retryDelay || 1000;
            sync.retryDelay = Math.min(nextDelay * 2, 60000);
        } finally {
            sync.running = false;
            if (!sync.stopped) {
                sync.timer = setTimeout(() => {
                    sync.timer = null;
                    this.calcServerTimeDiff();
                }, nextDelay);
            }
        }
    },
    stopServerTimeSync: function () {
        const sync = this.serversync;
        sync.stopped = true;
        if (sync.timer) {
            clearTimeout(sync.timer);
            sync.timer = null;
        }
    },
    sendToAsync: async function (instance, command, sendData) {
        // console.log(`sendToAsync ${command} ${sendData || 'no parameters'}`);
        return new Promise((resolve, reject) => {
            try {
                if (!vis.conn) {
                    reject('no vis.conn object');
                    return;
                }
                vis.conn.sendTo(instance, command, sendData, function (receiveData) {
                    resolve(receiveData);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default serverSync;
