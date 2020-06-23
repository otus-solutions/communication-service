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
            if(!configReady){
                throw new Error("ElasticService.getClient initialization error");
            }
            return new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});
        },

        setState(state) {
            console.log('\nElasticService.setState before: configReady =', configReady)
            console.log('ElasticService.setState', state)
            configReady = !!state;
            console.log('ElasticService.setState after : configReady =', configReady)
        }
    }

};
