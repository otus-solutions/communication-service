let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const ProjectCommunicationController = application.app.controllers.ProjectCommunicationController;
    const BASE_URL = '/api/project-communication';

    application.post(BASE_URL + '/issues', jsonParser, async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.createIssue, req, res);
    });

    application.get(BASE_URL + '/issues/:id', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.getIssuesById, req, res);
    });

    application.get(BASE_URL + '/issues/sender/:id', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.getIssuesBySender, req, res);
    });

    application.get(BASE_URL + '/issues/group/:groupId', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.getIssuesByGroup, req, res);
    });

    application.post(BASE_URL + '/issues/filter', jsonParser, async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.filter, req, res)
    });

    application.put(BASE_URL + '/issues-reopen/:id', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.openIssue, req, res);
    });

    application.put(BASE_URL + '/issues-close/:id', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.closeIssue, req, res);
    });

    application.put(BASE_URL + '/issues-finalize/:id', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.finalizeIssue, req, res);
    });

    application.delete(BASE_URL + '/issues/:issueId', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.deleteIssue, req, res);
    });

    application.post(BASE_URL + '/messages/:issueId/', jsonParser, async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.createMessage, req, res);
    });

    application.get(BASE_URL + '/messages/:issueId', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.getMessageByIssueId, req, res);
    });

    application.get(BASE_URL + '/messages/limit/:issueId/:skip/:limit', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.getMessageByIdLimit, req, res);
    });

    application.put(BASE_URL + '/messages/:messageId', jsonParser, async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.editTextMessage, req, res);
    });

    application.delete(BASE_URL + '/messages/:messageId', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.deleteMessage, req, res);
    });

    application.get(BASE_URL + '/input', async function (req, res) {
        await _callControllerMethod(ProjectCommunicationController.mds, req, res);
    });
};

async function _callControllerMethod(func, req, res) {
    func(req, res)
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
}
