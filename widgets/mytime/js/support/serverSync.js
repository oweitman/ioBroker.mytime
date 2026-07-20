/* global vis */

const serverSync = {
    calcServerTimeDiff: async function () {
        try {
            let serverTime = await this.sendToAsync('mytime.0', 'getServerTime');
            let now = new Date().getTime();
            this.serversync.serverTimeDiff = now - serverTime;
            this.serversync.retryDelay = 1000;

            // Erfolgreich? Dann erneut in 15 Sekunden aufrufen
            setTimeout(() => {
                this.calcServerTimeDiff();
            }, 15000);
        } catch (error) {
            console.log('Error retrieving server time:', error);
            const retryDelay = this.serversync.retryDelay || 1000;
            this.serversync.retryDelay = Math.min(retryDelay * 2, 60000);
            setTimeout(() => {
                this.calcServerTimeDiff();
            }, retryDelay);
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
