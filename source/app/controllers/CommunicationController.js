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

    async filter(req, res) { },

    async getIssuesById(req, res) { },

    async getMessageById(req, res) { },

    async getMessageByIdLimit(req, res) { },

    async listIssue(req, res) { },  
    
    async getIssuesByRn(req, res) { },

    async updateReopen(req, res) { 
      ElasticsearchService.updateIssueType(req.params.id, "OPEN")
        .then(result => {
          res.status(result.code).send(result.body);
        })
        .catch(err => {
          res.status(err.code).send(err.body)
        });
    },

    async updateClose(req, res) {
      ElasticsearchService.updateIssueType(req.params.id, "CLOSED")
        .then(result => {
          res.status(result.code).send(result.body);
        })
        .catch(err => {
          res.status(err.code).send(err.body)
        });
     },

    async updateFinalize(req, res) { 
      ElasticsearchService.updateIssueType(req.params.id, "FINALIZED")
        .then(result => {
          res.status(result.code).send(result.body);
        })
        .catch(err => {
          res.status(err.code).send(err.body)
        });
    }
  };
};
