describe('TemplateService.js Tests', function () {
    var service, assert, application;
    const Mock = {};

    beforeEach(function () {
        mocks();

        application = require("../../config/server");

        service = require("../../app/services/TemplateService")(application);
        assert = require('assert');
    });

    it('service should defined', function () {
        expect(service).toBeDefined();
    });

    it('should call updateTemplate method to call', async () => {
        const result = await service.updateTemplate(Mock.data);
        expect(service.updateTemplate).toBeDefined();
        expect(result).toEqual(Mock.result);
    });

    function mocks() {
         Mock.data = {
            "email":"teste@gmail.com",
            "variables":{
                "name":"fulano"
            },
            "templateId":"dffasf3r3raf"
        }
        Mock.result = `<!DOCTYPE html>
                        <html lang="pt">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
                                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                                <title>Document</title>
                            </head>
                                <body>                                    
                                    <p>Bom dia fulano.</p>
                                    <p>Identificação: dffasf3r3raf.</p>
                                    <p>Projeto: undefined.</p>
                                 </body>
                        </html>`
    }
});