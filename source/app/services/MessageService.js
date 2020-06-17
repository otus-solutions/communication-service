/** @namespace application.app.services.MessageService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const MESSAGES_INDEX = 'messages';

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
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        },
        async listIssueMessages(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await ElasticsearchService.getClient().search({
                        index: MESSAGES_INDEX,
                        body: {
                            query: {
                                match: { issueId: issueId }
                            }
                        }
                    });
                    console.log(JSON.stringify(result))
                    const body = result.body;
                    resolve(Response.success(body.hits.hits.map(transform)));
                } catch (err) {
                    console.error(err)
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
                            //order
                        }
                    });
                    resolve(Response.success(body.hits.hits.map(transform)));
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
                    console.error(err)
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
                    });

                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        }
    };

    function transform(hit) {
        return { ...hit._source, _id: hit._id };
    }
};
