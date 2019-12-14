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

            var a = Math.floor(Math.random() * Math.floor(2));
            var walk = "/walk.gif";
            var run = "/run.gif";
            if (a == 1) {
                walk = "/walkcat.gif";
                run = "/runcat.gif";
            }

            userDom = document.createElement("div");
            userDom.className = "player-card";
            userDom.id = key;
            // TODO: create Card html....
            userDom.innerHTML = `
                <p class="player">${key.replace('user','')}</p>
                <p>次數:<span class="count">0</span></p>
                <div><img id="image${key}" src="${walk}" /></div>
            `;
            containerHtml.appendChild(userDom);
        }

        userDom.querySelector('.count').innerText = person[key];
    });

    var userDom = containerHtml.querySelector(`#${user}`);
    console.log(userDom.querySelector(`#image${user}`).src);
    if (userDom.querySelector(`#image${user}`).src.indexOf("/walk.gif") >= 0 || userDom.querySelector(`#image${user}`).src.indexOf("/run.gif") >= 0) {
        userDom.querySelector(`#image${user}`).src = "/run.gif";
        window.setTimeout((() => document.getElementById(`image${user}`).src = "/walk.gif"), 10000);
    }
    else {
        userDom.querySelector(`#image${user}`).src = "/runcat.gif";
        window.setTimeout((() => document.getElementById(`image${user}`).src = "/walkcat.gif"), 10000);
    }
    
    
});


connection.on("ReceiveInitMessage", function (message) {

    var a = Math.floor(Math.random() * Math.floor(2));
    var walk = "/walk.gif";
    var run = "/run.gif";
    if (a == 1) {
        walk = "/walkcat.gif";
        run = "/runcat.gif";
    }

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
                <div><img id="image${key}" src="${walk}" /></div>
            `;
            containerHtml.appendChild(userDom);
        }

        userDom.querySelector('.count').innerText = person[key];
    });
});

connection.on("DeleteUserMessage", function (user) {
    var element = document.getElementById(user);
    element.parentElement.removeChild(element);
});

connection.start().then(function () {
    connection.invoke("GetInitMessage").catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});


