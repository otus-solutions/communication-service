let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
  const CommunicationController = application.app.controllers.CommunicationController;

  application.post('/communication', jsonParser, async function (req, res) {
    try {
      let result = await CommunicationController.communication(req.body);
      res.status(result.code).send(result.body)
    } catch (err) {
      res.status(err.code).send(err.body)
    }
  });

  application.post('/mail', function (req, res) {
    try {
      CommunicationController.sendMail();
      res.status(200).send('OK');
    } catch (err) {
      res.status(err.code).send(err.body)
    }
  });
};
