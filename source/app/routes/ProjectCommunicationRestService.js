let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const ProjectCommunication = application.app.controllers.ProjectCommunicationController;
    const BASE_URL = '/api/project-communication';

    //cria a issue
    application.post(BASE_URL + '/issues', jsonParser, async function (req, res) {
        console.log('rest');
        ProjectCommunication.createIssue(req, res);
    });

    //cria a issue
    application.get(BASE_URL + '/issues/limit/:issueId/:skip/:limit', jsonParser, async function (req, res) {
        console.log("issue : " + req.params)
        ProjectCommunication.getMessageByIdLimit(req, res);
        //todo
    });

    //busca issue pelo id da issue
     application.get(BASE_URL + '/issues/:id', async function (req, res) {
        console.log("issue : " + req.params.id)
        ProjectCommunication.getIssuesById(req, res);
    });

    //busca issue pelo  id do sender
    application.get(BASE_URL + '/issues/sender/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.getIssuesBySender(req, res);
    });

    //busca issue pelo  id do sender
    application.get(BASE_URL + '/issues/group/:groupId', async function (req, res) {
        console.log(req.params.groupId);
        ProjectCommunication.getIssuesByGroup(req, res);
    });

    //filtro poderoso de issues
    application.post(BASE_URL + '/issues/filter', jsonParser, async function (req, res) {
        ProjectCommunication.filter(req, res);
    });

    //TODO list issues by center

    //update de status
    application.put(BASE_URL + '/issues-reopen/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.openIssue(req, res);
    });

    application.put(BASE_URL + '/issues-close/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.closeIssue(req, res);
    });

    application.put(BASE_URL + '/issues-finalize/:id', async function (req, res) {
        console.log(req.params.id);
        ProjectCommunication.finalizeIssue(req, res);
    });
    //--

    //cria message
    application.post(BASE_URL + '/messages/:issueId/', jsonParser, async function (req, res) {
        console.log("message : " + req.params.issueId)
        ProjectCommunication.createMessage(req, res);
    });

    // lista messages da issue
        application.get(BASE_URL + '/messages/:issueId/', async function (req, res) {
        console.log("list-message : " + req.params.issueId);
        ProjectCommunication.getMessageByIssueId(req, res);
    });

    // lista messages com limit  TODO: pensar em como fazer
    application.get(BASE_URL + '/messages/:issueId/:skip/:limit', async function (req, res) {
        console.log(req.params.id)
        ProjectCommunication.getMessageByIdLimite(req, res);
    });
};
