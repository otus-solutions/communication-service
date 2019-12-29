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
//const Response = application.app.utils.Response;

    return {
        sendMail() {
            let mailOptions = {
                from: MAILER_FROM,
                to: "adonis.garcia.adg@gmail.com",
                subject: "Teste",
                html: "Enviado com sucesso."
            };

            const transporter = nodemailer.createTransport({
                host: MAILER_HOST,
                port: MAILER_PORT,
                secure: MAILER_SECURE,
                auth: {
                    user: MAILER_AUTH_USER,
                    pass: MAILER_AUTH_PASS
                },
                tls: { rejectUnauthorized: true }
            });
            console.log(mailOptions);

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("nao passou")
                    //return Response.internalServerError();
                    return error
                } else {
                    console.log("passou")
                    return "E-mail enviado com sucesso!";
                }
            });
        }
    };
};

