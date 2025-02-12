// Start the quiz when the button is clicked
document.getElementById('startButton').addEventListener('click', startLoveQuiz);

// Play background music when the play button is clicked
document.getElementById('playMusicButton').addEventListener('click', function() {
    document.getElementById('backgroundMusic').play();
    this.style.display = 'none'; // Hide the play button after playing music
});

function startLoveQuiz() {
    let name1 = document.getElementById('name1').value;
    let name2 = document.getElementById('name2').value;

    if (name1 && name2) {
        // Hide the name input section and show the quiz
        document.getElementById('nameInputContainer').style.display = 'none';
        showHeartAnimation(); // Show falling hearts animation

        // Wait a moment, then start the quiz
        setTimeout(() => {
            startQuiz(name1, name2);
        }, 3000); // Wait for heart animation to finish
    } else {
        alert("Please enter both names!");
    }
}

function showHeartAnimation() {
    let heartContainer = document.getElementById('heartContainer');
    heartContainer.innerHTML = ''; // Clear previous hearts if any

    // Generate multiple falling hearts
    for (let i = 0; i < 15; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '💖';

        // Randomize the starting horizontal position
        let positionX = Math.random() * window.innerWidth;
        let duration = Math.random() * (8 - 5) + 5; // Random animation duration between 5s to 8s

        heart.style.left = `${positionX}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`; // Random delay for each heart's fall
        heartContainer.appendChild(heart);
    }
}

let currentQuestionIndex = 0;
let responses = [];

const questions = [
    "What is your favorite memory of us?",
    "What makes your partner smile every day?",
    "If we could have a perfect day together, what would we do?",
    "What's the most romantic thing we’ve done together?",
    "If we could dance under the stars, how would you feel?",
    "What do you love most about your partner?",
    "If we created our own love story, what would it be called?",
    "Where would you want to go for a romantic getaway?",
    "What's the best thing about being together?",
    "What does ‘forever’ with your partner look like?"
];

function startQuiz(name1, name2) {
    let quizContainer = document.getElementById('quizContainer');
    let quizQuestions = document.getElementById('quizQuestions');
    quizContainer.style.display = 'block';
    
    // Personalize the questions based on names
    quizQuestions.innerHTML = `<p>Hello ${name1} and ${name2}! Let's begin the Love Quiz:</p>`;
    showQuestion(name1, name2);
}

function showQuestion(name1, name2) {
    let quizQuestions = document.getElementById('quizQuestions');
    quizQuestions.innerHTML = `<p>${questions[currentQuestionIndex].replace("your partner", name2).replace("your partner's", name2 + "'s")}</p>`;

    document.getElementById('responseInput').value = '';
    document.getElementById('submitResponseButton').onclick = function() { handleResponse(name1, name2); };
}

function handleResponse(name1, name2) {
    let response = document.getElementById('responseInput').value;
    if (response) {
        responses.push(response);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion(name1, name2);
        } else {
            showFinalMessage(name1, name2);
            startCountdown(); // Start the countdown after the last question
        }
    }
}

function showFinalMessage(name1, name2) {
    let finalMessage = document.getElementById('finalMessage');
    finalMessage.style.display = 'block';
    finalMessage.innerHTML = `
        <p>I Every moment spent with you feels like a never-ending Valentine’s Day, where love blooms endlessly, hearts beat in harmony, and every glance, touch, and whisper is a reminder of how deeply I cherish you. 💕 ❤</p>
        <p>Here are my promises to you, my love:</p>
        <ul>
            <li>💖 I promise to always respect you, ${name2}.</li>
            <li>💖 I promise to stand by your side through every joy and challenge, ${name2}.</li>
            <li>💖 I promise to make you laugh, even on the toughest days, ${name2}.</li>
            <li>💖 I promise to always support your dreams and aspirations, ${name2}.</li>
            <li>💖 I promise to love you endlessly, today, tomorrow, and forever, ${name2}.</li>
        </ul>
    `;
}

function startCountdown() {
    let countdown = document.getElementById('countdown');
    countdown.style.display = 'flex';
    countdown.innerHTML = '<p>3</p>';
    setTimeout(() => {
        countdown.innerHTML = '<p>2</p>';
        setTimeout(() => {
            countdown.innerHTML = '<p>1</p>';
            setTimeout(() => {
                countdown.innerHTML = '<p>The Journey of Gitesh and Riddhima</p>';
                setTimeout(() => {
                    countdown.style.display = 'none';
                    playVideo();
                }, 2000);
            }, 1000);
        }, 1000);
    }, 1000);
}

function playVideo() {
    let video = document.getElementById('journeyVideo');
    video.style.display = 'block';
    video.play();
}

// Attempt to play music on page load
window.addEventListener('load', function() {
    let audio = document.getElementById('backgroundMusic');
    let playButton = document.getElementById('playMusicButton');

    // Try to play the audio
    let playPromise = audio.play();

    // If the play promise is rejected, show the play button
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            playButton.style.display = 'block';
        });
    }
});
