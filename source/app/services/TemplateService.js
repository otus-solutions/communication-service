/** @namespace application.app.services.TemplateService **/
module.exports = function () {
    return {
        updateTemplate(data) {
            let user = {};
            user.name = data.variables.name;
            user.templateId = data.templateId;
            user.project = data.project;

            let htmlTemplate = `<!DOCTYPE html>
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
                                    <p>Identificação: ${user.templateId}.</p>
                                    <p>Projeto: ${user.project}.</p>
                                 </body>
                        </html>`;
            return htmlTemplate;
        }
    }
};