const {Client} = require('@elastic/elasticsearch');

const {
    ELASTICSEARCH_PORT,
    ELASTICSEARCH_HOSTNAME
} = process.env;

const client = new Client({node: ELASTICSEARCH_HOSTNAME + ":" + ELASTICSEARCH_PORT});//TODO review port type string


/** @namespace application.app.services.ElasticsearchService **/
module.exports = function (application) {
    const Response = application.app.utils.Response;
    const ISSUES_INDEX = 'issues';
    const MESSAGES_INDEX = 'messages';

    return {
        async createIssue(issue) {
            console.log(ISSUES_INDEX);
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await client.index({
                        index: ISSUES_INDEX,
                        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                        body: issue
                    });
                    console.log(body);
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
                    const {body} = await client.search({
                        index: ISSUES_INDEX,
                        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
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
                    const {body} = await client.get({
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
        async createMessage(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const {body} = await client.index({
                        index: 'messages',
                        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                        body: message
                    });
                    resolve(Response.success(body));
                } catch (err) {
                    console.error(err)
                    reject(Response.internalServerError(err));
                }
            });
        },
        async queryIssue(query) {
            return client.search({
                index: 'issue',
                // type: '_doc', // uncomment this line if you are using {es} ≤ 6
                body: {
                    query: {
                        match_all: {}
                        // match: { title: query}
                    }
                }
            });

            // return body.hits.hits.map(hit => {
            //     return { ...hit._source, _id: hit._id };
            // });
        },
        async updateIssueType(id, type) {
            //update to OPEN, CLOSE, FINALIZED
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
    }

    function transform(hit) {
        console.log(hit);
        return {...hit._source, _id:hit._id};
    }
};
