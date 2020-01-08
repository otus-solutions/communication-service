const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');

const {
    MAILER_FROM,
    MAILER_HOST,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_AUTH_USER,
    MAILER_AUTH_PASS
} = process.env;

/** @namespace application.app.services.MailerService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        async sendMail(data) {

            let message = {};
            let template;

            message = {
                from: MAILER_FROM,
                to: data.email ? data.email : "",
                cc: data.cc ? data.cc : "",
                subject: data.subject ? data.subject : "",
                text: data.text ? data.text : "",
                html: template ? template : ""
            };

            await communicationModel.findOne({'_id': data.id}, async function (err, obj) {
                if (err) {
                    return Response.internalServerError(err);
                } else {
                    for (const [key, value] of Object.entries(data.variables)) {
                        const substitute = new RegExp("\{\{" + key + "\}\}", "g");
                        if (obj.template.indexOf(key)) {
                            template = obj.template.toString().replace(substitute, value.toString());
                            obj.template = template;
                        } else {
                            return Response.notAcceptable('Variável não foi encontrada.');
                        }
                    }
                    message.html = template;
                    return  message;
                }
            });

            let secure = MAILER_SECURE === "true" ? true : false;

            const transporter = nodemailer.createTransport({
                host: MAILER_HOST,
                port: MAILER_PORT,
                secure: secure,
                auth: {
                    user: MAILER_AUTH_USER,
                    pass: MAILER_AUTH_PASS
                }
            });

            return new Promise(async (resolve, reject) => {
                if (!message.to) {
                    reject(Response.notAcceptable('Campo de e-mail é obrigatório.'));
                } else {
                    transporter.sendMail(message, async (err, info) => {
                        if (err) {
                            transporter.close();
                            console.log(err);
                            reject(Response.internalServerError(err));
                        } else {
                            transporter.close();
                            console.log(info);
                            resolve(Response.success(info));
                        }
                    });
                }
            });
        }
    };
};

