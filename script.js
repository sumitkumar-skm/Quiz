const questions = [
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Processing Utility",
            "Central Program Unit",
            "Computer Personal Unit"
        ],
        answer: 0
    },

    {
        question: "Which data structure follows LIFO principle?",
        options: [
            "Queue",
            "Stack",
            "Linked List",
            "Array"
        ],
        answer: 1
    },

    {
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: [
            "Binary Search",
            "Dijkstra's Algorithm",
            "Bubble Sort",
            "DFS"
        ],
        answer: 1
    },

    {
        question: "Which language is primarily used for web page structure?",
        options: [
            "Python",
            "Java",
            "HTML",
            "C++"
        ],
        answer: 2
    },

    {
        question: "Which SQL command is used to retrieve data?",
        options: [
            "INSERT",
            "UPDATE",
            "SELECT",
            "DELETE"
        ],
        answer: 2
    },

    {
        question: "What is the time complexity of binary search?",
        options: [
            "O(n)",
            "O(log n)",
            "O(n²)",
            "O(1)"
        ],
        answer: 1
    },

    {
        question: "Which of the following is an operating system?",
        options: [
            "MySQL",
            "Linux",
            "Python",
            "HTML"
        ],
        answer: 1
    },

    {
        question: "Which protocol is commonly used to transfer web pages?",
        options: [
            "HTTP",
            "FTP",
            "SMTP",
            "SSH"
        ],
        answer: 0
    },

    {
        question: "Which machine learning algorithm is used for classification?",
        options: [
            "KNN",
            "K-Means",
            "PCA",
            "Apriori"
        ],
        answer: 0
    },

    {
        question: "Which traversal visits the root node before its subtrees?",
        options: [
            "Inorder",
            "Postorder",
            "Preorder",
            "Level order"
        ],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selected = false;
let timeLeft = 60;
let timer;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const timeElement = document.getElementById("time");

document.getElementById("total").textContent = questions.length;

function loadQuestion() {

    selected = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {

        const div = document.createElement("div");

        div.className = "option";

        div.textContent = option;

        div.onclick = () => selectOption(div, index);

        optionsElement.appendChild(div);
    });

    document.getElementById("current").textContent =
        currentQuestion + 1;

    const percentage =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("progress").style.width =
        percentage + "%";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Finish Quiz ✓"
        : "Next Question →";
}

function selectOption(element, index) {

    if (selected) return;

    selected = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(option => {
        option.style.pointerEvents = "none";
    });

    if (index === correctAnswer) {

        element.classList.add("correct");
        score++;

    } else {

        element.classList.add("wrong");

        allOptions[correctAnswer]
            .classList.add("correct");
    }

    nextButton.disabled = false;
}

function nextQuestion() {

    if (!selected) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
}

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timeElement.textContent = timeLeft;

        if (timeLeft <= 10) {
            timeElement.style.color = "red";
        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            showResult();
        }

    }, 1000);
}

function showResult() {

    clearInterval(timer);

    document.getElementById("quiz")
        .classList.add("hidden");

    document.querySelector(".progress-area")
        .classList.add("hidden");

    document.querySelector(".buttons")
        .classList.add("hidden");

    document.getElementById("result")
        .classList.remove("hidden");

    document.getElementById("score")
        .textContent = score;

    const message = document.getElementById("message");

    if (score >= 9) {
        message.textContent =
            "Excellent! You have strong CSE knowledge.";
    } else if (score >= 7) {
        message.textContent =
            "Great job! Keep improving your skills.";
    } else if (score >= 5) {
        message.textContent =
            "Good attempt! More practice will help.";
    } else {
        message.textContent =
            "Keep learning and try the quiz again!";
    }
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    selected = false;
    timeLeft = 60;

    timeElement.textContent = timeLeft;
    timeElement.style.color = "";

    document.getElementById("quiz")
        .classList.remove("hidden");

    document.querySelector(".progress-area")
        .classList.remove("hidden");

    document.querySelector(".buttons")
        .classList.remove("hidden");

    document.getElementById("result")
        .classList.add("hidden");

    loadQuestion();
    startTimer();
}

loadQuestion();
startTimer();