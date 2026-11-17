const music = document.getElementById("birthdayMusic");

music.play();
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

const confettiContainer = document.getElementById("confetti");

const colors = [
    "#ff8fab",
    "#ffc2d1",
    "#d8b4fe",
    "#fde68a",
    "#a7f3d0",
    "#ffffff"
];

const shapes = ["square", "rectangle", "circle"];

for (let i = 0; i < 65; i++) {

    const confetti = document.createElement("span");

    const randomColor = colors[
        Math.floor(Math.random() * colors.length)
    ];

    const randomShape = shapes[
        Math.floor(Math.random() * shapes.length)
    ];

    const randomLeft = Math.random() * 100;
    const randomDuration = 5 + Math.random() * 8;
    const randomDelay = Math.random() * -12;

    confetti.classList.add("confetti", randomShape);

    confetti.style.left = randomLeft + "%";
    confetti.style.backgroundColor = randomColor;
    confetti.style.animationDuration = randomDuration + "s";
    confetti.style.animationDelay = randomDelay + "s";

    confettiContainer.appendChild(confetti);
}

const birthdayDate = new Date("2027-01-01T00:00:00+05:00").getTime();

const countdown = setInterval(() => {

    const now = new Date().getTime();
    const distance = birthdayDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        `${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "Website khul chuki hai ap dekh skti ho.";
    }

}, 1000);


const lockedContent = document.getElementById("lockedContent");

function checkUnlock() {
    if (Date.now() >= birthdayDate) {
        lockedContent.classList.remove("hidden");
    }
}

checkUnlock();

const giftBox = document.getElementById("giftBox");

const giftUnlockTime = new Date(
    "2027-01-01T00:00:00+05:00"
).getTime();

let giftOpened = false;

// Check whether the gift is unlocked
function checkGiftUnlock() {

    if (Date.now() >= giftUnlockTime) {
        giftBox.classList.remove("locked");
    } else {
        giftBox.classList.add("locked");
    }

}

// Check every second
checkGiftUnlock();
setInterval(checkGiftUnlock, 1000);

// Gift click interaction
function openGift() {

    if (Date.now() < giftUnlockTime) {
        alert("Sabar karo please");
        return;
    }

    if (!giftOpened) {
        giftBox.classList.add("khul raha hai");
        giftOpened = true;
    }

}

// Mouse click
giftBox.addEventListener("click", openGift);

// Keyboard support
giftBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGift();
    }
});

// document.getElementById("lockedContent").classList.remove("hidden");


const candles = document.querySelectorAll(".candle");
const wishMessage = document.getElementById("wishMessage");
const cake = document.getElementById("cake");
const fireworks = document.getElementById("fireworks");

let blownCandles = 0;
let celebrationStarted = false;

candles.forEach((candle) => {
    candle.addEventListener("click", () => {

        // Prevent blowing out the same candle twice
        if (candle.classList.contains("blown")) {
            return;
        }

        // Extinguish the flame
        candle.classList.add("blown");

        blownCandles++;

        // Check whether all seven candles are out
        if (blownCandles === 7) {
            wishMessage.textContent =
                "happy new year aur Happy 18th birthday emannn congratulations";

            startCelebration();

        } else {
            wishMessage.textContent =
                `${7 - blownCandles} candles rehti hain. baki bhi blow kro`;
        }
    });
});

function startCelebration() {

    document.getElementById("birthdayPopup").classList.add("show");

    if (celebrationStarted) return;
    celebrationStarted = true;

    // Animate birthday message
    wishMessage.classList.add("celebration-message");

    // Bounce the cake
    cake.classList.add("celebrate");

    // Start fireworks
    launchFireworks();
    
}

document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("birthdayPopup").classList.remove("show");
});


function launchFireworks() {

    const colors = [
        "#E9A5B5",
        "#F5CF8E",
        "#C8A6E8",
        "#FFFFFF",
        "#D989A0",
        "#FFD6E0",
        "#F9A8D4"
    ];

    // Create 15 fireworks
    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            const burst = document.createElement("div");
            burst.classList.add("firework-burst");

            burst.style.left = `${8 + Math.random() * 84}%`;
            burst.style.top = `${12 + Math.random() * 60}%`;

            // Create 32 particles per firework
            for (let j = 0; j < 32; j++) {

                const particle = document.createElement("span");
                particle.classList.add("firework-particle");

                particle.style.setProperty(
                    "--angle",
                    `${j * (360 / 32)}deg`
                );

                particle.style.setProperty(
                    "--distance",
                    `${75 + Math.random() * 100}px`
                );

                particle.style.background =
                    colors[Math.floor(Math.random() * colors.length)];

                burst.appendChild(particle);
            }

            fireworks.appendChild(burst);

            setTimeout(() => {
                burst.remove();
            }, 1800);

        }, i * 300);
    }
}


// SECTION 3 — LETTER OPENING

const envelopeScene = document.getElementById("envelopeScene");
const openLetter = document.getElementById("openLetter");
const closeLetter = document.getElementById("closeLetter");
const letterCard = document.getElementById("letterCard");
const envelopeHint = document.getElementById("envelopeHint");

let letterOpened = false;
let letterTimer;

openLetter.addEventListener("click", () => {

    if (letterOpened) return;

    letterOpened = true;

    // Open the envelope
    envelopeScene.classList.add("opened");

    openLetter.setAttribute("aria-expanded", "true");

    envelopeHint.textContent = "Your letter is opening...";

    // Let the paper slide out before revealing the full letter
    letterTimer = setTimeout(() => {

        letterCard.classList.add("visible");
        letterCard.setAttribute("aria-hidden", "false");

        closeLetter.focus();

    }, 1300);

});


// CLOSE LETTER

closeLetter.addEventListener("click", () => {

    clearTimeout(letterTimer);

    letterCard.classList.remove("visible");
    letterCard.setAttribute("aria-hidden", "true");

    setTimeout(() => {
        envelopeScene.classList.remove("opened");
    }, 250);

    openLetter.setAttribute("aria-expanded", "false");

    letterOpened = false;

    envelopeHint.textContent = "Take your time..";

    openLetter.focus();

});




