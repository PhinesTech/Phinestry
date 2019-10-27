const jsonSql = require("json-sql")();
const pt = require("periodic-table");
const async = require("async");
const pg = require("pg");
require("dotenv").config();

// entire dataset
for (var i = 1; i < 30; i++) {
  var allElements = pt.numbers[i];

  function toString(o) {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        return toString(o[k]);
      }
      
      o[k] = '' + o[k];
    });
    
    return o;
  }

  var sql = jsonSql.build({
    type: "insert",
    table: "periodic_elements",
    values: toString(allElements)
  });
  console.log(sql);

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
          client.query(sql, next);
        },
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
}
