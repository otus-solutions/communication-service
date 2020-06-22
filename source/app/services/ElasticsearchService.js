const {Client} = require('@elastic/elasticsearch');

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;


/** @namespace application.app.services.ElasticsearchService **/

let configReady = true;

//todo: test if env var are present

module.exports = function (application) {

    return {
         getClient() {
            if(configReady){
                return new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});

            } else {
                throw new Error("Elasticservice initialization error");
            }
        },

        setState(state) {
            configReady = !!state;
            console.log(configReady, 'd')
        }
    }

};
