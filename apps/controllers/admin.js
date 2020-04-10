var express =  require("express");
var router = express.Router();
var user_md = require("../models/user");
var helper = require("../helpers/helper");

router.get("/", function(req, res){
    res.json({"message":"This is Admin page"});
});

//post sinup

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
    if( params.email.length == 0  ){
        res.render("signin",{ data: { error : "Email requied" }});
    }
    else if( params.password.length = 0 ){
        res.render("signin",{ data: { error : "Password requied" }});
    }
    else{
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

module.exports = router;