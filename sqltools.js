module.exports = {

    // Load My SQL node Module
    var mysql = require('mysql');

    // mysql host and connection module variable
    var host = "mysql"
    var con

    //load host name to the node module and load connection
    function loadSQLHost(dns) {
        host = dns

        con = mysql.createConnection({
            host: host,
            user: "root",
            password: "password",
            database: "user"
        });
    }


    // receives  data and log them into My SQL
    function pushUserDataToDB(users) {

        //SQL statement and place holder for batch insert
        var sql = "INSERT INTO user.usr (id, name, message) VALUES ?";

        con.query(sql, [users], function (err) {
            if (err) throw err;
            con.end();
        });

    }

};
