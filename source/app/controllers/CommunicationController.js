/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const MailerService = application.app.services.MailerService;
  const Communication = application.app.services.CommunicationService;
  const ValidateService = application.app.services.ValidationService;

  return {
    async sendMail(data) {
      return MailerService.sendMail(data)
    },
    async validation(data) {
      return ValidateService.validation(data)
    },
    async create(data) {
      return Communication.create(data)
    },
    async get(data) {
      return Communication.get(data)
    },
    async getAll() {
      return Communication.getAll()
    },
    async update(data) {
      return Communication.update(data)
    },
    async delete(data) {
      return Communication.delete(data)
    }
  };
};
