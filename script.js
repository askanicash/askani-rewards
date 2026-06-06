let points = Number(localStorage.getItem("points")) || 0;

document.getElementById("points").innerText = points;

function claimTask(taskId, reward) {

    const lastClick = localStorage.getItem(taskId);

    if (lastClick) {

        const diff = Date.now() - Number(lastClick);

        const hours = diff / (1000 * 60 * 60);

        if (hours < 12) {
            alert("You can claim this task again after 12 hours.");
            return;
        }
    }

    points += reward;

    localStorage.setItem("points", points);
    localStorage.setItem(taskId, Date.now());

    document.getElementById("points").innerText = points;

    alert("Congratulations! +" + reward + " points added.");
}

function withdrawRequest() {

    const account = document.getElementById("account").value;
    const method = document.getElementById("method").value;

    if (points < 100) {
        alert("Minimum 100 points required.");
        return;
    }

    if (account === "") {
        alert("Enter account number.");
        return;
    }

    alert(
        "Withdrawal Request Submitted\n\n" +
        "Method: " + method +
        "\nAccount: " + account +
        "\nPoints: " + points
    );
}
