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

    application.post('/create', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.create(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.get('/get', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.get(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.get('/getAll', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.getAll(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.put('/update', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.update(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.delete('/delete', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.delete(req.body);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });
};
