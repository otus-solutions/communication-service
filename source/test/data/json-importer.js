module.exports = {
    issue: {
        objectType: "Issue",
        sender: "5",
        group: "3",
        title: "Não consigo preencher a atividade TCLEC",
        text: "Quando tento responder uma pergunta, não consigo inserir a resposta",
        creationDate: "2020-04-20T15:30:07.533Z",
        status: "OPEN"
    },
    issueHit: {
        _index: 'issues',
        _type: '_doc',
        _id: 'fqX38XIBU9yBIlNWf2l5',
        _score: null,
        _source: {
            sender: '4',
            group: '3',
            status: 'OPEN',
            title: 'Não consigo preencher a atividade TCLEC',
            text: 'Quando tento responder uma pergunta, não consigo inserir a resposta',
            creationDate: '2020-06-20T15:30:07.533Z'
        },
        sort: [ 1592667007533, '3', '4' ]
    },
    message: {
        "text": "conexão ok, qual próximo passo",
        "sender": "fulano3@email.com",
        "creationDate": "2020-04-12T11:30:07.533Z",
        "issueId": "fqX38XIBU9yBIlNWf2l5"
    },
    messageHit: {},
    client: {
        index: function(obj) {return {}},
        search: function(obj) {return {}},
        get: function(obj) {return {}},
        update: function(obj) {return {}},
        exists: function(obj) {return {}},
        delete: function(obj) {return {}}
    },
    filter: {
        "currentQuantity": 0,
        "quantityToGet": 10,
        "order": {
            "fields": [
                "group",
                "sender",
                "creationDate"
            ],
            "mode": -1
        },
        "filter": {
            "sender": "5",
            "group": "3"
        }
    }
};
