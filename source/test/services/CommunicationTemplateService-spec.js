describe('CommunicationTemplateService.js Tests', function () {
    var service, assert, application;
    const Mock = {};

    beforeEach(function () {
        mocks();

        application = require("../../config/server");

        Mock.mongoose = require("mongoose");
        Mock.Response = application.app.utils.Response;
        Mock.TempletaService = application.app.services.TemplateService;
        Mock.MailerService = application.app.services.MailerService;

        service = require("../../app/services/CommunicationTemplateService")(application);
        assert = require('assert');
    });

    it('service should defined', function () {
        expect(service).toBeDefined();
    });

    //it('should call sendTemplate method to findOneAndUpdate', async () => {
      //  jest.spyOn(Mock.TempletaService, 'updateTemplate').mockImplementation(() => Mock.data);
      //  jest.spyOn(Mock.MailerService, 'sendMail').mockImplementation(() => Promise.resolve("Ok3"));
      //  jest.spyOn(Mock.Response, 'internalServerError');

       // const result = await service.sendTemplate(Mock.data);

       // expect(service.sendTemplate).toBeDefined();
      //  expect(Mock.Response.internalServerError).toHaveBeenCalledTimes(1);
      //  expect(Mock.Response.internalServerError).toHaveBeenCalledWith("info");
       // expect(result).toEqual("Ok");
    //});

    function mocks() {
        Mock.data = {
            "email":"teste@gmail.com",
            "variables":{
                "name":"fulano"
            },
            "templateId":"dffasf3r3raf"
        }
    }
});