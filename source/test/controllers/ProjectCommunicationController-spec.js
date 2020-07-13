describe('ProjectCommunicationController.js Tests', function () {
    const data = require('../data/json-importer');

    let ProjectCommunicationController;
    let Mock = {};

    const ResponseService = require("../../app/utils/Response");
    const IssueFactory = require('../../app/models/IssueFactory')();
    const MessageFactory = require('../../app/models/MessageFactory')();
    const ElasticsearchService = require("../../app/services/ElasticsearchService");

    let app = {
        models: {
            IssueFactory: IssueFactory,
            MessageFactory: MessageFactory
        },
        services: {
            ElasticsearchService: ElasticsearchService
        },
        utils: {
            Response: ResponseService
        }
    };
    app.services.IssueService = require("../../app/services/IssueService")({ app });
    app.services.MessageService = require("../../app/services/MessageService")({ app });

    beforeEach(function () {
        mock();
        ProjectCommunicationController = require("../../app/controllers/ProjectCommunicationController")({ app });
    });

    test('createIssue', function () {
        jest.spyOn(app.services.IssueService, "createIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.createIssue(Mock.createIssueReq, Mock.response);
        expect(app.services.IssueService.createIssue).toBeCalledTimes(1);
    });

    test('createIssue handle error', function () {
        jest.spyOn(app.services.IssueService, "createIssue").mockRejectedValue(false);
        ProjectCommunicationController.createIssue(Mock.createIssueReq, Mock.response);
        expect(app.services.IssueService.createIssue).toBeCalledTimes(1);
    });

    test('listSenderIssues', function () {
        jest.spyOn(app.services.IssueService, "listSenderIssues").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.getIssuesBySender(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.listSenderIssues).toBeCalledTimes(1);
    });

    test('listSenderIssues handle error', function () {
        jest.spyOn(app.services.IssueService, "listSenderIssues").mockRejectedValue(false);
        ProjectCommunicationController.getIssuesBySender(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.listSenderIssues).toBeCalledTimes(1);
    });

    test('getIssuesByGroup', function () {
        jest.spyOn(app.services.IssueService, "getIssuesByGroup").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.getIssuesByGroup(Mock.getIssueGroupReq, Mock.response);
        expect(app.services.IssueService.getIssuesByGroup).toBeCalledTimes(1);
    });

    test('getIssuesByGroup handle error', function () {
        jest.spyOn(app.services.IssueService, "getIssuesByGroup").mockRejectedValue(false);
        ProjectCommunicationController.getIssuesByGroup(Mock.getIssueGroupReq, Mock.response);
        expect(app.services.IssueService.getIssuesByGroup).toBeCalledTimes(1);
    });

    test('filter', function () {
        jest.spyOn(app.services.IssueService, "queryIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.filter(Mock.postFilterReq, Mock.response);
        expect(app.services.IssueService.queryIssue).toBeCalledTimes(1);
    });

    test('filter handle error', function () {
        jest.spyOn(app.services.IssueService, "queryIssue").mockRejectedValue(false);
        ProjectCommunicationController.filter(Mock.postFilterReq, Mock.response);
        expect(app.services.IssueService.queryIssue).toBeCalledTimes(1);
    });

    test('getIssuesById', function () {
        jest.spyOn(app.services.IssueService, "getIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.getIssuesById(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.getIssue).toBeCalledTimes(1);
    });

    test('getIssuesById handle error', function () {
        jest.spyOn(app.services.IssueService, "getIssue").mockRejectedValue(false);
        ProjectCommunicationController.getIssuesById(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.getIssue).toBeCalledTimes(1);
    });

    test('openIssue', function () {
        jest.spyOn(app.services.IssueService, "updateIssueType").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.openIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.updateIssueType).toBeCalledTimes(1);
    });

    test('openIssue handle error', function () {
        jest.spyOn(app.services.IssueService, "updateIssueType").mockRejectedValue(false);
        ProjectCommunicationController.openIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.updateIssueType).toBeCalledTimes(1);
    });

    test('closeIssue', function () {
        jest.spyOn(app.services.IssueService, "updateIssueType").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.closeIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.updateIssueType).toBeCalledTimes(1);
    });

    test('closeIssue handle error', function () {
        jest.spyOn(app.services.IssueService, "updateIssueType").mockRejectedValue(false);
        ProjectCommunicationController.closeIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.updateIssueType).toBeCalledTimes(1);
    });

    test('finalizeIssue', function () {
        jest.spyOn(app.services.IssueService, "updateIssueType").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.finalizeIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.updateIssueType).toBeCalledTimes(1);
    });

    test('finalizeIssue handle error', function () {
        jest.spyOn(app.services.IssueService, "updateIssueType").mockRejectedValue(false);
        ProjectCommunicationController.finalizeIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.updateIssueType).toBeCalledTimes(1);
    });

    test('deleteIssue', function () {
        jest.spyOn(app.services.IssueService, "deleteIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        jest.spyOn(app.services.MessageService, "deleteMessagesByIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.deleteIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.deleteIssue).toBeCalledTimes(1);
    });

    test('deleteIssue handle error', function () {
        jest.spyOn(app.services.IssueService, "deleteIssue").mockRejectedValue(false);
        ProjectCommunicationController.deleteIssue(Mock.getIssueReq, Mock.response);
        expect(app.services.IssueService.deleteIssue).toBeCalledTimes(1);
    });

    test('createMessage', function () {
        jest.spyOn(app.services.IssueService, "existIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        jest.spyOn(app.services.MessageService, "createMessage").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.createMessage(Mock.createmessageReq, Mock.response);
        expect(app.services.IssueService.existIssue).toBeCalledTimes(1);
    });

    test('createMessage handle error', function () {
        jest.spyOn(app.services.IssueService, "existIssue").mockRejectedValue(false);
    
        ProjectCommunicationController.createMessage(Mock.createmessageReq, Mock.response);
        expect(app.services.IssueService.existIssue).toBeCalledTimes(1);
    });

    test('getMessageByIssueId', function () {
        jest.spyOn(app.services.IssueService, "existIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        jest.spyOn(app.services.MessageService, "listIssueMessages").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.getMessageByIssueId(Mock.createmessageReq, Mock.response);
        expect(app.services.IssueService.existIssue).toBeCalledTimes(1);
    });

    test('getMessageByIssueId handle error', function () {
        jest.spyOn(app.services.IssueService, "existIssue").mockRejectedValue(false);

        ProjectCommunicationController.getMessageByIssueId(Mock.createmessageReq, Mock.response);
        expect(app.services.IssueService.existIssue).toBeCalledTimes(1);
    });

    test('getMessageByIdLimit', function () {
        jest.spyOn(app.services.IssueService, "existIssue").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        jest.spyOn(app.services.MessageService, "getMessageByIdLimit").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.getMessageByIdLimit(Mock.createmessageReq, Mock.response);
        expect(app.services.IssueService.existIssue).toBeCalledTimes(1);
    });

    test('getMessageByIdLimit handle error', function () {
        jest.spyOn(app.services.IssueService, "existIssue").mockRejectedValue(false);

        ProjectCommunicationController.getMessageByIdLimit(Mock.createmessageReq, Mock.response);
        expect(app.services.IssueService.existIssue).toBeCalledTimes(1);
    });

    test('editTextMessage', function () {
        jest.spyOn(app.services.MessageService, "editTextMessage").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.editTextMessage(Mock.createmessageReq, Mock.response);
        expect(app.services.MessageService.editTextMessage).toBeCalledTimes(1);
    });

    test('editTextMessage handle error', function () {
        jest.spyOn(app.services.MessageService, "editTextMessage").mockRejectedValue(false);

        ProjectCommunicationController.editTextMessage(Mock.createmessageReq, Mock.response);
        expect(app.services.MessageService.editTextMessage).toBeCalledTimes(1);
    });

    test('deleteMessage', function () {
        jest.spyOn(app.services.MessageService, "deleteMessage").mockImplementation(() => {
            return Promise.resolve({ code: 200, body: {} })
        });
        ProjectCommunicationController.deleteMessage(Mock.createmessageReq, Mock.response);
        expect(app.services.MessageService.deleteMessage).toBeCalledTimes(1);
    });

    test('editTextMessage handle error', function () {
        jest.spyOn(app.services.MessageService, "deleteMessage").mockRejectedValue(false);

        ProjectCommunicationController.deleteMessage(Mock.createmessageReq, Mock.response);
        expect(app.services.MessageService.deleteMessage).toBeCalledTimes(1);
    });

    function mock() {
        Mock.issue = data.issue;

        Mock.createIssueReq = {
            body: data.issue
        };
        Mock.getIssueReq = {
            params: {
                id: data.issue.id
            }
        };
        Mock.getIssueGroupReq = {
            params: {
                groupId: data.issue.groupId
            }
        };
        Mock.postFilterReq = {
            body: data.filter
        };
        Mock.createmessageReq = {
            body: data.message,
            params: {
                issueId: data.message.issueId
            }
        };
        Mock.response = {
            status: function (code) { return { send: function (body) { } } }
        };
    }
});
