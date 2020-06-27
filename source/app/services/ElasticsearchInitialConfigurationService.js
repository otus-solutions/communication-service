const ElasticsearchService = require('./ElasticsearchService');

const {
    ELASTICSEARCH_INITIALIZE
} = process.env;

const RESOURCE_ALREADY_EXISTS_ERROR_MESSAGE = 'resource_already_exists_exception';


/** @namespace application.app.services.ElasticsearchInitialConfigurationService **/
module.exports = function (application) {
    const ElasticsearchIndexes = application.app.services.ElasticsearchIndexes;

    if (ELASTICSEARCH_INITIALIZE === 'true') {
        ElasticsearchService.setState(false);
        setup()
            .then(result => ElasticsearchService.setState(true))
            .catch(err => {
                const isAlreadyExistsError = (err.message === RESOURCE_ALREADY_EXISTS_ERROR_MESSAGE);
                ElasticsearchService.setState(isAlreadyExistsError);
                if(!isAlreadyExistsError){
                    console.error("Elasticservice initialization error");
                }
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
                        if(err.message === RESOURCE_ALREADY_EXISTS_ERROR_MESSAGE){
                            console.warn('WARNING: ' + config.indice + ' index already exists');
                        }
                        else{
                            console.error('Failed to create index - ' + config.indice + ' - ' + err.message);
                        }
                        return err;
                    });
            });

            return Promise.all(creations)
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    async function createIndexWithMapping(index, mapping) {
        return ElasticsearchService.getIndicesAPI().create({
            index: index,
            body: mapping
        });
    }
};
