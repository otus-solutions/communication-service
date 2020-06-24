/** @namespace application.app.controllers.ProjectCommunicationController**/
module.exports = function (application) {
    const IssueFactory = application.app.models.IssueFactory;
    const MessageFactory = application.app.models.MessageFactory;
    const IssueService = application.app.services.IssueService;
    const MessageService = application.app.services.MessageService;
    const Response = application.app.utils.Response;


    return {
        async createIssue(req, res) {
            let issue = IssueFactory.create(req.body);
            IssueService.createIssue(issue)
                .then(result => {
                    //TODO check what to return. Id only?
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
            IssueService.queryIssue(req.body)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
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

        async deleteIssue(req, res) {
            let issueId = req.params.issueId;

            IssueService.deleteIssue(issueId)
                .then(() => {
                    MessageService.deleteMessagesByIssue(issueId)
                        .then(result => {
                            res.status(result.code).send(result.body);
                        })
                        .catch(err => {
                            res.status(err.code).send(err.body)
                        });
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async createMessage(req, res) {
            let issueId = req.params.issueId;
            let message = MessageFactory.create(issueId, req.body);

            IssueService.existIssue(issueId)
                .then(() => {
                    MessageService.createMessage(message)
                        .then(result => {
                            res.status(result.code).send(result.body);
                        })
                        .catch(err => {
                            res.status(err.code).send(err.body)
                        });
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async getMessageByIssueId(req, res) {
            //TODO validar se issueId existe
            let issueId = req.params.issueId;

            IssueService.existIssue(issueId)
                .then(() => {
                    MessageService.listIssueMessages(issueId)
                        .then(result => {
                            res.status(result.code).send(result.body);
                        })
                        .catch(err => {
                            res.status(err.code).send(err.body)
                        });
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async getMessageByIdLimit(req, res) {
            //TODO validar se issueId existe
            let issueId = req.params.issueId;

            IssueService.existIssue(issueId)
                .then(() => {
                    MessageService.getMessageByIdLimit(req.params)
                        .then(result => {
                            res.status(result.code).send(result.body);
                        })
                        .catch(err => {
                            res.status(err.code).send(err.body)
                        });
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async editTextMessage(req, res) {
            let messageId = req.params.messageId;
            let text = req.body.text;

            MessageService.editTextMessage(messageId, text)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        },

        async deleteMessage(req, res) {
            let messageId = req.params.messageId;

            MessageService.deleteMessage(messageId)
                .then(result => {
                    res.status(result.code).send(result.body);
                })
                .catch(err => {
                    res.status(err.code).send(err.body)
                });
        }
    };
};
