const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const MailerService = application.app.services.MailerService;
  const CommunicationService = application.app.services.CommunicationService;
  const Response = application.app.utils.Response;

  const ElasticsearchService = application.app.services.ElasticsearchService;
  const IssueService = application.app.services.IssueService;

  return {
    async sendMail(data) {
      if(!ObjectId.isValid(data._id) || !data.variables) {
        return Response.notAcceptable();
      }
      return MailerService.sendMail(data);
    },

    async create(data) {
      if(!data.name || !data.template) {
        return Response.notAcceptable();
      }
      return CommunicationService.create(data);
    },

    async get(id) {
      if(!ObjectId.isValid(id)){
        return Response.notAcceptable();
      }
      return CommunicationService.get(id);
    },

    async getAll() {
      return CommunicationService.getAll()
    },

    async update(data) {
      if(!ObjectId.isValid(data._id) || !data.name || !data.template) {
        return Response.notAcceptable();
      }
      return CommunicationService.update(data);
    },

    async delete(id) {
      if(!ObjectId.isValid(id)){
        return Response.notAcceptable();
      }
      return CommunicationService.delete(id);
    }
  };
};
