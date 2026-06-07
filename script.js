// =======================
// DAILY CASH EARN SCRIPT
// =======================

// Load saved points
let points = Number(localStorage.getItem("points")) || 0;

// Page Load
window.onload = function () {
    updatePoints();
    loadHistory();
};

// Update Points
function updatePoints() {
    const pointsEl = document.getElementById("points");

    if (pointsEl) {
        pointsEl.innerText = points;
    }
}

// Open Task + Reward + 5 Hour Cooldown
function openTask(taskId, reward, link) {

    let lastClaim = localStorage.getItem(taskId);

    if (lastClaim) {

        let diff = Date.now() - Number(lastClaim);
        let hours = diff / (1000 * 60 * 60);

        if (hours < 5) {

            let remaining = (5 - hours).toFixed(1);

            alert(
                "Task already claimed.\n\n" +
                "Wait " + remaining + " hours."
            );

            return;
        }
    }

    // Open Link
    window.open(link, "_blank");

    // Add Points
    points += reward;

    localStorage.setItem("points", points);
    localStorage.setItem(taskId, Date.now());

    updatePoints();

    alert("+" + reward + " Points Added");
}

// Withdrawal Request
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

    points -= 100;

    localStorage.setItem("points", points);

    // Save History
    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.push(
        "Rs.50 Withdraw | " +
        method +
        " | " +
        account +
        " | " +
        new Date().toLocaleString()
    );

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    updatePoints();
    loadHistory();

    // WhatsApp Number
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

// Load Withdrawal History
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

    alert("All Data Reset");
}
