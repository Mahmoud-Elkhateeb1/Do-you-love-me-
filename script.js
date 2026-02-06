const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you sad?",
    "Think carefully please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Just kidding, say yes please! ❤️",
    "Ok fine, I will stop asking...",

];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

document.addEventListener('DOMContentLoaded', function() {
    var audios = document.querySelectorAll('audio');
    if (!audios || audios.length === 0) return;
    audios.forEach(function(audio) {
        audio.muted = true; // allow autoplay in most browsers
        var playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Try to unmute after a short delay; some browsers still require user gesture
                setTimeout(function() {
                    try {
                        audio.muted = false;
                        audio.volume = 0.6;
                        var p2 = audio.play();
                        if (p2 && p2.catch) {
                            p2.catch(function() { showAudioFallback(audio); });
                        }
                    } catch (e) {
                        showAudioFallback(audio);
                    }
                }, 600);
            }).catch(function() {
                showAudioFallback(audio);
            });
        }
    });
});

function showAudioFallback(audio) {
    if (document.getElementById('audio-play-button')) return;
    var btn = document.createElement('button');
    btn.id = 'audio-play-button';
    btn.textContent = 'Play Music';
    btn.style.position = 'fixed';
    btn.style.right = '16px';
    btn.style.bottom = '16px';
    btn.style.padding = '10px 14px';
    btn.style.backgroundColor = '#d32f2f';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '9999';
    btn.addEventListener('click', function() {
        audio.play().then(function() { btn.remove(); }).catch(function() {});
    });
    document.body.appendChild(btn);
}