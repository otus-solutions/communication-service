const mongoose = require("mongoose");
const communicationModel = mongoose.model('communication');

/** @namespace application.app.services.CommunicationService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;

    return {
        async create(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    let template = new communicationModel(data);
                    await template.save();
                    resolve(Response.success())
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        },
        async get(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = await communicationModel.findOne({'_id': id});
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
                    let template = new communicationModel(data);
                    await communicationModel.updateOne({'_id': template._id}, template,{upsert : false });
                    resolve(Response.success())
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        },
        async delete(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    await communicationModel.deleteOne({'_id': id});
                    resolve(Response.success())
                } catch (err) {
                    reject(Response.internalServerError());
                }
            });
        }
    };
};

