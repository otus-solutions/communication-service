const nodemailer = require('nodemailer');

const {
    MAILER_FROM,
    MAILER_HOST,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_AUTH_USER,
    MAILER_AUTH_PASS
} = process.env;

/** @namespace application.app.services.MailService **/
module.exports = function (application) {
const Response = application.app.utils.Response;

    return {
        sendMail() {
            let mailOptions = {
                from: MAILER_FROM,
                to: "adonis.garcia.adg@gmail.com",
                subject: "Teste",
                html: "Enviado com sucesso."
            };

            let secure = MAILER_SECURE === "false" ? false : true;

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
                await transporter.sendMail(mailOptions, async (err, info) => {
                    if (err) {
                        transporter.close();
                        console.log(err);
                        reject(Response.internalServerError());
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

