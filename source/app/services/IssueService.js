/** @namespace application.app.services.IssueService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ElasticsearchService = application.app.services.ElasticsearchService;
    const IssueFactory = application.app.models.IssueFactory;
    const ISSUES_INDEX = 'issues';

    return {
        async createIssue(issue) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().index({
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

        async queryIssue(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    let query;
                    if (data.filter.sender || data.filter.group || data.filter.status || data.filter.creationDate) {
                        console.log(data.filter)
                        query = { match: data.filter }
                    } else {
                        query = { match_all: {} }
                    }

                    let order = (data.order.mode == 1) ? "asc" : "desc";

                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        from: data.currentQuantity,
                        size: data.quantityToGet,
                        // stored_fields: query.order.fields,
                        // q: query.filter,
                        body: {
                            query: query,
                            // {
                            // match_all: {},
                                // match: {
                                //     group: "1"
                                // }
                            //     match:
                            //         // { group: "1" },
                            //         (query.filter.length != 0) ? match : query.filter : match_all: {},

                            // },
                            // stored_fields: query.order.fields,
                            sort: [
                                { "sender": order },
                                { "group": order },
                                { "creationDate": order }
                                // { "price": { "order": "asc", "mode": "avg" } }
                            ],
                            // { "_id": { "order": "desc" } }
                            // { "sender": "asc" }
                            // { "group":  "asc" }
                            // { "creationDate": { "order": "asc" } }
                        }
                    });

                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },

        async listSenderIssues(senderId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        body: {
                            query: {
                                match: { sender: senderId }
                            },
                            // size:1,
                            // from:0,
                            //order
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body.hits.hits.map(IssueFactory.fromHit)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async getIssuesByGroup(groupId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().search({
                        index: ISSUES_INDEX,
                        body: {
                            query: {
                                match: { group: groupId }
                            },
                            // size:1,
                            // from:0,
                            //order
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body.hits.hits.map(transform)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async getIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().get({
                        index: ISSUES_INDEX,
                        id: issueId
                    });
                    resolve(Response.success(transform(body)));
                } catch (err) {
                    console.error(err);
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async updateIssueType(id, type) {
            //update to OPEN, CLOSED, FINALIZED
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().update({
                        index: ISSUES_INDEX,
                        id: id,
                        body: {
                            doc: {
                                status: type
                            }
                        }
                    });
                    console.log(body);
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.notFound(err.meta));
                }
            });
        },
        async existIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().exists({
                        index: ISSUES_INDEX,
                        id: issueId
                    });

                    body ? resolve(body) : reject(Response.notFound(body));

                } catch (err) {
                    console.error(err);
                    reject(Response.internalServerError(err));
                }
            });
        },
        async deleteIssue(issueId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { body } = await ElasticsearchService.getClient().delete({
                        index: ISSUES_INDEX,
                        id: issueId
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
