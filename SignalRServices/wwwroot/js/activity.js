"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/messageHub").build();

connection.on("ReceiveActivityMessage", function (user, message) {   
    document.getElementById("player1").innerText = parseInt(document.getElementById("player1").innerText) + 1;
    document.getElementById("image1").src = "/run.gif";


    window.setTimeout((() => document.getElementById("image1").src = "/walk.gif"), 10000);
});

connection.start().then(function () {
    
}).catch(function (err) {
    return console.error(err.toString());
});


