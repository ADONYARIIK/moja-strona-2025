document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        const maxScroll = 150;

        const progress = Math.min(scrollY / maxScroll, 1);

        const scale = 1 - 0.5 * progress;
        const translateY = -300 * progress;
        const opacity = 1 - progress;

        header.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        header.style.opacity = opacity;
    });

    const headerTextElements = document.querySelectorAll('.typewriter-header');

    function typeSequentially(elements, speed, i = 0) {
        if (i >= elements.length) return;

        const el = elements[i];
        const text = el.dataset.text;
        let index = 0;
        el.textContent = '';

        const interval = setInterval(() => {
            el.textContent += text.charAt(index);
            index++;
            if (index >= text.length) {
                clearInterval(interval);
                el.style.borderRight = 'none';
                typeSequentially(elements, speed, i + 1);
            }
        }, speed);
    }

    typeSequentially(headerTextElements, 70);

    function typeSequentiallyOnceInView(elements, speed = 40) {
        let index = 0;

        function typeNext() {
            if (index >= elements.length) return;
            const el = elements[index];
            const text = el.dataset.text;
            el.classList.remove('hiddenText');
            el.classList.add('visibleText');
            el.textContent = '';
            let charIndex = 0;

            const interval = setInterval(() => {
                el.textContent += text.charAt(charIndex);
                charIndex++;
                if (charIndex >= text.length) {
                    clearInterval(interval);
                    el.style.borderRight = 'none';
                    index++;
                    typeNext();
                }
            }, speed);
        }

        return typeNext;
    }

    const mainTextElements = Array.from(document.querySelectorAll('.typewriter.hiddenText'));
    const typeNextInMain = typeSequentiallyOnceInView(mainTextElements);

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                obs.disconnect();
                typeNextInMain();
            }
        });
    }, {
        threshold: 0.1
    });

    if (mainTextElements.length) {
        observer.observe(mainTextElements[0]);
    }


    const quizData = [
        {
            question: "Co to jest DNS?",
            options: ["Program do przeglądania internetu", "System tłumaczący nazwy domen na adresy IP", "Rodzaj zapory sieciowej"],
            answer: "System tłumaczący nazwy domen na adresy IP"
        },
        {
            question: "Jakie są główne elementy systemu DNS?",
            options: ["Domena", "Adres IP", "Serwer DNS", "Wszystkie powyższe"],
            answer: "Wszystkie powyższe"
        },
        {
            question: "Który rekord DNS tłumaczy domenę na adres IPv4?",
            options: ["MX", "CNAME", "A"],
            answer: "A"
        },
        {
            question: "Jakie są przykłady publicznych serwerów DNS?",
            options: ["Google: 8.8.8.8, Cloudflare: 1.1.1.1", "Facebook: 5.5.5.5, Twitter: 9.9.9.9", "Netflix: 4.4.4.4, YouTube: 2.2.2.2"],
            answer: "Google: 8.8.8.8, Cloudflare: 1.1.1.1"
        },
        {
            question: "Co robi resolver DNS?",
            options: ["Przechowuje dane DNS", "Tłumaczy nazwy domen na adresy IP", "Zarządza serwerami DNS"],
            answer: "Tłumaczy nazwy domen na adresy IP"
        },
        {
            question: "Czym jest DNSSEC?",
            options: ["Rozszerzenie zabezpieczające DNS", "Protokół szyfrujący transmisję mailową", "Typ rekordu DNS"],
            answer: "Rozszerzenie zabezpieczające DNS"
        }
    ];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const quiz = document.getElementById("quiz");

    let currentQuestion = 0;
    let score = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showQuestion() {
        const question = quizData[currentQuestion];
        questionElement.innerText = question.question;

        optionsElement.innerHTML = "";

        const shuffledOptions = [...question.options];
        shuffleArray(shuffledOptions);

        shuffledOptions.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            optionsElement.appendChild(button);
            button.addEventListener("click", selectAnswer);
        });
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const answer = quizData[currentQuestion].answer;

        if (selectedButton.innerText === answer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quiz.innerHTML = `
                <h1>Quiz ukończony!</h1>
                <p>Twój wynik: ${score}/${quizData.length}</p>
                <div class="congrats">
                    <span>🎉</span><span>B</span><span>r</span><span>a</span><span>w</span><span>o</span><span>!</span>
                </div>
            `;
        confetti({
            particleCount: 2500,
            spread: 200,
            origin: { y: 0.5 },
            colors: ['#FDEAE0', '#A57DB6', '#3A2546']
        });
    }

    shuffleArray(quizData);
    showQuestion();


    const startQuizButton = document.getElementById("start-quiz");
    startQuizButton.addEventListener("click", () => {
        quiz.classList.add("active");
        startQuizButton.classList.add("hidden");
    });
});