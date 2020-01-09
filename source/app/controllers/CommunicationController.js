/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const MailerService = application.app.services.MailerService;

  return {
    async sendMail(data) {
      return MailerService.sendMail(data)
    },
    async create(data) {
      //return MailerService.sendMail(data)
    },
    async get(data) {
      //return MailerService.sendMail(data)
    },
    async getAll(data) {
      //return MailerService.sendMail(data)
    },
    async update(data) {
      //return MailerService.sendMail(data)
    },
    async delete(data) {
      //return MailerService.sendMail(data)
    }
  };
};
