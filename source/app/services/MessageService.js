/** @namespace application.app.services.MessageService **/
module.exports = function (application) {
    const MESSAGES_INDEX = 'messages';

    const Response = application.app.utils.Response;
    const ElasticsearchService = require('./ElasticsearchService');
    const MessageFactory = application.app.models.MessageFactory;

    return {
        async createMessage(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().index({
                        index: MESSAGES_INDEX,
                        body: message
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async listIssueMessages(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: MESSAGES_INDEX,
                        body: {
                            query: {
                                match: { issueId: issueId }
                            }
                        }
                    });

                    if(Object.keys(body.hits.hits).length === 0){
                        reject(Response.notFound());
                    }
                    else{
                        resolve(Response.success(body.hits.hits.map(MessageFactory.fromHit)));
                    }

                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },

        async getMessageByIdLimit(params) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: MESSAGES_INDEX,
                        size: params.limit,
                        from: params.skip,
                        body: {
                            query: {
                                match: { issueId: params.issueId }
                            },
                            sort: { _id:  "desc"}
                        }
                    });

                    if(Object.keys(body.hits.hits).length === 0){
                        reject(Response.notFound());
                    }
                    else{
                        resolve(Response.success(body.hits.hits.map(MessageFactory.fromHit)));
                    }

                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async editTextMessage(id, text) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().update({
                        index: MESSAGES_INDEX,
                        id: id,
                        body: {
                            doc: {
                                text: text
                            }
                        }
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },

        async deleteMessage(messageId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().delete({
                        index: MESSAGES_INDEX,
                        id: messageId
                    });

                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },

        async deleteMessagesByIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().deleteByQuery({
                        index: MESSAGES_INDEX,
                        body: {
                            query: {
                                match: { issueId: issueId }
                            }
                        }
                    }, {
                        ignore: [404]
                    });

                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        }
    };
};
