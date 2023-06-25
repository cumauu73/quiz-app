//timer code
//when i click the start quiz time start 50 seconds--
//display at the class timer time:
//when ist zero show timeis up
//show high score
//show start again


//score code
//when its correct +2
//when its wrong -1



//questions here
//and choices with answers




//quiz code
// Quiz questions and answers
// Quiz questions and answers
// Quiz questions and answers
// Quiz questions and answers
const questions = [
    {
      question: "Question 1",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 2
    },
    {
      question: "Question 2",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 1
    },
    // Add more questions here
  ];
  
  // Global variables
  const startButton = document.getElementById("start");
  const quizContainer = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const gameOverElement = document.getElementById("game-over");
  const scoreElement = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const saveScoreButton = document.getElementById("save-score");
  const playAgainButton = document.getElementById("play-again-button");
  const timeLeftElement = document.getElementById("time-left");
  
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let timerInterval;
  let score = 0;
  
  // Event listener for start button
  startButton.addEventListener("click", startQuiz);
  
  // Event listener for choice buttons
  choicesElement.addEventListener("click", selectAnswer);
  
  // Event listener for save score button
  saveScoreButton.addEventListener("click", saveScore);
  
  // Event listener for play again button
  playAgainButton.addEventListener("click", resetQuiz);
  
  // Starts the quiz
  function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    timerInterval = setInterval(updateTime, 1000);
    updateTime();
    showQuestion();
  }
  
  // Displays a question and its choices
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
  
    choicesElement.innerHTML = "";
    question.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.setAttribute("class", "choice");
      choiceButton.textContent = choice;
      choicesElement.appendChild(document.createElement("li").appendChild(choiceButton));
    });
  }
  
  // Handles the selection of an answer
  function selectAnswer(event) {
    const selectedButton = event.target;
    if (!selectedButton.classList.contains("choice")) {
      return;
    }
  
    const question = questions[currentQuestionIndex];
    const selectedAnswer = Array.from(choicesElement.children).indexOf(selectedButton);
  
    if (selectedAnswer === question.correctAnswer) {
      score++;
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timeLeftElement.textContent = timeLeft;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  // Ends the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    gameOverElement.style.display = "block";
    scoreElement.textContent = score;
    playAgainButton.style.display = "block";
  }
  
  // Resets the quiz
  function resetQuiz() {
    gameOverElement.style.display = "none";
    playAgainButton.style.display = "none";
    startButton.style.display = "block";
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
  }
  
  // Saves the score
  function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      // Handle saving the initials and score, e.g., send them to a server or save in local storage
      alert("Score saved!");
    }
  }
  
  // Updates the timer
  function updateTime() {
    timeLeftElement.textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    } else {
      timeLeft--;
    }
  }