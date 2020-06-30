describe('MessageService_Suite_Tests', function () {
    const data = require('../data/json-importer');
    const Response = require('../../app/utils/Response');
    const MessageFactory = require('../../app/models/MessageFactory')();
    const ElasticsearchService = require('../../app/services/ElasticsearchService');

    let MessageService;
    let Mock = {};

    const app = {
        utils: {
            Response: Response
        },
        models: {
            MessageFactory: MessageFactory
        }
    };

    beforeEach(function () {
        MessageService = require("../../app/services/MessageService")({app});
        _mockInitialize();
    });

    function _mockInitialize(){
        Mock.client = data.client;
        Mock.issueId = data.issueId;
        Mock.message = data.message;
        Mock.messageId = data.messageId;
        Mock.messageHit = data.messageHit;

        Mock.expectedEmptyBody = {data : true};
        Mock.errorFunction = function() {throw 'ops'};
        Mock.expectedErrorBody = {data: 'ops'};
        Mock.returnEmptyHitArray = function(obj) {return {body: {hits: {hits: []}}}};
        Mock.returnHitArray = function(obj) {return {body: {hits: {hits: [data.messageHit]}}}};
        Mock.expectedEmptyArrayBody = {data : []};
        Mock.expectedArrayBody = {data : [data.message]};//todo
        Mock.expectedNotFoundBody = {data: {message: "Data not found"}};

        Mock.params = {
            issueId: Mock.issueId,
            limit: 10,
            skip: 0
        };
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
                console.log(res)
                expect(res.body).toEqual(expectBody);
            });
        expect(app.utils.Response.internalServerError).toHaveBeenCalledTimes(1);
    }

    async function _runNotFoundErrorMethodTest(method, arg, mockClientError=false){
        jest.spyOn(app.utils.Response, 'notFound');
        if(mockClientError){
            jest.spyOn(ElasticsearchService, 'getClient').mockImplementation(Mock.errorFunction);
        }
        await method(arg)
            .catch(res => {
                console.log(res)
                expect(res.body).toEqual(Mock.expectedNotFoundBody);
            });
        expect(app.utils.Response.notFound).toHaveBeenCalledTimes(1);
    }

    test('createMessage_success_case', async function () {
        await _runSuccessMethodTest(MessageService.createMessage, Mock.message, Mock.expectedEmptyBody);
    });

    test('createMessage_error_case', async function () {
        await _runErrorMethodTest(MessageService.createMessage, Mock.message, Mock.expectedErrorBody);
    });


    test('listIssueMessages_success_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        _setSuccessSpyOn();
        await MessageService.listIssueMessages(Mock.issueId)
            .then(res => {
                expect(res.body.data[0]._id).toEqual(Mock.messageId);
            });
        expect(app.utils.Response.success).toHaveBeenCalledTimes(1);
    });

    test('listIssueMessages_not_found_case', async function () {
        Mock.client.search = Mock.returnEmptyHitArray;
        jest.spyOn(ElasticsearchService, 'getClient').mockReturnValue(Mock.client);
        await _runNotFoundErrorMethodTest(MessageService.listIssueMessages, Mock.issueId);
    });

    test('listIssueMessages_error_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runNotFoundErrorMethodTest(MessageService.listIssueMessages, Mock.issueId, true);
    });


    test('getMessageByIdLimit_success_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        _setSuccessSpyOn();
        await MessageService.getMessageByIdLimit(Mock.params)
            .then(res => {
                console.log(res)
                expect(res.body.data[0]._id).toEqual(Mock.messageId);
            });
        expect(app.utils.Response.success).toHaveBeenCalledTimes(1);
    });

    test('getMessageByIdLimit_not_found_case', async function () {
        Mock.client.search = Mock.returnEmptyHitArray;
        jest.spyOn(ElasticsearchService, 'getClient').mockReturnValue(Mock.client);
        await _runNotFoundErrorMethodTest(MessageService.getMessageByIdLimit, Mock.params);
    });

    test('getMessageByIdLimit_error_case', async function () {
        Mock.client.search = Mock.returnHitArray;
        await _runErrorMethodTest(MessageService.getMessageByIdLimit, Mock.params, Mock.expectedErrorBody);
    });


    test('editTextMessage_success_case', async function () {
        Mock.client.update = function(obj) {return {body: Mock.messageHit}};
        _setSuccessSpyOn();
        await MessageService.editTextMessage(Mock.messageId, 'text')
            .then(res => expect(res.body.data._id).toEqual(Mock.messageId));
        expect(app.utils.Response.success).toHaveBeenCalledTimes(1);
    });

    test('editTextMessage_error_case', async function () {
        _setErrorSpyOn('notFound');
        await MessageService.editTextMessage(Mock.messageId, 'text')
            .catch(res => {
                console.log(res)
                expect(res.body).toEqual(Mock.expectedNotFoundBody);
            });
        expect(app.utils.Response.notFound).toHaveBeenCalledTimes(1);
    });


    test('deleteMessage_success_case', async function () {
        Mock.client.delete = function(obj) {return {body: Mock.messageId}};
        await _runSuccessMethodTest(MessageService.deleteMessage, Mock.messageId, {data: Mock.messageId});
    });

    test('deleteMessage_error_case', async function () {
        Mock.client.delete = function(obj) {return {body: Mock.messageId}};
        await _runNotFoundErrorMethodTest(MessageService.deleteMessage, Mock.messageId, true);
    });


    test('deleteMessagesByIssue_success_case', async function () {
        Mock.client.deleteByQuery = function(obj) {return {body: Mock.issueId}};
        await _runSuccessMethodTest(MessageService.deleteMessagesByIssue, Mock.issueId, {data: Mock.issueId});
    });

    test('deleteMessagesByIssue_error_case', async function () {
        Mock.client.deleteByQuery = function(obj) {return {body: Mock.issueId}};
        await _runErrorMethodTest(MessageService.deleteMessagesByIssue, Mock.issueId, Mock.expectedErrorBody);
    });

});
