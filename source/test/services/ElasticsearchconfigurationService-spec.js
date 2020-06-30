describe('ElasticsearchConfigurationService_Suite_Tests', function () {
    const data = require('../data/json-importer');
    let ElasticsearchConfigurationService;
    let Mock;
    let ElasticsearchService = require("../../app/services/ElasticsearchService");
    let ElasticsearchIndexes = require("../../app/services/ElasticsearchIndexes")({
        app: {
            models: {
                IssueFactory: require("../../app/models/IssueFactory")(),
                MessageFactory: require("../../app/models/MessageFactory")(),
            }
        }
    });

    let app = {
        services: {
            ElasticsearchIndexes: ElasticsearchIndexes
        }
    }

    Mock.client = data.client;

    beforeEach(function () {       
        ElasticsearchConfigurationService = require("../../app/services/ElasticsearchInitialConfigurationService")({ app });
    });

    test('setup', async function () {
        console.log(ElasticsearchConfigurationService);        
    });

});
