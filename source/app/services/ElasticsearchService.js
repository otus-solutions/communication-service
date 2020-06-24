const {Client} = require('@elastic/elasticsearch');
require('custom-env').env('staging');

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;


//todo: test if env var are present

/** @namespace application.app.services.ElasticsearchService **/
module.exports = {

    getClient: function() {
        let configReady = (process.env.CONFIG_READY === 'true');
        console.log('\nElasticService.getClient: configReady =', configReady)

        if(!configReady){
            throw new Error("ElasticService.getClient initialization error");
        }
        return new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});
    },

    setState: function(state) {
        console.log('\nElasticService.setState before: configReady =', process.env.CONFIG_READY)
        console.log('ElasticService.setState', state)
        process.env.CONFIG_READY = (!!state).toString();
        console.log('ElasticService.setState after : configReady =', process.env.CONFIG_READY)
    },

    print: function () {//.
        let configReady = (process.env.CONFIG_READY === 'true');
        console.log('configReady =', configReady);
    }

};
