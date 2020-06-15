let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const ProjectCommunication = application.app.controllers.ProjectCommunicationController;

    application.post('/api/issues', jsonParser, async function (req, res) {
        console.log('rest')
        ProjectCommunication.createIssue(req, res);
    });

    application.get('/api/issues/:id', async function (req, res) {
        console.log("issue : " + req.params.id)
        ProjectCommunication.getIssuesById(req, res);
    });

    application.get('/api/issues/sender/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.getIssuesBySender(req, res);
    });

    application.post('/api/filter', jsonParser, async function (req, res) {
        ProjectCommunication.filter(req, res);
    });



    application.get('/api/issues-list/:id', async function (req, res) {
        console.log(req.params.id)
        ProjectCommunication.listIssue(req, res);
    });

    application.post('/api/messages/:id', jsonParser, async function (req, res) {
        console.log("message : " + req.params.id)
        ProjectCommunication.createMessage(req, res);
    });

    application.get('/api/list-messages/:id', async function (req, res) {
        console.log("list-message : " + req.params.id)
        ProjectCommunication.getMessageById(req, res);
    });

    application.get('/api/list-messages-limit/:id/:limit', async function (req, res) {
        console.log(req.params.id)
        ProjectCommunication.getMessageByIdLimite(req, res);
    });





    application.put('/api/issues-reopen/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.updateReopen(req, res);
    });

    application.put('/api/issues-close/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.updateClose(req, res);
    });

    application.put('/api/issues-finalize/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.updateFinalize(req, res);
    });
}
