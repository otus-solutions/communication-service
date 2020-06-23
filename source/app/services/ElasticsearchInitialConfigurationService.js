const {Client} = require('@elastic/elasticsearch');
const ElasticsearchService = require('./ElasticsearchService');

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_INITIALIZE,
    ELASTICSEARCH_HOSTNAME
} = process.env;


/** @namespace application.app.services.ElasticsearchInitialConfigurationService **/
module.exports = function (application) {
    const ElasticsearchIndexes = application.app.services.ElasticsearchIndexes;

    if (ELASTICSEARCH_INITIALIZE === 'true') {
        ElasticsearchService().setState(false);
        setup()
            .then(result => {
                console.log('then')
                ElasticsearchService().setState(true);
            })
            .catch(err => {
                console.error("Elasticservice initialization error");
                ElasticsearchService().setState(false);
            });
    } else {
        ElasticsearchService().setState(true);
    }

    async function setup() {
        return new Promise((resolve, reject) => {
            let creations = [];

            ElasticsearchIndexes.forEach(config => {
                let creationPromise = createIndexWithMapping(config.indice, config.mapping);

                creations.push(creationPromise);

                creationPromise
                    .catch(err => {
                        console.error('Failed to create index - ' + config.indice + ' - ' + err.message);
                        return err;
                    });
            });

            return Promise.all(creations)
                .then(result => {
                    console.log('then')
                    resolve(result)
                })
                .catch(err => {
                    console.log('catch')
                    reject(err);
                });
        });

    }

    async function createIndexWithMapping(index, mapping) {
        let client = new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});

        return client.indices.create({
            index: index,
            body: mapping
        });

    }
};
