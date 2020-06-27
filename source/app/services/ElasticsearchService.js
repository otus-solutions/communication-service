(function () {
    //stateful (but cacheable) service.
    //use self for stateful variables
    const {Client} = require('@elastic/elasticsearch');

    const {
        ELASTICSEARCH_PROTOCOL,
        ELASTICSEARCH_PORT,
        ELASTICSEARCH_HOSTNAME,
        ELASTICSEARCH_URL
    } = process.env;

    const CLIENT_URL = ELASTICSEARCH_URL ? ELASTICSEARCH_URL : ELASTICSEARCH_PROTOCOL + '://' + ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT;


    var self = this;
    self.configReady = true;

    function _createClient() {
        try{
            return new Client({node: CLIENT_URL})
        } catch (e) {
            self.configReady = false;
            throw "ElasticsearchService initialization error - Couldn't connect to URL " + CLIENT_URL;
        }
    }

    module.exports = {
        getClient() {
            console.log(ELASTICSEARCH_PROTOCOL)
            if (!self.configReady) {
                throw "ElasticsearchService initialization error";
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
