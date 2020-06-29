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
    app.services.IssueService = require("../../app/services/IssueService")({app});
    app.services.MessageService = require("../../app/services/MessageService")({app});

    beforeEach(function () {
        mock();
        ProjectCommunicationController = require("../../app/controllers/ProjectCommunicationController")({app});
    });

    test('createIssue', async function () {
        app.services.IssueService.createIssue = jest.fn(() => Promise.resolve({}));
        jest.spyOn(app.services.IssueService, "createIssue");
        await ProjectCommunicationController.createIssue(Mock.createIssueReq, Mock.response);
        expect(app.services.IssueService.createIssue).toBeCalledTimes(1);
    });

    test('createIssue handle error', function () {
        jest.spyOn(app.services.IssueService, "createIssue").mockRejectedValue(false);
        ProjectCommunicationController.createIssue(Mock.createIssueReq, Mock.response);
        expect(app.services.IssueService.createIssue).toBeCalledTimes(1);
    });


    function mock(){
        Mock.issue = data.issue;

        Mock.createIssueReq = {
            body: data.issue
        };
        Mock.promiseResolve = Promise.resolve({});
        Mock.promiseReject = Promise.reject({});
        Mock.response = {
            status: function(code){}
        };

        Mock.communication = {
            "name": "name",
            "template": "template"
        };
        Mock.data = {
            "email":"teste@gmail.com",
            "variables":{
                "name":"fulano"
            },
            "_id":"5e17cab5b613222e9d19a76e"
        };
    }
});
