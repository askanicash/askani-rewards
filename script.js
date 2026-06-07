function claimTask(taskId, reward){

let lastClaim = localStorage.getItem(taskId);

if(lastClaim){

let diff = Date.now() - Number(lastClaim);

let hours = diff / (1000 * 60 * 60);

if(hours < 5){

let remaining = (5 - hours).toFixed(1);

alert(
"Task already claimed.\n\nWait " +
remaining +
" hours."
);

return;
}
}

points += reward;

localStorage.setItem("points", points);

localStorage.setItem(taskId, Date.now());

document.getElementById("points").innerText = points;

alert("+" + reward + " Points Added");
}
