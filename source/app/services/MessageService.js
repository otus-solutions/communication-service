/** @namespace application.app.services.MessageService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const MESSAGES_INDEX = 'messages';

    return {
        async createMessage(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await ElasticsearchService.getClient().index({
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
                    const {body} = await ElasticsearchService.getClient().search({
                        index: MESSAGES_INDEX,
                        body: {
                            query: {
                                match: { issueId: issueId }
                            },
                        }
                    });
                    resolve(Response.success(body.hits.hits.map(transform)));
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        }
    };

    function transform(hit) {
        return { ...hit._source, _id: hit._id };
    }
};
