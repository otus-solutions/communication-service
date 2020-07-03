/** @namespace application.app.controllers.ProjectCommunicationController**/
module.exports = function (application) {
    const IssueFactory = application.app.models.IssueFactory;
    const MessageFactory = application.app.models.MessageFactory;
    const IssueService = application.app.services.IssueService;
    const MessageService = application.app.services.MessageService;

    return {
        async createIssue(req, res) {
            let issue = IssueFactory.create(req.body);
            IssueService.createIssue(issue)
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
            let message = MessageFactory.create(req.body);

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
        },

        async mds(req, res) {
            let randomStarterIssueCreator = Math.floor(Math.random() * 10) * 14;
            let quantityToCreate = 200;

            let lastIssueCreatorIndex = randomStarterIssueCreator + quantityToCreate;

            console.log('criando ' + quantityToCreate + ' issues começando em ' + randomStarterIssueCreator);

            for (let i = randomStarterIssueCreator; i <= lastIssueCreatorIndex; i++) {
                let issue = IssueFactory.create({
                    "sender": "participant" + i,
                    "group": "rsId",
                    "title": "primeira issue. ",
                    "text": "Quando tento responder uma pergunta, não consigo inserir a resposta",
                    "creationDate": new Date().toISOString()
                });
                let result = await IssueService.createIssue(issue);

                let issueId = result.body.data;

                let randomMessageQuantity = Math.floor(Math.random() * 10);
                console.log('criando ' + randomMessageQuantity + ' mensagens para a issue ' + issueId);


                for (let m = 0; m <= randomMessageQuantity; m++) {
                    let message = MessageFactory.create({
                        "sender": "brenoId",
                        "text": "Aqui está a solução para o seu problema ",
                        "issueId": issueId,
                        "creationDate": new Date().toISOString()
                    });

                    let result = await MessageService.createMessage(message);
                    console.log(result);
                }
            }


            res.status(200).send()

        }
    };
};
