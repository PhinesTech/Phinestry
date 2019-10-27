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
      function(next) {
        // Create the 'accounts' table.
        client.query(
          "CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);",
          next
        );
      },
      // function (results, next) {
      //     // Insert two rows into the 'accounts' table.
      //     client.query('INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250);', next);
      // },
      function(results, next) {
        // Insert two rows into the 'accounts' table.
        client.query("delete from accounts;", next);
      },
      function(results, next) {
        // Print out account balances.
        client.query("SELECT id, balance FROM accounts;", next);
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

      console.log("Initial balances:");
      results.rows.forEach(function(row) {
        console.log(row);
      });

      finish();
    }
  );
});
