const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const MailerService = application.app.services.MailerService;
  const CommunicationService = application.app.services.CommunicationService;
  const Response = application.app.utils.Response;

  return {
    async sendMail(data) {
      if(ObjectId.isValid(data._id) && data.variables) {
        return MailerService.sendMail(data)
      } else {
        return Response.notAcceptable();
      }
    },
    async create(data) {
      if(data.name && data.template) {
        return CommunicationService.create(data)
      } else {
        return Response.notAcceptable();
      }
    },
    async get(id) {
      if(ObjectId.isValid(id)){
        return CommunicationService.get(id)
      } else {
        return Response.notAcceptable();
      }
    },
    async getAll() {
      return CommunicationService.getAll()
    },
    async update(data) {
      if(ObjectId.isValid(data._id)) {
        if (data.name && data.template) {
          return CommunicationService.update(data)
        } else {
          return Response.notAcceptable();
        }
      } else {
        return Response.notAcceptable();
      }
    },
    async delete(id) {
      if(ObjectId.isValid(id)){
        return CommunicationService.delete(id)
      } else {
        return Response.notAcceptable();
      }
    }
  };
};
