
unko **poori tarah delete** kar do.

Ya sabse aasaan tareeqa:

**Poora `script.js` delete karo aur is clean version ko paste karo:**

```javascript
let points = Number(localStorage.getItem("points")) || 0;

window.onload = function () {
    updatePoints();
    loadHistory();
};

function updatePoints() {
    const el = document.getElementById("points");

    if (el) {
        el.innerText = points;
    }

    let progress = Math.min((points / 100) * 100, 100);

    let bar = document.getElementById("progress-bar");
    let text = document.getElementById("progress-text");

    if (bar) {
        bar.style.width = progress + "%";
    }

    if (text) {
        text.innerText = points + " / 100 Points";
    }
}

function claimTask(taskId, reward) {
    let lastClaim = localStorage.getItem(taskId);

    if (lastClaim) {
        let diff = Date.now() - Number(lastClaim);
        let hours = diff / (1000 * 60 * 60);

        if (hours < 5) {
            let remaining = (5 - hours).toFixed(1);

            alert(
                "Task already claimed!\n\nWait " +
                remaining +
                " hours."
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

function claimDailyBonus() {
    let lastBonus = localStorage.getItem("dailyBonus");

    if (lastBonus) {
        let diff = Date.now() - Number(lastBonus);
        let hours = diff / (1000 * 60 * 60);

        if (hours < 24) {
            let remain = (24 - hours).toFixed(1);

            alert(
                "Come back after " +
                remain +
                " hours."
            );
            return;
        }
    }

    points += 10;

    localStorage.setItem("points", points);
    localStorage.setItem("dailyBonus", Date.now());

    updatePoints();

    alert("+10 Daily Bonus Added");
}

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

    let history =
        JSON.parse(localStorage.getItem("history")) || [];

    history.unshift(
        method + " - " + account + " - Rs.50"
    );

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    updatePoints();
    loadHistory();

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

function resetPoints() {
    localStorage.clear();

    points = 0;

    updatePoints();
    loadHistory();

    alert("Data Reset Complete");
}
