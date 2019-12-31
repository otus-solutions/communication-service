/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const CommunicationService = application.app.services.CommunicationService;
  const MailerService = application.app.services.MailerService;

  return {
    async communication(data) {
      return CommunicationService.communication(data)
    },
    async sendMail(data) {
      return MailerService.sendMail(data)
    }
  };
};
