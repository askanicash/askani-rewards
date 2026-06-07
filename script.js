function withdrawRequest(){

    let method = document.getElementById("method").value;
    let account = document.getElementById("account").value;

    if(account.trim() === ""){
        alert("Enter account details");
        return;
    }

    if(points < 100){
        alert("Minimum 100 points required");
        return;
    }

    points -= 100;

    localStorage.setItem("points", points);

    document.getElementById("points").innerText = points;

    let adminNumber = "923001234567"; // apna WhatsApp number

    let message =
        "Withdrawal Request%0A%0A" +
        "Method: " + method + "%0A" +
        "Account: " + account + "%0A" +
        "Amount: Rs.50";

    window.open(
        "https://wa.me/" +
        adminNumber +
        "?text=" +
        message,
        "_blank"
    );
}
