const got = require("got");
const oauth2 = require("simple-oauth2");
require('dotenv').config();

const credentials = {
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    },
    auth: {
        tokenHost: "https://idfs.gs.com",
        authorizePath: "/as/authorization.oauth2",
        tokenPath: "/as/token.oauth2?scope=read_product_data"
    }
};

const callApi = (t) => {
    const args = {
        "headers": {
            "Authorization": "Bearer " + t.token.access_token,
            "Content-Type": "application/json"
        },
        "body": {
                "where": {
                    "gsid": ["75154", "193067", "194688", "902608", "85627"]
                },
                "startDate": "2017-01-15",
                "endDate":"2018-01-15"
           },
        "json": true
    };

    got.post("https://api.marquee.gs.com/v1/data/USCANFPP_MINI/query", args)
        .then(response => console.log(response.body), console.error.bind(console))
};

const oauth = oauth2.create(credentials);
oauth.clientCredentials
      .getToken({})
      .then(r => oauth.accessToken.create(r))
      .then(callApi)
      .then(console.log, console.error);