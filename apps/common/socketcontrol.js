module.exports = function( io ) {
      var usernames = [];
      io.sockets.once('connection', function(socket) {  
        console.log('a user connected');
        // add user vào db
        // socket.on("addUser", function(){
        //     socket.username = username;
        //     usernames.push(username);
        //     //
        //     var data = {
        //       sender : "SERVER",
        //       message : "You have Join chat room"
        //     };

        //     // message
        //     socket.emit("updateMessage", data);
        //     // send to other
        //     var data = {
        //       sender : "SERVER",
        //       message : username + "Have Join"
        //     }
        //     socket.broadcast.emit("updateMessage", data);
        // });
    });
}