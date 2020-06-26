const {Client} = require('@elastic/elasticsearch');

const {
    PROTOCOL,
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;


//todo: test if env var are present

/** @namespace application.app.services.ElasticsearchService **/
module.exports = (function() {

    function _createClient(){
        return new Client({node: PROTOCOL + '://' + ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT})
    }

    return {
        getClient() {
            if (process.env.CONFIG_READY !== 'true') {
                throw "ElasticsearchService initialization error";
            }
            return _createClient();
        },

        getIndices(){
            return _createClient().indices;
        },

        setState(state) {
            process.env.CONFIG_READY = (!!state).toString();
        }
    }

})();
