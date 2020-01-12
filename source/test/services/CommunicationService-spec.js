const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const CommunicationModel = mongoose.model('communication');

describe('CommunicationService.js Tests', function () {
    let CommunicationService;
    let ResponseService = require("../../app/utils/Response");

    beforeEach(function () {
        let app = {
            utils: {
                Response: ResponseService
            }
        };
        CommunicationService = require("../../app/services/CommunicationService")({app});
    });

    test('create', async function () {
        let communication = {
            "name": "name",
            "template": "template"
        };
        try {
            jest.spyOn(CommunicationModel, "create").mockImplementation(() => {
                return Promise.resolve();
            });
            let result = await CommunicationService.create(communication);
            expect(result).toEqual({
                "body": {
                    "data": true
                },
                "code": 200
            });
            expect(CommunicationModel.create).toBeCalledWith({'name': "name", 'template': "template"})
        } catch (err) {
            expect(err).toBe(false)
        }
    });

});
