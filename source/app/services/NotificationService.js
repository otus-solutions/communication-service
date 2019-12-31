const mongoose = require("mongoose");
const CommunicationModel = mongoose.model('communication');

/** @namespace application.app.services.NotificationService **/
module.exports = function (application) {
    const MailerService = application.app.services.MailerService;
    var userMap = {};
    let message = {};
    try {
        CommunicationModel.find({}, function(err, users) {
            users.forEach(function(user) {
                userMap[user._id] = user;
                customTemplate(user);
                console.log(user);
                console.log(userMap)
            });
            //users.toArray(function(err, items) {
            //  let matches = _.filter(items, function(sub){return sub.eventTitle == signal.eventTitle});
            //  console.log(matches)
            //  _.each(matches, function (sub) {MailerService.sendMail(sub)});
            //});
            console.log(users)
        });
    } catch (err) {
        console.log(err);
    }

    function customTemplate (user) {
        message.to = user.to ? user.to : 'fulano@nubmi9.catchall.delivery';
        message.cc = user.cc;
        message.subject = user.subject ? user.subject : "test";
        message.text = user.text;
        message.html = user.html ? user.html : `<!DOCTYPE html>
                        <html lang="pt">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
                                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                                <title>Document</title>
                            </head>
                                <body>                                    
                                    <p>Bom dia ${user.name}.</p>
                                    <p>Identificação: ${user.id}.</p>
                                    <p>Projeto: ${user.project}.</p>
                                 </body>
                        </html>`;
        MailerService.sendMail(data);
    }
};