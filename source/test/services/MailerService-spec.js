describe('MailerService.js Tests', function () {
    var service, assert, application;
    const Mock = {};

    jest.mock("nodemailer");

    beforeEach(function () {
        mocks();

        application = require("../../config/server");

        Mock.nodemailer = require('nodemailer');
        Mock.Response = application.app.utils.Response;

        service = require("../../app/services/MailerService")(application);
        assert = require('assert');
    });

    it('service should defined', function () {
        expect(service).toBeDefined();
    });

    it('should call sendMail method to send', async () => {
        jest.spyOn(Mock.nodemailer, 'createTransport').mockImplementation(() => Mock.transport);
        jest.spyOn(Mock.Response, 'success').mockImplementation(() => Promise.resolve("Ok"));

        const result = await service.sendMail(Mock.data);

        expect(service.sendMail).toBeDefined();
        expect(Mock.Response.success).toHaveBeenCalledTimes(1);
        expect(Mock.Response.success).toHaveBeenCalledWith("info");
        expect(result).toEqual("Ok");
    });

    function mocks() {
            Mock.data = {
                from: "any@nubmi9.catchall.delivery",
                to: ["fulano@gmail.com", "fulano2@gmail.com"],
                cc: "fulano@hotmail.com",
                subject: "Sem assunto",
                html: "<h1>TEXTO</h1>"
            },
            Mock.transport = {
                host: 'localhost',
                port: 1025,
                secure: false,
                auth: {
                    user: 'project.1',
                    pass: 'secret.1'
                },
                sendMail: (options, callback) => callback(undefined, 'info'),
                close: function () { }
            },
            Mock.transportNull = {
                sendMail: (options, callback) => callback(new Error('err'), undefined),
                close: function () { }
            }
    }
});