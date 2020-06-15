const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/** @namespace application.app.controllers.ProjectCommunicationController**/
module.exports = function (application) {
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const IssueService = application.app.services.IssueService;

    return {
        async createIssue(req, res) {
            console.log('controller')

            IssueService.createIssue(req.body)
                .then(result => {
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

        async filter(req, res) { },

        async getIssuesById(req, res) {
            ElasticsearchService.getIssue(req.params.id)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },


        async createMessage(req, res) {
            ElasticsearchService.createMessage(req.body)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async listIssue(req, res) { },

        async getMessageById(req, res) { },

        async getMessageByIdLimit(req, res) { },

        async updateReopen(req, res) {
            IssueService.updateIssueType(req.params.id, "OPEN")
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async updateClose(req, res) {
            IssueService.updateIssueType(req.params.id, "CLOSED")
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async updateFinalize(req, res) {
            IssueService.updateIssueType(req.params.id, "FINALIZED")
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        }
    };
};
