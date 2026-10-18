const questionText = "Prerna, when are these cookies arriving at my place? 🍪";
const yesTexts = [
    "Sending them today! 🛵",
    "Fine, packing them now! 📦",
    "Ordering Dunzo/Genie right now! 🛵💨",
    "Dispatching the entire jar! 🍪😍",
    "I give up, you get ALL the cookies! 🥳"
];

const noTexts = [
    "Not yet 🙈",
    "Wait, what do you mean not yet?! 😭",
    "Look at that jar, they miss me already 🥺",
    "Are you eating them all yourself? 👀",
    "Just pack 3... okay 5... fine, the whole jar!",
    "Dunzo / Swiggy Genie is waiting outside right now 🛵",
    "They're gonna go lonely without me 🍪💔",
    "Don't make me drive over and rescue them!",
    "Bribe offer: I'll share 1 cookie with you? 🤝",
    "One cookie for evening chai. That's all I ask ☕",
    "Say no again and the Cookie Monster will cry 👹🍪",
    "Okay, you have no choice left now! 🍪❤️"
];

const successText = "🎉 WOOHOO! Best decision ever! 🍪";

const BANNER_URLS = {
    default: "https://media.tenor.com/e2ZILKKbZIkAAAAM/peach-goma.gif",
    no: [
        "https://media.tenor.com/yWS5eGG1qDwAAAAM/peach-goma-peach-and-goma.gif",
        "https://media.tenor.com/y3hYgTtY2WMAAAAM/peach-goma-peach-and-goma.gif",
        "https://media.tenor.com/5ii66gDBanIAAAAM/peach-goma.gif",
        "https://media.tenor.com/qqaSwbUrlJwAAAAM/peach.gif",
        "https://media.tenor.com/bE-uj0MlRToAAAAM/peach-goma-peach-and-goma.gif"
    ],
    yes: [
        "https://media.tenor.com/saJkA-UIuoYAAAAM/peach-goma.gif",
        "https://media.tenor.com/xH1eX6g_KrMAAAAM/goma-peach.gif",
        "https://media.tenor.com/7kEjcxcgkgEAAAAM/peach-goma-peach.gif"
    ]
};

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const question_heading = document.getElementById("question-heading");
const success_message = document.getElementById("success-message");
const whatsappShare = document.getElementById("whatsapp-share");
const etaButtons = document.querySelectorAll(".eta-btn");

let currentEta = "Today Evening 🛵";

function updateWhatsAppLink() {
    if (!whatsappShare) return;
    const msg = encodeURIComponent(`Hey Vishal! 🍪 The cookies are officially on their way to your place!\nETA: ${currentEta} 🛵💨`);
    whatsappShare.href = `https://api.whatsapp.com/send?text=${msg}`;
}

etaButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        etaButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        currentEta = btn.textContent.trim();
        updateWhatsAppLink();
    });
});

if (question_heading) question_heading.textContent = questionText;
if (success_message) success_message.textContent = successText;
if (yes_button) yes_button.textContent = yesTexts[0];
if (no_button) no_button.textContent = noTexts[0];
updateWhatsAppLink();

// Set initial banner
const banner = document.getElementById('banner');
if (banner) banner.src = BANNER_URLS.default;

let i = 1;
let size = 52;
let clicks = 0;

no_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    if (banner) {
        banner.src = pickRandom(BANNER_URLS.no);
        refreshBanner();
    }

    // Add dodge animation
    no_button.classList.remove('no-dodge');
    void no_button.offsetWidth; // Trigger reflow
    no_button.classList.add('no-dodge');

    // Quick random jump so button feels alive
    const jolt = (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 20);
    no_button.style.transform = `translateX(${jolt}px)`;
    setTimeout(() => { no_button.style.transform = ''; }, 200);

    clicks++;

    // Increase yes button size
    const growth = [6, 8, 10];
    size += growth[Math.floor(Math.random() * growth.length)];
    const maxSize = 95;
    const clampedSize = Math.min(size, maxSize);

    if (yes_button) {
        yes_button.style.minHeight = `${clampedSize}px`;
        yes_button.style.padding = `12px ${Math.min(clampedSize / 1.6, 45)}px`;
        yes_button.style.fontSize = `${Math.min(1.05 + (clicks * 0.05), 1.45)}rem`;
        
        // Cycle yes button text for extra persuasion
        const yesIndex = Math.min(clicks, yesTexts.length - 1);
        yes_button.textContent = yesTexts[yesIndex];
    }

    let total = noTexts.length;
    if (i < total) {
        if (no_button) no_button.textContent = noTexts[i];
        i++;
    }

    // Once all texts exhausted, enter flee mode
    if (i >= total) {
        activateFlee();
    }
});

yes_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    if (banner) {
        banner.src = pickRandom(BANNER_URLS.yes);
        refreshBanner();
    }

    // Update cookie polaroid caption
    const cookieCaption = document.querySelector('.cookie-caption');
    if (cookieCaption) {
        cookieCaption.textContent = "Status: En route to Vishal's place! 🚚💨";
        cookieCaption.style.color = "#27ae60";
        cookieCaption.style.fontWeight = "700";
    }

    // Confetti effect!
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 60,
                origin: { x: 0 },
                colors: ['#e17055', '#fdcb6e', '#ff7675', '#00b894', '#6c5ce7']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 60,
                origin: { x: 1 },
                colors: ['#e17055', '#fdcb6e', '#ff7675', '#00b894', '#6c5ce7']
            });
        }

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Hide buttons div and sub-heading
    let buttons = document.getElementsByClassName('buttons')[0];
    if (buttons) buttons.style.display = "none";
    let subHeading = document.getElementById('sub-heading');
    if (subHeading) subHeading.style.display = "none";

    // Show message div
    let message = document.getElementsByClassName('message')[0];
    if (message) message.style.display = "block";
});

function refreshBanner() {
    let banner = document.getElementById('banner');
    if (!banner) return;
    let src = banner.src.split('?')[0];
    banner.src = src + '?t=' + Date.now();
}

/* ── Flee mode: button dodges the cursor ── */
let fleeActive = false;

function activateFlee() {
    if (fleeActive) return;
    fleeActive = true;

    const rect = no_button.getBoundingClientRect();
    no_button.style.left = rect.left + 'px';
    no_button.style.top = rect.top + 'px';
    no_button.style.margin = '0';

    no_button.textContent = "🙈";
    no_button.classList.add('flee-mode');
    no_button.disabled = true;

    no_button.addEventListener('mouseenter', dodgeButton);
    no_button.addEventListener('touchstart', dodgeButton, { passive: true });
}

function dodgeButton() {
    const btnW = no_button.offsetWidth;
    const btnH = no_button.offsetHeight;
    const pad = 16;
    const maxX = window.innerWidth - btnW - pad;
    const maxY = window.innerHeight - btnH - pad;

    const newLeft = pad + Math.random() * (maxX - pad);
    const newTop = pad + Math.random() * (maxY - pad);

    no_button.style.left = newLeft + 'px';
    no_button.style.top = newTop + 'px';

    const scale = 0.85 + Math.random() * 0.2;
    no_button.style.transform = `scale(${scale})`;
    no_button.style.opacity = String(Math.max(0.5, 0.5 + Math.random() * 0.5));
}