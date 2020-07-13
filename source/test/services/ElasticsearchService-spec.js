describe('ElasticsearchService_Suite_Tests', function () {
    let ElasticsearchService;

    beforeEach(function () {
        ElasticsearchService = require("../../app/services/ElasticsearchService");
        ElasticsearchService.setState(true);
    });

    test('getClient_in_case_state_true', async function () {
        const client = ElasticsearchService.getClient();
        expect(client).toBeDefined();
    });

    test('getClient_in_case_state_false', async function () {
        ElasticsearchService.setState(false);
        expect(() => ElasticsearchService.getClient()).toThrow();
    });

    test('getClient_in_case_client_already_exists', async function () {
        const client1 = ElasticsearchService.getClient();
        const client2 = ElasticsearchService.getClient();
        expect(client2).toBe(client1);
    });

    test('getIndices', async function () {
        const indices = ElasticsearchService.getIndicesAPI();
        expect(indices).toBeDefined();
    });

    test('getState', async function () {
        expect(ElasticsearchService.getState()).toBe(true);
    });

});
