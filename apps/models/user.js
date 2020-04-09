var db = require("../common/database");
var q = require("q");

var conn = db.getConnection();
function addUser( user ){
    if( user ){
        //console.log(user);
        var defer = q.defer();
        var query = conn.query('INSERT INTO user SET ?', user, function (error, result) {
           if ( error ) {
               defer.reject( error );
               console.log(error);
           } else {
               defer.resolve( result );
               console.log(result);
           }
        });

        return defer.promise;
    }
    return false;
}
module.exports = {
    addUser : addUser
}