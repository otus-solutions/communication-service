/** @namespace application.app.models.MessageFactory**/
module.exports = function () {
    return {
        create(json) {
            return new Message(json);
        },
        fromHit(hit) {
            console.log(hit);
            let object = new Message(hit._source);

            object._id = hit._id;
            return object;
        },
        getMapping() {
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


    self.isValid = function() {
        return !!(
            self.text &&
            self.sender &&
            self.issueId
        )
    };

    self.toJSON = function() {
        return{
            text: self.text,
            sender: self.sender,
            issueId: self.issueId,
            _id: self._id,
            creationDate: self.creationDate
        };
    };

    return self;
}
