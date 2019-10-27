const request = require("request");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.blackRockPerformance = (req, res) => {
  var companies = [
    "https://www.blackrock.com/tools/hackathon/performance?identifiers=AAPL"
  ];

  companies.forEach(company => {
    request(company, { json: true }, (err, res, body) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send(body.resultMap); //body.whatever we need
    });
  });
};
