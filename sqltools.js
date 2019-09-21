// Load My SQL node Module
var mysql = require('mysql');

// mysql host and connection module variable
var host = "mysql"
var con


module.exports = {

    //load host name to the node module and load connection
    function loadSQLHost(dns) {
        this.host = dns

        this.con = mysql.createConnection({
            host: host,
            user: "root",
            password: "password",
            database: "user"
        });
    },


    // receives  data and log them into My SQL
    function pushUserDataToDB(users) {

        //SQL statement and place holder for batch insert
        var sql = "INSERT INTO user.usr (id, name, message) VALUES ?";

        this.con.query(sql, [users], function (err) {
            if (err) throw err;
            this.con.end();
        });

    }

};
