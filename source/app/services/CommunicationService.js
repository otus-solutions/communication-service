const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');

/** @namespace application.app.services.CommunicationService **/
module.exports = function (application) {
  const Response = application.app.utils.Response;

  return {
    communication(data) {
        return new Promise(async function (resolve, reject) {
          try {
            let communication= await communicationModel.findOne({'_id': data.id});
            resolve(Response.success(communication))
          } catch (err) {
            console.log(err);
            reject(Response.internalServerError())
          }
        });
    }
  };
};

