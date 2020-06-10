'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
    // Let's start by indexing some data
    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    // We need to force an index refresh at this point, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' })

    // Let's search!
    const { body } = await client.search({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            query: {
                match: { quote: 'winter' }
            }
        }
    })

    console.log(body.hits.hits)
}

async function run2 () {
    // await client.index({
    //     index: 'issue',
    //     // type: '_doc', // uncomment this line if you are using {es} ≤ 6
    //     body: {
    //         "objectType": "Issue",
    //         "sender": "oid string do participant",
    //         "group":"group_id - id do centro. Resolvido no otus-api",
    //         "title": "Primeira issue. ",
    //         "text": "Quando tento responder uma pergunta, não consigo inserir a resposta",
    //         "creationDate": "2020-06-10T21:08:50.824Z",
    //         "status": "OPEN"
    //     }
    // })

    // Let's search!
    const { body } = await client.search({
        index: 'issue',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
            query: {
                match: { objectType: 'Issue' }
            },
            size:10
        }
    })

    // console.log(body.hits.hits.map(hit => {
    //     return {...hit._source, _id:hit._id}
    // }))

    console.log(body.hits.hits)
}
run2().catch(console.log)
