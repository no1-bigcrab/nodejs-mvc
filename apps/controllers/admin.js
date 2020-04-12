var express =  require("express");
var router = express.Router();

// connect
var user_md = require("../models/user");
var posts_md = require("../models/post");

var helper = require("../helpers/helper");

router.get("/", function(req, res){
    
    var data = posts_md.getAllPosts();

    data.then(function(posts){
        var data = {
            posts : posts,
            error : false
        };
        
        res.render("admin/dashboard", { data : data });

    }).catch(function(error){

        res.render("admin/dashboard", {data : {error : "Get posts data error"}});

    });
});

//get sinup

router.get("/signup", function(req, res){
    res.render("signup", {data: {}});
});

//post sinup
router.post("/signup", function(req, res){
    var user = req.body;
    //console.log(user);
    if( user.email.length = 0  ){
        res.render("signup",{ data: { error : " Email requied" }});
    }
    if( user.password.length = 0 ){
        res.render("signup",{ data: { error : " Password requied" }});
    }
    if( user.repassword.length = 0 ){
        res.render("signup",{ data: { error : " Repassword requied" }});
    }
    if( user.password != user.repassword ){
        res.render("signup",{ data: {error : "Password no match."}});
    }
    if( user.firstname.length = 0 ){
        res.render("signup",{ data: { error : " First name requied" }});
    }
    if( user.lastname.length = 0 ){
        res.render("signup",{ data: { error : " Last name requied" }});
    }

    var password = helper.hash_password( user.password );
    user = {
        email : user.email,
        password : password,
        first_name : user.firstname,
        last_name : user.lastname
    }
    //console.log(user);
    var results = user_md.addUser(user);
    //console.log( results );
    results.then(function (data) {
        res.redirect("/signin");

    }).catch( function (err) {
        res.render( "signup",{ data: { error : " Could not insert user data." } } );

    })

});

// signin
router.get("/signin", function(req, res){

    res.render("signin", {data: {}});
});

// post signin
router.post("/signin", function(req, res){
    var params = req.body;
    //console.log(params.email.length);
    if( params.email.length == 0  ) {
        res.render("signin",{ data: { error : "Email requied" }});
    }
    else if( params.password.length = 0 ) {
        res.render("signin",{ data: { error : "Password requied" }});
    }
    else {
        var data = user_md.getUserByEmail( params.email );
        //
        if ( data ) {
            data.then(function( users ){
                var user = users[0];

                var status = helper.hash_password( params.password , user.password );

                if (!status) {
                    res.render("signin",{ data: { error : "Password wrong" }});
                }
                else {
                    req.session.user = user;
                    res.redirect("/admin");
                }
            });
        } else {
            res.render("signin",{ data: { error : "Email not exist." }});
        }
    }
});

// add get new posts
router.get("/post/new", function(req, res){
    res.render("admin/post/new", {data: { error : false }});
});
// add post new posts
router.post("/post/new", function(req, res){
    var params = req.body;

    if( params.title.trim().length == 0  ) {
        res.render("admin/post/new", { data: { error : "Title requied" }});
    }
    else if( params.content.trim().length == 0 ) {
        res.render("admin/post/new", { data: { error : "Content requied" }});
    }
    else if( params.author.trim().length == 0 ) {
        res.render("admin/post/new", { data: { error : "Author requied" }});
    }
    else {
        var now = new Date();
        params.created_at = now;
        params.updated_at = now;
    
        var data = posts_md.addPost(params);
    
        data.then(function (result) {
           res.redirect("/admin");
    
        }).catch( function (err) {
            res.render( "signup",{ data: { error : " Could not insert user data." } } );
        });
    }
   
    
});
//get edit post
router.get("/post/edit/:id", function(req, res){
    var params = req.params;
    var id = params.id;
    var data = posts_md.getPostById(id);
    if ( data ) {
        data.then(function (results) {
            var post = results[0];
            var data = {
                post : post,
                error : false
            }
            res.render("admin/post/edit", {data : data});
     
         }).catch( function (err) {
             var data = {
                 error :" Could not get post  By id."
             }
             res.render("admin/post/edit", {data : data});
         });
    } else {
        var data = {
            error :" Could not get post  By id."
        }
        res.render("admin/post/edit", {data : data});
    }
    
});
// post edit post.abs
router.put("/post/edit", function(req, res){
   var params = req.body;
//    console.log(params);

   var data = posts_md.updatePost(params);
   if ( !data ) {
       res.json({status_code : 500});
   } else {
        data.then( function(result){
            res.json({status_code : 200});
        }).catch( function(err){
            res.json({status_code : 500});
        })
   }
});

module.exports = router;