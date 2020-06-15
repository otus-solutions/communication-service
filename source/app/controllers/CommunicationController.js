const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/** @namespace application.app.controllers.CommunicationController**/
module.exports = function (application) {
  const MailerService = application.app.services.MailerService;
  const CommunicationService = application.app.services.CommunicationService;
  const Response = application.app.utils.Response;

  const ElasticsearchService = application.app.services.ElasticsearchService;


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
    },

    //===============================
    async createIssue(req, res) {
      console.log('controller')
      ElasticsearchService.createIssue(req.body)
        .then(result => {
            res.status(result.code).send(result.body);
          })
          .catch(err => {
            res.status(err.code).send(err.body)
          });
    },

    async createMessage(req, res) {
      ElasticsearchService.createMessage(req.body)
        .then(result => {
          res.status(result.code).send(result.body);
        })
        .catch(err => {
          res.status(err.code).send(err.body)
        });
    },

    async getIssuesBySender(req, res) {
      ElasticsearchService.listSenderIssues(req.params.id)
          .then(result => {
            res.status(result.code).send(result.body);
          })
          .catch(err => {
            res.status(err.code).send(err.body)
          });
      },

    async filter(req, res) { },

    async getIssuesById(req, res) {
      ElasticsearchService.getIssue(req.params.id)
          .then(result => {
            res.status(result.code).send(result.body);
          })
          .catch(err => {
            res.status(err.code).send(err.body)
          });
    },

    async getMessageById(req, res) { },

    async getMessageByIdLimit(req, res) { },

    async listIssue(req, res) { },  

    async updateReopen(req, res) { },

    async updateClose(req, res) { },

    async updateFinalize(req, res) { }
  };
};
