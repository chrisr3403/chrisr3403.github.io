let ownerName = "Your Name"; // update the part BETWEEN the "quotes"
let userName = "YourUsername"; // same here

document.querySelectorAll(".owner-name").forEach((e) => {
    e.innerHTML = ownerName;
});

document.querySelector("#github").href = "http://github.com/" + chrisr3403;
document.querySelector("#fork").href = "http://github.com/" + chrisr3403 + "/" + chrisr3403 + ".github.io";
