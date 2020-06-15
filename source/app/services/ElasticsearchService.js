const {Client} = require('@elastic/elasticsearch');

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;


/** @namespace application.app.services.ElasticsearchService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        getClient () {
            //TODO review port type string
            //TODO catch connection error
            return new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});
        }
    }

};
