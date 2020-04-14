var express =  require("express");
var router = express.Router();

var post_md = require("../models/post");

router.get("/", function(req, res){
    var data = post_md.getAllPosts();

        data.then( function(posts){
            var data = {
                posts : posts,
                error : false
            }
            res.render("blog/index", {data : data});

        }).catch( function(err){
            var data = {
                error : "Could not get Post."
            }
            res.render("blog/index", {data : data});
        });
    // res.render("blog/index");
});

router.get("/post/:id", function(req, res){
    var id = req.params.id;

    var data = post_md.getPostById(id);
        data.then( function(posts){

            var data = {
                posts : posts,
                error : false
            }
            res.render("blog/post", { data : data });

        }).catch( function(err){
            var data = {
                error : "Could not get Post BY id."
            }
            res.render("blog/index", { data : data });
        });
});

router.get("/about", function(req, res){
    res.render("blog/about");
});

module.exports = router;