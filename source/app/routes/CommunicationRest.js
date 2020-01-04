let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
  const CommunicationController = application.app.controllers.CommunicationController;

  application.post('/communication', jsonParser, async function (req, res) {
    try {
      let result = await CommunicationController.sendTemplate(req.body);
      res.status(result.code).send(result.body)
    } catch (err) {
      res.status(err.code).send(err.body)
    }
  });

  application.post('/mail', jsonParser, async function (req, res) {
    await CommunicationController.sendMail(req.body)
        .then((data) => {
          let result = data;
          res.status(result.code).send(result.body);
        })
        .catch ((err) => {
          res.status(err.code).send(err.body)
        })
  });
};
