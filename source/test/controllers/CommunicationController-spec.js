const mongoose = require('mongoose');

describe('CommunicationService.js Tests', function () {
    let CommunicationController;
    let CommunicationService = require("../../app/services/CommunicationService");
    let MailerService = require("../../app/services/MailerService");

    let ResponseService = require("../../app/utils/Response");

    beforeEach(function () {

        let app = {
            services: {
                CommunicationService: CommunicationService,
                MailerService: MailerService
            },
            utils: {
                Response: ResponseService
            }
        };
        CommunicationController = require("../../app/controllers/CommunicationController")({app});
    });

    xtest('create', async function () {
        let communication = {
            "name": "name",
            "template": "template"
        };
        //try {
            jest.spyOn(CommunicationService, "create")

            let result = await CommunicationController.create(communication);
            console.log(result)
            expect(result).toEqual({
                "body": {
                    "data": true
                },
                "code": 200
            });
            expect(CommunicationService.create).toBeCalledWith({'name': "name", 'template': "template"})
        //} catch (err) {
        //    expect(err).toBe({})
       // }
    });
});
