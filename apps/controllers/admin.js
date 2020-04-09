var express =  require("express");
var router = express.Router();
var user_md = require("../models/user");
var helper = require("../helpers/helper");

router.get("/", function(req, res){
    res.json({"message":"This is Admin page"});
});

router.get("/signup", function(req, res){
    res.render("signup", {data: {}});
});

router.get("/signin", function(req, res){
    res.render("signin", {data: {}});
});

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
        res.json( { message: "Insert success!!" } );

    }).catch( function (err) {
        res.render( "signup",{ data: { error : " Could not insert user data." } } );

    })

});

module.exports = router;