var db = require("../common/database");
var q = require("q");

var conn = db.getConnection();

function getAllPosts(){

    var defer = q.defer();
    var query = conn.query('SELECT * FROM posts', function ( error, posts ) {
        if ( error ) {
            defer.reject( error );
            
        } else {
            defer.resolve( posts );
        }
    });

    return defer.promise;
}

function addPost( post ){
    if( post ){
        //console.log(user);
        var defer = q.defer();
        var query = conn.query('SELECT * FROM posts WHERE ?', post, function (error, result) {
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

function getPostById( id ){
    if( id ){
        //console.log(user);
        var defer = q.defer();
        var query = conn.query('SELECT * FROM posts WHERE ?', { id :id }, function (error, result) {
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

function updatePost( params ){
    if( params ){
        var defer = q.defer();
        var query = conn.query('UPDATE posts SET title=?, content=?, author =?, updated_at=? WHERE id=?', [params.title, params.content, params.author, new Date(), params.id], function (error, result) {
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

module.exports = {
    getAllPosts : getAllPosts,
    addPost : addPost,
    getPostById : getPostById,
    updatePost : updatePost
}