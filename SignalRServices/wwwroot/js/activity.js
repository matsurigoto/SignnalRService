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
                <p class="player">${key.replace('user','')}</p>
                <p>次數:<span class="count">0</span></p>
                <div><img id="image${key}" src="/walk.gif" /></div>
            `;
            containerHtml.appendChild(userDom);
        }

        userDom.querySelector('.count').innerText = person[key];
        
    });

    var userDom = containerHtml.querySelector(`#${user}`);
    userDom.querySelector(`#image${user}`).src = "/run.gif";
    window.setTimeout((() => document.getElementById(`image${user}`).src = "/walk.gif"), 10000);
});


connection.on("ReceiveInitMessage", function (message) {
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
                <p class="player">${key.replace('user', '')}</p>
                <p>次數:<span class="count">0</span></p>
                <div><img id="image${key}" src="/walk.gif" /></div>
            `;
            containerHtml.appendChild(userDom);
        }

        userDom.querySelector('.count').innerText = person[key];
    });
});

connection.start().then(function () {
    connection.invoke("GetInitMessage").catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});


