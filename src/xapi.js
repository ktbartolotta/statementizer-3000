const request = require('request');

async function getStatementById(url, id) {
    return new Promise( (resolve, reject) => {
        var options = {
                uri: `${url}/statements`,
                method: "GET",
                "rejectUnauthorized": false,
                auth: {
                    user: "test1@me.com",
                    password: "password"
                },
                headers: {
                    "X-Experience-API-Version": "1.0.1"
                },
                qs: {
                    statementId: id
                }
        };

        request(options, (err, res, body) => {
            if (err) return reject(err);

            return resolve(body);
        });
    });
}

async function sendStatement(url, statement) {
    return new Promise( (resolve, reject) => {
        var options = {
            uri: `${url}/statements`,
            method: "POST",
            "rejectUnauthorized": false,
            auth: {
                user: "test1@me.com",
                password: "password"
            },
            headers: {
                "X-Experience-API-Version": "1.0.1",
                'Content-Type': 'application/json'
            },
            json: statement
        }

        request(options, (err, res, body) => {
            if (err) return reject(err);

            return resolve(body);
        });
    });
}

module.exports = {
    getStatementById,
    sendStatement,
}
