(function () {
    //stateful (but cacheable) service.
    //use self for stateful variables
    var self = this;
    const SHUTDOWN_TIMEOUT = 10000;

    self.subscriptions = {};

    let fireEvent = () => {
        console.log('Received kill signal, shutting down gracefully');

        let promises = Object.values(self.subscriptions).map(sub => {
            try {
                return sub();
            } catch (e) {
                console.error(e);
            }

        });

        Promise.all(promises)
            .then(() => {
                process.exit(0);
            })
            .catch((err) => {
                console.error("Error while shutting down", err);
                process.exit(1);
            });


        setTimeout(() => {
            console.error('Could not finish evey shutting down tasks, forcefully shutting down');
            process.exit(1);
        }, SHUTDOWN_TIMEOUT);
    };

    process.on('SIGTERM', fireEvent);
    process.on('SIGINT', fireEvent);

    module.exports = {
        subscribe: (register, callback) => {
            self.subscriptions[register] = callback;
        },
        fireEvent: fireEvent
    };
}());
