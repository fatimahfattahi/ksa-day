document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const startPage = document.getElementById("startPage");
    const quizPage = document.getElementById("quizPage");
    const resultPage = document.getElementById("resultPage");
    const questionText = document.getElementById("questionText");
    const optionButtons = document.querySelectorAll(".option");
    const resultText = document.getElementById("resultText");
    const nextQuestionBtn = document.getElementById("nextQuestion");

   
    const correctSound = new Audio("correct.mp3");
    const wrongSound = new Audio("wrong.mp3");

    const questions = [
        { question: "متى تأسست الدولة السعودية؟", answers: ["1727", "1750"], correct: 0 },
        { question: "من هو مؤسس الدولة السعودية الأولى؟", answers: ["محمد بن سعود", "عبد العزيز بن سعود"], correct: 0 },
        { question: "ما هو شعار يوم التأسيس؟", answers: ["يوم بدينا", "همة حتى القمة"], correct: 0 }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionButtons[0].textContent = q.answers[0];
        optionButtons[1].textContent = q.answers[1];

        
        optionButtons.forEach(button => {
            button.classList.remove("correct", "wrong");
        });

        optionButtons[0].setAttribute("data-correct", q.correct === 0);
        optionButtons[1].setAttribute("data-correct", q.correct === 1);
    }

    startBtn.addEventListener("click", function() {
        startPage.classList.add("hidden");
        quizPage.classList.remove("hidden");
        loadQuestion();
    });

    optionButtons.forEach(button => {
        button.addEventListener("click", function() {
            const isCorrect = this.getAttribute("data-correct") === "true";

            if (isCorrect) {
                this.classList.add("correct");
                resultText.textContent = "يا سلام عليك!";
                correctSound.play();  
            } else {
                this.classList.add("wrong");
                resultText.textContent = "افا عليك متاكد انك سعودي !";
                wrongSound.currentTime = 0; 
                wrongSound.play();  
            }

            setTimeout(() => {
                quizPage.classList.add("hidden");
                resultPage.classList.remove("hidden");
            }, 1000);
        });
    });

    nextQuestionBtn.addEventListener("click", function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
            quizPage.classList.remove("hidden");
            resultPage.classList.add("hidden");
        } else {
            resultText.textContent = " “وصلنا للنهاية، لكن الفخر بالسعودية ما له نهاية! شكراً لمشاركتك، ودام عز الوطن!”";
            nextQuestionBtn.style.display = "none";
        }
    });
});