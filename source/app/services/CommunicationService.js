const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');

/** @namespace application.app.services.CommunicationService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        async create(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    await communicationModel.create({'name': data.name, 'template': data.template});
                    resolve(Response.success())
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        },
        async get(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = await communicationModel.findOne({'_id': data.id});
                    if(result){
                        resolve(Response.success(result))
                    } else {
                        reject(Response.notFound());
                    }
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        },
        async getAll() {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = await communicationModel.find({});
                    resolve(Response.success(result))
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        },
        async update(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    await communicationModel.updateOne({'_id': data.id}, {'name':data.name,'template':data.template},{upsert : false });
                    resolve(Response.success())
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        },
        async delete(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    await communicationModel.deleteOne({'_id': data.id});
                    resolve(Response.success())
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        }
    };
};

