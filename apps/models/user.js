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
           } else {
               defer.resolve( result );
           }
        });

        return defer.promise;
    }
    return false;
}
//check trùng email
function getUserByEmail( email ) {
    if (email) {
        var defer = q.defer();

        var query = conn.query('SELECT * FROM user WHERE ?', {email: email}, function( err, result){
            if (err) {
                defer.reject(err);
                console.log(err)
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}
// lấy tất cả user:
function getAllUsers(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM user', function( err, result){
        if (err) {
            defer.reject(err);
            console.log(err)
        }
        else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}
module.exports = {
    addUser : addUser,
    getUserByEmail : getUserByEmail,
    getAllUsers : getAllUsers
}