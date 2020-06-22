/** @namespace application.app.models.MessageFactory**/
module.exports = function () {
    return {
        create: (issueId, json) => {
            return new Message(json);
        },
        fromHit: (hit) => {
            console.log(hit);
            let object = new Message(hit._source);

            object._id = hit._id;
            return object;
        },
        getMapping: () => {
            return {
                mappings: {
                    properties: {
                        text: {type: 'text'},
                        sender: {type: 'keyword'},
                        issueId: {type: 'keyword'},
                        // _id: {type: 'keyword'},
                        creationDate: {type: 'date'}
                    }
                }
            }
        }
    };
};

function Message(json) {
    let self = {
        ...json,
        ...this
    };


    self.isValid = () => {
        return !!(
            self.text &&
            self.sender &&
            self.issueId
        )
    };

    self.toJSON = () => {
        let json = {};
        json.text = self.text;
        json.sender = self.sender;
        json.issueId = self.issueId;
        json._id = self._id;
        json.creationDate = self.creationDate;

        return json;
    };

    return self;
}
