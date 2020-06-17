const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/** @namespace application.app.controllers.ProjectCommunicationController**/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    const IssueService = application.app.services.IssueService;
    const MessageService = application.app.services.MessageService;

    const IssueFactory = application.app.models.IssueFactory;
    const MessageFactory = application.app.models.MessageFactory;

    return {
        async createIssue(req, res) {
            let issue = IssueFactory.create(req.body);
            IssueService.createIssue(issue)
                .then(result => {
                    //TODO check what to return. Id only?
                    console.log("post result");
                    console.log(issue);
                    console.log('====');
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async getIssuesBySender(req, res) {
            IssueService.listSenderIssues(req.params.id)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async getIssuesByGroup(req, res) {
            IssueService.getIssuesByGroup(req.params.groupId)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async filter(req, res) {
        },

        async getIssuesById(req, res) {
            IssueService.getIssue(req.params.id)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async listIssue(req, res) {
        },


        async openIssue(req, res) {
            IssueService.updateIssueType(req.params.id, "OPEN")
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async closeIssue(req, res) {
            IssueService.updateIssueType(req.params.id, "CLOSED")
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async finalizeIssue(req, res) {
            IssueService.updateIssueType(req.params.id, "FINALIZED")
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async createMessage(req, res) {
            let issueId = req.params.issueId;
            let message = MessageFactory.create(issueId, req.body);

            MessageService.createMessage(message)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async getMessageByIssueId(req, res) {
            MessageService.listIssueMessages(req.params.issueId)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async getMessageByIdLimit(req, res) {
        }
    };
};
