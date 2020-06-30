(function () {
    //stateful (but cacheable) service.
    //use self for stateful variables
    const {Client} = require('@elastic/elasticsearch');
    const ShutdownEventService = require('../utils/ShutdownEventService');

    const {
        ELASTICSEARCH_PROTOCOL,
        ELASTICSEARCH_PORT,
        ELASTICSEARCH_HOSTNAME,
        ELASTICSEARCH_URL
    } = process.env;

    const CLIENT_URL = ELASTICSEARCH_PROTOCOL + '://' + ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT;

    var self = this;
    self.configReady = true;
    self.client = null;

    function _createClient() {
        try {
            self.client = new Client({node: CLIENT_URL});
            _subscribeClientClosing();
            return self.client;
        } catch (e) {
            self.configReady = false;
            throw "ElasticsearchService initialization error - Couldn't connect to URL " + CLIENT_URL;
        }
    }

    function _subscribeClientClosing() {
        ShutdownEventService.subscribe('ElasticsearchService', _closeClient)
    }

    function _closeClient() {
        if (self.client) {
            self.client.close();
            self.client = null;
        }
    }

    module.exports = {
        getClient() {
            if (!self.configReady) {
                throw "ElasticsearchService initialization error";
            }

            if (self.client) {
                return self.client;
            }
            
            return _createClient();
        },

        getIndicesAPI() {
            return _createClient().indices;
        },

        setState(state) {
            self.configReady = !!(state);
        },

        getState() {
            return self.configReady;
        }
    };
}());
