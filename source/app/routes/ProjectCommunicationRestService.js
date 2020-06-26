let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const ProjectCommunication = application.app.controllers.ProjectCommunicationController;
    const BASE_URL = '/api/project-communication';

    //cria a issue
    application.post(BASE_URL + '/issues', jsonParser, async function (req, res) {
        ProjectCommunication.createIssue(req, res);
    });

    //busca issue pelo id da issue
    application.get(BASE_URL + '/issues/:id', async function (req, res) {
        ProjectCommunication.getIssuesById(req, res);
    });

    //busca issue pelo  id do sender
    application.get(BASE_URL + '/issues/sender/:id', async function (req, res) {
        ProjectCommunication.getIssuesBySender(req, res);
    });

    //busca issue pelo  id do group
    application.get(BASE_URL + '/issues/group/:groupId', async function (req, res) {
        ProjectCommunication.getIssuesByGroup(req, res);
    });

    //filtro poderoso de issues
    application.post(BASE_URL + '/issues/filter', jsonParser, async function (req, res) {
        ProjectCommunication.filter(req, res);
    });

    //update de status
    application.put(BASE_URL + '/issues-reopen/:id', async function (req, res) {
        ProjectCommunication.openIssue(req, res);
    });

    application.put(BASE_URL + '/issues-close/:id', async function (req, res) {
        ProjectCommunication.closeIssue(req, res);
    });

    application.put(BASE_URL + '/issues-finalize/:id', async function (req, res) {
        ProjectCommunication.finalizeIssue(req, res);
    });
    //--
    //-- delete issue
    application.delete(BASE_URL + '/issues/:issueId', async function (req, res) {
        ProjectCommunication.deleteIssue(req, res);
    });

    //cria message
    application.post(BASE_URL + '/messages/:issueId/', jsonParser, async function (req, res) {
        ProjectCommunication.createMessage(req, res);
    });

    // lista messages da issue
    application.get(BASE_URL + '/messages/:issueId', async function (req, res) {
        ProjectCommunication.getMessageByIssueId(req, res);
    });

    // lista messages com limit  TODO: pensar em como fazer
    application.get(BASE_URL + '/messages/limit/:issueId/:skip/:limit', async function (req, res) {
        ProjectCommunication.getMessageByIdLimit(req, res);
    });

    application.put(BASE_URL + '/messages/:messageId', jsonParser, async function (req, res) {
        ProjectCommunication.editTextMessage(req, res);
    });

    application.delete(BASE_URL + '/messages/:messageId', async function (req, res) {
        ProjectCommunication.deleteMessage(req, res);
    });
};
