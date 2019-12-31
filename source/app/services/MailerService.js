const nodemailer = require('nodemailer');

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
        sendMail(data) {
            let message = {
                from: MAILER_FROM,
                to: data.to ? data.to : "",
                cc: data.cc ? data.cc : "",
                subject: data.subject ? data.subject : "",
                text: data.text ? data.text : "",
                html: data.html ? data.html : ""
            };

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
            });
        }
    };
};

