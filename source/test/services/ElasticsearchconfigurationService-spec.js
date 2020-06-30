describe('ElasticsearchConfigurationService_Suite_Tests', function () {
    let ElasticsearchConfigurationService;

    const ElasticsearchIndexes = require("../../app/services/ElasticsearchIndexes")({
        app: {
            models: {
                IssueFactory: require("../../app/models/IssueFactory")(),
                MessageFactory: require("../../app/models/MessageFactory")(),
            }
        }
    });

    const app = {
        services: {
            ElasticsearchIndexes: ElasticsearchIndexes
        }
    };

    test('initialization_with_ELASTICSEARCH_INITIALIZE_true', async function () {
        process.env.ELASTICSEARCH_INITIALIZE = 'true';
        ElasticsearchConfigurationService = require("../../app/services/ElasticsearchInitialConfigurationService")({ app });
        expect(ElasticsearchConfigurationService).not.toBeDefined();
    });

    test('initialization_with_ELASTICSEARCH_INITIALIZE_false', async function () {
        process.env.ELASTICSEARCH_INITIALIZE = 'false';
        ElasticsearchConfigurationService = require("../../app/services/ElasticsearchInitialConfigurationService")({ app });
        expect(ElasticsearchConfigurationService).not.toBeDefined();
        process.env.ELASTICSEARCH_INITIALIZE = 'true';
    });

});
