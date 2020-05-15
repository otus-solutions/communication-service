const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');

const {
    MAILER_FROM,
    MAILER_SERVICE,
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
            return new Promise(async (resolve, reject) => {
                try {
                    let template;

                    let result = await communicationModel.findOne({ '_id': data._id });

                    if (result) {
                        const regExp = /{{.*?}}/ig;
                        const arrayVariablesTemplate = result.template.match(regExp);
                        const arrayVariables = Object.keys(data.variables)

                        if (arrayVariablesTemplate.length == arrayVariables.length) {
                            for (const [key, value] of Object.entries(data.variables)) {
                                const substitute = new RegExp("\{\{" + key + "\}\}", "g");
                                template = result.template.toString().replace(substitute, value.toString());
                                result.template = template;
                            }
                        } else {
                            return reject(Response.notAcceptable('Variável não foi encontrada.'));
                        }

                        let message = {
                            from: 'Plataforma Otus <' + MAILER_FROM + '>',
                            to: data.email ? data.email : "",
                            cc: data.cc ? data.cc : "",
                            subject: data.subject ? data.subject : "Plataforma Otus"
                        };

                        message.subject = result.subject ? result.subject : message.subject;
                        message.cc = result.cc ? result.cc : message.cc;
                        message.html = template ? template : result.template;
                        message.text = template ? template : result.template;

                        const transporter = getTransporter();

                        if (!message.to) {
                            reject(Response.notAcceptable('Campo de e-mail é obrigatório.'));
                        } else {
                            await transporter.sendMail(message, async (err, info) => {
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
                    } else {
                        reject(Response.notFound());
                    }
                } catch (err) {
                    reject(Response.internalServerError(err));
                }
            });
        }
    };
};

function getTransporter() {
    let secure = MAILER_SECURE == "true" ? true : false;

    if (MAILER_SERVICE != '') {
        return nodemailer.createTransport({
            service: MAILER_SERVICE,
            auth: {
                user: MAILER_AUTH_USER,
                pass: MAILER_AUTH_PASS
            }
        });
    } else {
        return nodemailer.createTransport({
            host: MAILER_HOST,
            port: MAILER_PORT,
            secure: secure,
            auth: {
                user: MAILER_AUTH_USER,
                pass: MAILER_AUTH_PASS
            }
        });
    }
}

