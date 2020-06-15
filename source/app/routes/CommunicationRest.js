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

    application.get('/api/find-communication/:id', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.get(req.params.id);
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

    application.delete('/api/delete-communication/:id', jsonParser, async function (req, res) {
        try {
            let result = await CommunicationController.delete(req.params.id);
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });


    //=============================================
    //=============================================
    //=============================================
    application.post('/api/issues', jsonParser, async function (req, res) {
        console.log('rest')
        CommunicationController.createIssue(req, res);
    });

    application.get('/api/issues/:id', async function (req, res) {
        console.log("issue : " + req.params.id)
        CommunicationController.getIssuesById(req, res);
    });

    application.get('/api/issues/sender/:id', async function (req, res) {
        console.log(req.params.id);
        CommunicationController.getIssuesBySender(req, res);
    });

    application.post('/api/filter', jsonParser, async function (req, res) {
        CommunicationController.filter(req, res);
    });



    application.get('/api/issues-list/:id', async function (req, res) {
        console.log(req.params.id)
        CommunicationController.listIssue(req, res);
    });

    application.post('/api/messages/:id', jsonParser, async function (req, res) {
        console.log("message : " + req.params.id)
        CommunicationController.createMessage(req, res);
    });

    application.get('/api/list-messages/:id', async function (req, res) {
        console.log("list-message : " + req.params.id)
        CommunicationController.getMessageById(req, res);
    });

    application.get('/api/list-messages-limit/:id/:limit', async function (req, res) {
        console.log(req.params.id)
        CommunicationController.getMessageByIdLimite(req, res);
    });





    application.put('/api/issues-reopen/:id', async function (req, res) {
        console.log(req.params.id);
        CommunicationController.updateReopen(req, res);
    });

    application.put('/api/issues-close/:id', async function (req, res) {
        console.log(req.params.id);
        CommunicationController.updateClose(req, res); 
    });

    application.put('/api/issues-finalize/:id', async function (req, res) {
        console.log(req.params.id);
        CommunicationController.updateFinalize(req, res);   
    });   

};
