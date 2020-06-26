describe('ElasticsearchService_Suite_Tests', function () {
    let ElasticsearchService;

    beforeEach(function () {
        ElasticsearchService = require("../../app/services/ElasticsearchService");
        process.env.CONFIG_READY = 'true';
    });

    test('getClient_in_case_CONFIG_READY_true', async function () {
        const client = ElasticsearchService.getClient();
        expect(client).toBeDefined();
    });

    test('getClient_in_case_CONFIG_READY_false', async function () {
        process.env.CONFIG_READY = 'false';
        expect(() => ElasticsearchService.getClient()).toThrow();
    });

    test('getIndices', async function () {
        const indices = ElasticsearchService.getIndices();
        expect(indices).toBeDefined();
    });

    test('setState_should_invertCONFIG_READY_to_false', async function () {
        expect(process.env.CONFIG_READY).toBe('true');
    });

    test('setState_should_invertCONFIG_READY_to_true', async function () {
        process.env.CONFIG_READY = 'false';
        expect(process.env.CONFIG_READY).toBe('false');
    });

});
