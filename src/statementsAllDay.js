const xapi = require('./xapi');
const random = require('random');

const url = 'http://local.veracity.it:3005/test-lrs/xapi'

async function getStatementById(statementId) {
    let statement = await xapi.getStatementById(url, statementId);
    success(statement);
    return statement;

}

async function createStatement() {
    const statement  = {
        "actor": {
            "account": {
                "name": `${getRandoName()} xapiguy`,
                "homePage": "http://example.com"
            },
            "objectType": "Agent"
        },
        "verb": {
            "id": "http://adlnet.gov/expapi/verbs/answered",
            "display": {
                "en-US": "answered"
            }
        },
        "object": {
            "id": "http://adlnet.gov/expapi/activities/example",
            "definition": {
                "name": {
                    "en-US": "Example Activity"
                },
                "description": {
                    "en-US": "Example activity description"
                }
            },
            "objectType": "Activity"
        }
    };

    let response = await xapi.sendStatement(url, statement);

    success(response);

    return response;
}

function success (body) {
    console.log(`Body: ${body}`);
}

function getRandoName() {
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let rando = () => letters[random.int(0, 4)];

    return`${rando()}${rando()}${rando()}${rando()}${rando()}${rando()}`;
}

module.exports = {
    getStatementById,
    createStatement
}
