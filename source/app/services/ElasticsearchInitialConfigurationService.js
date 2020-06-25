const ElasticsearchService = require('./ElasticsearchService');

const {
    ELASTICSEARCH_INITIALIZE
} = process.env;


/** @namespace application.app.services.ElasticsearchInitialConfigurationService **/
module.exports = function (application) {
    const ElasticsearchIndexes = application.app.services.ElasticsearchIndexes;

    if (ELASTICSEARCH_INITIALIZE === 'true') {
        ElasticsearchService.setState(false);
        setup()
            .then(result => {
                ElasticsearchService.setState(true);
            })
            .catch(err => {
                console.error("Elasticservice initialization error");
                ElasticsearchService.setState(false);
            });
    } else {
        ElasticsearchService.setState(true);
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
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    async function createIndexWithMapping(index, mapping) {
        return ElasticsearchService.getIndices().create({
            index: index,
            body: mapping
        });
    }
};
