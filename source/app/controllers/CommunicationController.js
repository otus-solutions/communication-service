/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const CommunicationTemplateService = application.app.services.CommunicationTemplateService;
  const MailerService = application.app.services.MailerService;

  return {
    async sendTemplate(data) {
      return CommunicationTemplateService.sendTemplate(data)
    },
    async sendMail(data) {
      return MailerService.sendMail(data)
    }
  };
};
