/** @namespace application.app.services.IssueService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const ISSUES_INDEX = 'issues';

    return {
        async createIssue(issue) {
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await ElasticsearchService.getClient().index({
                        index: ISSUES_INDEX,
                        body: issue
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async queryIssue(query) {
            return client.search({
                index: 'issue',
                body: {
                    query: {
                        match_all: {}
                    }
                }
            });
        },

        async listSenderIssues(senderId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        body: {
                            query: {
                                match: {sender: senderId}
                            },
                            //order
                        }
                    });
                    console.log(body.hits.hits);
                    resolve(Response.success(body.hits.hits.map(transform)));
                } catch (err) {
                    console.error('err');
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },
        async getIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await ElasticsearchService.getClient().get({
                        index: ISSUES_INDEX,
                        id: issueId
                    });
                    console.log(body);
                    resolve(Response.success(body));
                } catch (err) {
                    console.error('err');
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },
        async updateIssueType(id, type) {
            //update to OPEN, CLOSED, FINALIZED
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await client.update({
                        index: 'issues',
                        id: id,
                        body: {
                            script: {
                                lang: 'painless',
                                source: 'ctx._source.status = params.status',
                                params: { status: type }
                            }
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        }
    };

    function transform(hit) {
        console.log(hit);
        return {...hit._source, _id:hit._id};
    }
};
