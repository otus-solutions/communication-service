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
    console.log('passou')
    await client.search({
        index: 'issue',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            query: {
                match: {
                    title: query
                }
            }
        }
    })
}

async function updateIssueType(id, type) {
//update to OPEN, CLOSE, FINALIZED
}


function create() {
    createIssue({
            "objectType": "Issue",
            "sender": "oid string do participant",
            "group":"group_id - id do centro. Resolvido no otus-api",
            "title": "Primeira issue. ",
            "text": "Quando tento responder uma pergunta, não consigo inserir a resposta",
            "creationDate": "2020-06-10T21:08:50.824Z",
            "status": "OPEN"
        }
    ).then(result => {
        console.log('result');
        console.log(result);
    }).catch(console.log);
}

function query() {
    queryIssue('issue')
        .then(result => {
            console.log(result)
        })
}

create()
