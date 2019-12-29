/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const CommunicationService = application.app.services.CommunicationService;
  const MailService = application.app.services.MailService;

  return {
    async communication(data) {
      return CommunicationService.communication(data)
    },

    sendMail() {
      return MailService.sendMail()
    }
  };
};
