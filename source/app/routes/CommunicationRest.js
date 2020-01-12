let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const CommunicationController = application.app.controllers.CommunicationController;

    application.post('/communication', jsonParser, async function (req, res) {
        await CommunicationController.sendMail(req.body)
            .then((data) => {
                let result = data;
                res.status(result.code).send(result.body);
            })
            .catch ((err) => {
                res.status(err.code).send(err.body)
            })
    });

    application.post('/api/create-communication', jsonParser, async function (req, res) {
        try {
            let formatJson = await CommunicationController.validation(req.body);
            let result = await CommunicationController.create(formatJson);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.post('/api/find-communication', jsonParser, async function (req, res) {
        try {
            let formatJson = await CommunicationController.validation(req.body);
            let result = await CommunicationController.get(formatJson);
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
            let formatJson = await CommunicationController.validation(req.body);
            let result = await CommunicationController.update(formatJson);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.delete('/api/delete-communication', jsonParser, async function (req, res) {
        try {
            let formatJson = await CommunicationController.validation(req.body);
            let result = await CommunicationController.delete(formatJson);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });
};
