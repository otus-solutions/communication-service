let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const ProjectCommunication = application.app.controllers.ProjectCommunicationController;

    //cria a issue
    application.post('/api/issues', jsonParser, async function (req, res) {
        console.log('rest')
        ProjectCommunication.createIssue(req, res);
    });

    //busca issue pelo id da issue
     application.get('/api/issues/:id', async function (req, res) {
        console.log("issue : " + req.params.id)
        ProjectCommunication.getIssuesById(req, res);
    });

    //busca issue pelo  id do sender
    application.get('/api/issues/sender/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.getIssuesBySender(req, res);
    });

    //filtro poderoso de issues
    application.post('/api/issues/filter', jsonParser, async function (req, res) {
        ProjectCommunication.filter(req, res);
    });

    //TODO list issues by center

    //update de status
    application.put('/api/issues-reopen/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.openIssue(req, res);
    });

    application.put('/api/issues-close/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.closeIssue(req, res);
    });

    application.put('/api/issues-finalize/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.finalizeIssue(req, res);
    });
    //--

    //cria message
    application.post('/api/issues/:issueId/messages/', jsonParser, async function (req, res) {
        console.log("message : " + req.params.issueId)
        ProjectCommunication.createMessage(req, res);
    });

    // lista messages da issue
    application.get('/api/issues/:issueId/messages/', async function (req, res) {
        console.log("list-message : " + req.params.issueId);
        ProjectCommunication.getMessageByIssueId(req, res);
    });

    application.get('/api/issues-list/:id', async function (req, res) {
        console.log(req.params.id)
        ProjectCommunication.listIssue(req, res);
    });

    application.get('/api/list-messages-limit/:id/:limit', async function (req, res) {
        console.log(req.params.id)
        ProjectCommunication.getMessageByIdLimite(req, res);
    });
};
