```javascript
// Load saved points
let points = Number(localStorage.getItem("points")) || 0;

// Page load
window.onload = function () {
    updatePoints();
    loadHistory();
};

// Update points display
function updatePoints() {
    const el = document.getElementById("points");

    if (el) {
        el.innerText = points;
    }
}

// Claim Task Function
function claimTask(taskId, reward) {

    let lastClaim = localStorage.getItem(taskId);

    if (lastClaim) {

        let diff = Date.now() - Number(lastClaim);
        let hours = diff / (1000 * 60 * 60);

        if (hours < 5) {

            let remaining = (5 - hours).toFixed(1);

            alert(
                "Task already claimed!\n\n" +
                "Wait " + remaining + " hours."
            );

            return;
        }
    }

    points += reward;

    localStorage.setItem("points", points);
    localStorage.setItem(taskId, Date.now());

    updatePoints();

    alert("+" + reward + " Points Added");
}

// Withdrawal Function
function withdrawRequest() {

    let method = document.getElementById("method").value;
    let account = document.getElementById("account").value.trim();

    if (account === "") {
        alert("Please enter account details");
        return;
    }

    if (points < 100) {
        alert("Minimum 100 Points Required");
        return;
    }

    // Deduct points
    points -= 100;

    localStorage.setItem("points", points);

    // Save history
    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.push(
        "Withdraw Rs.50 via " +
        method +
        " - " +
        new Date().toLocaleString()
    );

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    updatePoints();
    loadHistory();

    // Your WhatsApp Number
    let adminNumber = "923001234567";

    let message =
        "Withdrawal Request\n\n" +
        "Method: " + method + "\n" +
        "Account: " + account + "\n" +
        "Amount: Rs.50\n" +
        "Remaining Points: " + points;

    let url =
        "https://wa.me/" +
        adminNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
}

// Load History
function loadHistory() {

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    let list = document.getElementById("history");

    if (!list) return;

    list.innerHTML = "";

    history.forEach(item => {

        let li = document.createElement("li");

        li.innerText = item;

        list.appendChild(li);
    });
}

// Reset Data
function resetPoints() {

    localStorage.clear();

    points = 0;

    updatePoints();
    loadHistory();

    alert("Data Reset Complete");
}
```
