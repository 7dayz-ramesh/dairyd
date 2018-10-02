/**
 * http://usejsdoc.org/
 */


//Loading and initializing the library:
const pgp = require('pg-promise')(options);

var options = {
    // global event notification;
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message || error);
        }
    }
};

// Preparing the connection details:
var POSTGRES_URI = process.env.POSTGRES_URI;

// Creating a new database instance from the connection details:
var db = pgp(POSTGRES_URI);

exports.db = db;