/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const MailerService = application.app.services.MailerService;

  return {
    async sendMail(data) {
      return MailerService.sendMail(data)
    }
  };
};
