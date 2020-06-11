const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
    MAILER_FROM,
    MAILER_SERVICE,
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
                        const resultArrayVariablesTemplate = result.template.match(regExp);
                        const resultArrayVariables = Object.keys(data.variables);
                        const arrayVariablesTemplate = resultArrayVariablesTemplate ? resultArrayVariablesTemplate : [];
                        const arrayVariables = resultArrayVariables ? resultArrayVariables : [];

                        if (arrayVariablesTemplate.length > 0 || arrayVariables.length > 0) {
                            let resultTemplate = arrayVariablesTemplate.filter(item => !arrayVariables.includes(item.replace('\{\{', '').replace('\}\}', '')));

                            if (resultTemplate != 0) {
                                return reject(Response.notAcceptable('Not established according to the template. Not identified ' + resultTemplate + '.'));
                            }
                            for (const [key, value] of Object.entries(data.variables)) {
                                const substitute = new RegExp("\{\{" + key + "\}\}", "g");
                                if (result.template.search(substitute) != -1) {
                                    template = result.template.toString().replace(substitute, value.toString());
                                    result.template = template;
                                } else {
                                    return reject(Response.notAcceptable('Variable was not found.'));
                                }
                            }
                        }

                        let message = {
                            from: data.from ? data.from : "",
                            to: data.email ? data.email : "",
                            cc: data.cc ? data.cc : "",
                            subject: data.subject ? data.subject : "Plataforma Otus"
                        };

                        message.subject = result.subject ? result.subject : message.subject;
                        message.cc = result.cc ? result.cc : message.cc;
                        message.from = result.from ? result.from + '<' + MAILER_FROM + '>': message.from + '<' + MAILER_FROM + '>';
                        message.html = template ? template : result.template;
                        message.text = template ? template : result.template;

                        if (!message.to) {
                            reject(Response.notAcceptable('E-mail field is mandatory.'));
                        } else {
                            try {
                                if (MAILER_SERVICE === 'GMAIL') {
                                    const transporter = nodemailer.createTransport({
                                        service: MAILER_SERVICE,
                                        auth: {
                                            user: MAILER_AUTH_USER,
                                            pass: MAILER_AUTH_PASS
                                        }
                                    });
                                    result = await transporter.sendMail(message);
                                    transporter.close();
                                    resolve(Response.success(result));
                                } else if (MAILER_SERVICE === 'SENDGRIP') {
                                    result = await sgMail.send(message)
                                    resolve(Response.success(result));
                                }
                            } catch (err) {
                                console.error(err);
                                reject(Response.internalServerError(err));
                            }
                        }
                    } else {
                        reject(Response.notFound());
                    }
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        }
    };
};


