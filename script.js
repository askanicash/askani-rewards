let points = Number(localStorage.getItem("points")) || 0;

document.getElementById("points").innerText = points;

function claimTask(reward){
points += reward;

localStorage.setItem("points", points);

document.getElementById("points").innerText = points;

alert("+" + reward + " Points Added");
}

function withdrawRequest(){

if(points < 100){
alert("Minimum 100 Points Required");
return;
}

let method =
document.getElementById("method").value;

let account =
document.getElementById("account").value;

let msg =
"Withdrawal Request%0A" +
"Method: " + method + "%0A" +
"Account: " + account + "%0A" +
"Points: " + points;

window.open(
"https://wa.me/923232605904?text=" + msg,
"_blank"
);
}
