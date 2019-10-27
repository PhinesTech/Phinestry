const async = require("async");
const pg = require("pg");
require("dotenv").config();
/**
 * ! CockroachDB
 */

// Connect to the "bank" database.
var config = {
  user: "maxroach",
  host: "gcp-us-west1.phinestry.crdb.io",
  database: "defaultdb",
  password: "8mmCRU6UsgGxUG6",
  port: 26257,
  ssl: {}
};

// Create a pool.
var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
  // Close communication with the database and exit.
  var finish = function() {
    done();
    process.exit();
  };

  if (err) {
    console.error("could not connect to cockroachdb", err);
    finish();
  }
  async.waterfall(
    [
      function(results, next) {
        client.query("SELECT * FROM periodic_elements;", next);
      }
    ],
    function(err, results) {
      if (err) {
        console.error(
          "Error inserting into and selecting from accounts: ",
          err
        );
        finish();
      }

      console.log("Elements:");
      results.rows.forEach(function(row) {
        console.log(row);
      });

      finish();
    }
  );
});
