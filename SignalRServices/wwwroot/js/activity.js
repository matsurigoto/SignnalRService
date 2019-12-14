"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/messageHub").build();

connection.on("ReceiveAllMessage", function (user, message) {

    console.log(message);
    var person = JSON.parse(message);
    var containerHtml = document.querySelector('.player-result');
    Object.keys(person).forEach(key => {
        console.log(containerHtml);
        var userDom = containerHtml.querySelector(`#${key}`);
        console.log(userDom);
        if (!userDom) {
            userDom = document.createElement("div");
            userDom.className = "player-card";
            userDom.id = key;
            // TODO: create Card html....
            userDom.innerHTML = `
                <p class="player">${key}</p>
                <p>次數:<span class="count">0</span></p>
                <div><img id="image1" src="/walk.gif" /></div>
            `;
            containerHtml.appendChild(userDom);
        }

        userDom.querySelector('.count').innerText = person[key];
    });
    //for (var key in person)
    //{
    //    console.log(key);
    //}
    
    //document.getElementById("player1").innerText = parseInt(document.getElementById("player1").innerText) + 1;
    //document.getElementById("image1").src = "/run.gif";
    //window.setTimeout((() => document.getElementById("image1").src = "/walk.gif"), 10000);
});

connection.start().then(function () {
    
}).catch(function (err) {
    return console.error(err.toString());
});


