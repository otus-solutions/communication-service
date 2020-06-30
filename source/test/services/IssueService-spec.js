describe('IssueService_Suite_Tests', function () {
    const data = require('../data/json-importer');
    const Response = require('../../app/utils/Response');
    const IssueFactory = require('../../app/models/IssueFactory')();
    const ElasticsearchService = require('../../app/services/ElasticsearchService');

    let IssueService;
    let Mock = {};

    const app = {
        utils: {
            Response: Response
        },
        models: {
            IssueFactory: IssueFactory
        }
    };

    beforeEach(function () {
        IssueService = require("../../app/services/IssueService")({app});
        _mockInitialize();
    });

    function _mockInitialize(){
        Mock.client = data.client;
        Mock.issueHit = data.issueHit;
        Mock.issue = data.issue;
        Mock.issueId = data.issueId;
        Mock.issuesSearchSettings = data.issuesSearchSettings;
        Mock.senderId = '1';

        Mock.expectedEmptyBody = {data : true};
        Mock.errorFunction = function() {throw 'ops'};
        Mock.expectedErrorBody = {data: 'ops'};
        Mock.returnHitArray = function(obj) {return {body: {hits: {hits: []}}}};
        Mock.expectedArrayBody = {data : []};
        Mock.expectedNotFoundBody = {data: {message: "Data not found"}};
    }

    function _setSuccessSpyOn(){
        jest.spyOn(app.utils.Response, 'success');
        jest.spyOn(ElasticsearchService, 'getClient').mockReturnValue(Mock.client);
    }

    function _setErrorSpyOn(responseMethod){
        jest.spyOn(app.utils.Response, responseMethod);
        jest.spyOn(ElasticsearchService, 'getClient').mockImplementation(Mock.errorFunction);
    }

    async function _runSuccessMethodTest(method, arg, expectBody){
        _setSuccessSpyOn();
        await method(arg)
            .then(res => {
                console.log(res)
                expect(res.body).toEqual(expectBody);
            });
        expect(app.utils.Response.success).toHaveBeenCalledTimes(1);
    }

    async function _runErrorMethodTest(method, arg, expectBody){
        _setErrorSpyOn('internalServerError');
        await method(arg)
            .catch(res => {
                expect(res.body).toEqual(expectBody);
            });
        expect(app.utils.Response.internalServerError).toHaveBeenCalledTimes(1);
    }

    async function _runNotFoundErrorMethodTest(method, arg){
        _setErrorSpyOn('notFound');
        await method(arg)
            .catch(res => {
                console.log(res)
                expect(res.body).toEqual(Mock.expectedNotFoundBody);
            });
        expect(app.utils.Response.notFound).toHaveBeenCalledTimes(1);
    }

    test('createIssue_success_case', async function () {
        await _runSuccessMethodTest(IssueService.createIssue, Mock.issue, Mock.expectedEmptyBody);
    });

    test('createIssue_error_case', async function () {
        await _runErrorMethodTest(IssueService.createIssue, Mock.issue, Mock.expectedErrorBody);
    });

    test('queryIssue_success_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runSuccessMethodTest(IssueService.queryIssue, Mock.issuesSearchSettings, Mock.expectedArrayBody);
    });

    test('queryIssue_empty_data_error_case', async function () {
        _setErrorSpyOn('notAcceptable');
        await IssueService.queryIssue({})
            .catch(res => {
                expect(res.body).toEqual({data: {message: "Value not acceptable"}});
            });
        expect(app.utils.Response.notAcceptable).toHaveBeenCalledTimes(1);
    });

    test('queryIssue_empty_filter_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        Mock.issuesSearchSettings.filter = {};
        await _runSuccessMethodTest(IssueService.queryIssue, Mock.issuesSearchSettings, Mock.expectedArrayBody);
    });

    test('queryIssue_error_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runErrorMethodTest(IssueService.queryIssue, Mock.issuesSearchSettings, Mock.expectedErrorBody);
    });

    test('listSenderIssues_success_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runSuccessMethodTest(IssueService.listSenderIssues, Mock.senderId, Mock.expectedArrayBody);
    });

    test('listSenderIssues_error_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runNotFoundErrorMethodTest(IssueService.listSenderIssues, Mock.senderId);
    });

    test('getIssuesByGroup_success_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runSuccessMethodTest(IssueService.getIssuesByGroup, Mock.senderId, Mock.expectedArrayBody);
    });

    test('getIssuesByGroup_error_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runNotFoundErrorMethodTest(IssueService.getIssuesByGroup, Mock.senderId);
    });

    test('getIssue_success_case', async function () {
        Mock.client.get = function(obj) {return {body: Mock.issueHit}};
        _setSuccessSpyOn();
        await IssueService.getIssue(Mock.issueId)
            .then(res => expect(res.body.data._id).toEqual(Mock.issueId));
        expect(app.utils.Response.success).toHaveBeenCalledTimes(1);
    });

    test('getIssue_error_case', async function () {
        await _runNotFoundErrorMethodTest(IssueService.getIssue, Mock.issueId);
    });

    test('updateIssueType_success_case', async function () {
        Mock.client.update = function(obj) {return {body: Mock.issueHit}};
        _setSuccessSpyOn();
        await IssueService.updateIssueType(Mock.issueId, 'CLOSED')
            .then(res => expect(res.body.data._id).toEqual(Mock.issueId));
        expect(app.utils.Response.success).toHaveBeenCalledTimes(1);
    });

    test('updateIssueType_error_case', async function () {
        await _runNotFoundErrorMethodTest(IssueService.updateIssueType, Mock.issueId);
    });

    test('existIssue_success_case', async function () {
        Mock.client.exists = function(obj) {return {body: Mock.issueHit}};
        _setSuccessSpyOn();
        await IssueService.existIssue(Mock.issueId, 'CLOSED')
            .then(res => expect(res._id).toEqual(Mock.issueId));
    });

    test('existIssue_not_found_case', async function () {
        Mock.client.exists = function(obj) {return {body: null}};
        jest.spyOn(app.utils.Response, 'notFound');
        await IssueService.existIssue(Mock.issueId, 'CLOSED')
            .catch(res => expect(res.body).toEqual(Mock.expectedNotFoundBody));
        expect(app.utils.Response.notFound).toHaveBeenCalledTimes(1);
    });

    test('existIssue_error_case', async function () {
        Mock.client.exists = function(obj) {return {body: Mock.issueHit}};
        _setErrorSpyOn('internalServerError');
        await IssueService.existIssue(Mock.issueId, 'CLOSED')
            .catch(res => expect(res.body).toEqual(Mock.expectedErrorBody));
        expect(app.utils.Response.internalServerError).toHaveBeenCalledTimes(1);
    });

    test('deleteIssue_success_case', async function () {
        Mock.client.delete = function(obj) {return {body: Mock.issueId}};
        await _runSuccessMethodTest(IssueService.deleteIssue, Mock.issueId, {data: Mock.issueId});
    });

    test('deleteIssue_error_case', async function () {
        Mock.client.delete = function(obj) {return {body: Mock.issueId}};
        await _runNotFoundErrorMethodTest(IssueService.deleteIssue, Mock.issueId);
    });

});
