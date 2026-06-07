body{
    margin:0;
    padding:0;
    background:#0f172a;
    font-family:Arial,sans-serif;
    color:white;
}

.container{
    width:90%;
    max-width:700px;
    margin:auto;
    padding-bottom:100px;
}

h1{
    text-align:center;
}

.card{
    background:#111827;
    padding:15px;
    margin-top:15px;
    border-radius:12px;
}

button{
    width:100%;
    padding:12px;
    margin-top:10px;
    border:none;
    border-radius:8px;
    background:#16a34a;
    color:white;
    font-size:16px;
}

button:hover{
    opacity:0.9;
}

input,
select{
    width:100%;
    padding:12px;
    margin-top:10px;
    border-radius:8px;
    border:none;
    box-sizing:border-box;
}

.top-banner{
    background:#1e293b;
    text-align:center;
    padding:15px;
    font-weight:bold;
}

.bottom-banner{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#1e293b;
    text-align:center;
    padding:15px;
    font-weight:bold;
}

.note{
    margin-top:10px;
    font-size:14px;
    color:#cbd5e1;
}    });
}

function resetPoints() {
    localStorage.clear();
    points = 0;
    updatePoints();
    loadHistory();
    alert("Data Reset Complete");
}        return;
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
