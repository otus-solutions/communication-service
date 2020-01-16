let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const CommunicationController = application.app.controllers.CommunicationController;

    application.post('/api/communication', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.sendMail(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.post('/api/create-communication', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.create(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.post('/api/find-communication', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.get(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.get('/api/get-all-communication', async function (req, res) {
        try {
            let result = await CommunicationController.getAll();
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.put('/api/update-communication', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.update(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.delete('/api/delete-communication', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.delete(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });
};
