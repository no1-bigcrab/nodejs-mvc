var config = require("config");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "blog_code",
    port: 3306,
});

connection.connect();

function getConnection(){
    if( !connection ){
        connection.connect();
    }
    return connection;
}

module.exports = {
    getConnection: getConnection
}