const {Client} = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200'})


async function createIssue(issue) {
    await client.index({
        index: 'issue',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: issue
    });
}


async function createMessage(message) {
    await client.index({
        index: 'message',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: message
    });
}

async function queryIssue(query) {
    await client.search({
        index: 'issue',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            query: {
                match: {
                    title: query,
                    text: query
                }
            }
        }
    })
}

async function updateIssueType(id, type) {
//update to OPEN, CLOSE, FINALIZED
}
