const Service = require('../services/Service');
const Factory = require('../models/Factory');

/** @namespace application.app.services.MailService **/
module.exports = function (application) {

    return {
        sendMail() {
            let mailOptions = {
                from: "adonis.garcia.adg@gmail.com",
                to: "adonis111g@gmail.com",
                subject: "Teste",
                html: "Enviado com sucesso."
            };

            const transporter = nodemailer.createTransport({
                host: config.host, //TODO definir configuração
                port: config.port,
                secure: false,
                auth: {
                    user: config.user,
                    pass: config.password
                },
                tls: { rejectUnauthorized: false }
            });

            console.log(mailOptions);

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return error;
                } else {
                    return "E-mail enviado com sucesso!";
                }
            });
        }
    };
};
