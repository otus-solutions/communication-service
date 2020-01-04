const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');

/** @namespace application.app.services.CommunicationTemplateService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const TempletaService = application.app.services.TemplateService;
    const MailerService = application.app.services.MailerService;

    return {
        sendTemplate(data) {
            return new Promise(async function (resolve, reject) {
                try {
                    let template = TempletaService.updateTemplate(data);
                    let message = {};

                    await communicationModel.findOneAndUpdate({'templateId': data.templateId}, { 'name':data.variables.name, 'project': data.variables.project, 'template':template}, {useFindAndModify: false},function(err,obj) {
                        if (err) {
                            return reject(Response.internalServerError(err));
                        } else {
                            message.to = data.email;
                            message.subject = data.subject ? data.subject : "Atualização de dados";
                            message.html = template;
                            MailerService.sendMail(message);
                        }
                    });
                    resolve(Response.success())
                } catch (err) {
                    console.log(err);
                    reject(Response.internalServerError())
                }
            });
        }
    };
};

