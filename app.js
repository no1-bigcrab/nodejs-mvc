var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// set ejs
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

//static folder
app.use("/static", express.static(__dirname + '/public'));

var controllers = require(__dirname + "/apps/controllers");

app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

var serve = app.listen(port, host, function(){
    console.log("Server iss runing", port);
});

var io = require('socket.io')(serve);

const users = {};
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;

        socket.broadcast.emit('user-connected', name);
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });
  
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id]);
      delete users[socket.id];
  })
});

