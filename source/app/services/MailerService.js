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
                let message = {};
                let template;

                message = {
                    from: 'Plataforma Otus <' + MAILER_FROM + '>',
                    to: data.email ? data.email : "",
                    cc: data.cc ? data.cc : "",
                    subject: data.subject ? data.subject : "Plataforma Otus",
                    text: data.text ? data.text : "",
                    html: template ? template : ""
                };

                try {
                    let result = await communicationModel.findOne({'_id': data._id});

                    if (result) {

                        for (const [key, value] of Object.entries(data.variables)) {
                            const substitute = new RegExp("\{\{" + key + "\}\}", "g");
                            if (result.template.includes(key)) {
                                template = result.template.toString().replace(substitute, value.toString());
                                result.template = template;
                            } else {
                                reject(Response.notAcceptable('Variável não foi encontrada.'));
                            }
                        }
                        message.subject = result.subject;
                        message.cc = result.cc;
                        message.html = template;
                        message.text = template;

                        let secure = MAILER_SECURE === "true" ? true : false;

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

