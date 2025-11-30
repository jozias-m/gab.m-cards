// Jozias Mijova (c) 2025
// Elements
const beemLink = document.getElementById("beemLink");
const modal = document.getElementById("beemModal");
const closeModal = document.querySelector(".close");
const nextBtn = document.getElementById("beemNextBtn");
const amountInput = document.getElementById("amountInput");
const otherSiteLink = document.getElementById("otherSiteLink");
let otherSiteLinkClicksGoal;

if (otherSiteLinkClicksGoal == null) {
    otherSiteLinkClicksGoal = 100;
}
let otherSiteLinkClicks = localStorage.getItem("otherSiteLinkClicks");
if (otherSiteLinkClicks == null) {
    otherSiteLinkClicks = 0;
    localStorage.setItem("otherSiteLinkClicks", 0);
}

otherSiteLink.addEventListener("click", () => {
    otherSiteLinkClicks++;
    localStorage.setItem("otherSiteLinkClicks", otherSiteLinkClicks);
    checkOtherSiteLinkClicks();
});
function checkOtherSiteLinkClicks() {
    otherSiteLinkClicks = localStorage.getItem("otherSiteLinkClicks");
    if(otherSiteLinkClicks > otherSiteLinkClicksGoal) {
        window.location.href = "./somethingSpecial.html";
        otherSiteLinkClicks = 0;
        otherSiteLinkClicksGoal = Math.floor(Math.random() * 100);
    }
    localStorage.setItem("otherSiteLinkClicks", otherSiteLinkClicks);
}

// Open modal when clicking the Beem link
beemLink.addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "block";
});

// Close modal
closeModal.onclick = () => modal.style.display = "none";

// Close if clicking outside popup
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// Redirect when clicking NEXT
nextBtn.addEventListener("click", () => {
    let dollars = parseFloat(amountInput.value);
    if (isNaN(dollars) || dollars <= 0) {
        // alert("Please enter a valid amount.");
        // return;
        dollars = 5.00;
    }

    // Convert to cents
    let cents = Math.round(dollars * 100);

    // Build the final payment URL
    let url = `https://www.beemit.com.au/app/pay?source=payment-link&amount=${cents}&description=donation&handle=gabglo`;

    // Redirect in a new tab
    if(confirm("You're about to be redirected to Beem")) {
        window.open(url, "_blank");
    }
});
