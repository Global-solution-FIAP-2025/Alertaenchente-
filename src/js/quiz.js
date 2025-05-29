// Variáveis globais
let currentQuestionIndex = 0
let score = 0
let selectedAnswer = null

// Dados do quiz
const quizQuestions = [
  {
    question: "Qual é a principal causa das enchentes urbanas?",
    answers: [
      "Impermeabilização excessiva do solo",
      "Falta de árvores na cidade",
      "Excesso de carros nas ruas",
      "Poluição do ar",
    ],
    correct: 0,
  },
  {
    question: "O que fazer ao avistar uma enchente se aproximando?",
    answers: [
      "Tentar atravessar rapidamente",
      "Procurar abrigo em local alto e seguro",
      "Ficar parado no mesmo lugar",
      "Entrar no carro e dirigir",
    ],
    correct: 1,
  },
  {
    question: "Qual profundidade de água já é perigosa para pedestres?",
    answers: ["10 centímetros", "30 centímetros", "50 centímetros", "1 metro"],
    correct: 0,
  },
  {
    question: "Qual é o número da Defesa Civil para emergências?",
    answers: ["190", "192", "193", "199"],
    correct: 3,
  },
  {
    question: "O que NÃO deve ser feito durante uma enchente?",
    answers: [
      "Manter-se informado pelos meios de comunicação",
      "Andar ou dirigir em áreas alagadas",
      "Procurar locais altos",
      "Ter um kit de emergência",
    ],
    correct: 1,
  },
  {
    question: "Qual item é essencial em um kit de emergência para enchentes?",
    answers: ["Televisão portátil", "Lanterna e pilhas", "Livros", "Roupas de festa"],
    correct: 1,
  },
  {
    question: "Como as áreas urbanas podem reduzir o risco de enchentes?",
    answers: [
      "Construindo mais prédios",
      "Criando áreas verdes e permeáveis",
      "Aumentando o tráfego de veículos",
      "Removendo todas as árvores",
    ],
    correct: 1,
  },
  {
    question: "Qual é o melhor momento para evacuar uma área em risco?",
    answers: [
      "Quando a água já chegou",
      "Apenas quando as autoridades ordenarem",
      "Assim que receber o alerta preventivo",
      "Nunca é necessário evacuar",
    ],
    correct: 2,
  },
  {
    question: "O que significa um alerta de nível 'crítico' para enchentes?",
    answers: [
      "Situação normal, sem riscos",
      "Risco baixo, apenas monitoramento",
      "Risco iminente, evacuação necessária",
      "Previsão de chuva leve",
    ],
    correct: 2,
  },
  {
    question: "Qual é a importância dos sistemas de drenagem urbana?",
    answers: [
      "Apenas para estética da cidade",
      "Escoar água da chuva e prevenir alagamentos",
      "Fornecer água potável",
      "Decorar as ruas",
    ],
    correct: 1,
  },
]

// Inicializa o quiz ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  initializeQuiz()
})

// Funções do quiz
function initializeQuiz() {
  loadQuestion()
}

function loadQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    showQuizResults()
    return
  }

  const question = quizQuestions[currentQuestionIndex]
  const questionText = document.getElementById("questionText")
  const answersContainer = document.getElementById("answersContainer")
  const currentQuestionSpan = document.getElementById("currentQuestion")
  const totalQuestionsSpan = document.getElementById("totalQuestions")
  const progressFill = document.getElementById("progressFill")
  const nextBtn = document.getElementById("nextBtn")

  if (!questionText || !answersContainer) return

  questionText.textContent = question.question
  if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1
  if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizQuestions.length

  if (progressFill) {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100
    progressFill.style.width = progress + "%"
  }

  answersContainer.innerHTML = ""
  selectedAnswer = null
  if (nextBtn) nextBtn.disabled = true

  question.answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div")
    answerDiv.className = "answer-option"
    answerDiv.innerHTML = `
      <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
      <span>${answer}</span>
    `
    answerDiv.addEventListener("click", () => selectAnswer(index, answerDiv))
    answersContainer.appendChild(answerDiv)
  })
}

function selectAnswer(answerIndex, answerElement) {
  document.querySelectorAll(".answer-option").forEach((option) => {
    option.classList.remove("selected")
  })

  answerElement.classList.add("selected")
  selectedAnswer = answerIndex

  const nextBtn = document.getElementById("nextBtn")
  if (nextBtn) nextBtn.disabled = false
}

function nextQuestion() {
  if (selectedAnswer === null) return

  const question = quizQuestions[currentQuestionIndex]
  const answerOptions = document.querySelectorAll(".answer-option")

  answerOptions.forEach((option, index) => {
    if (index === question.correct) {
      option.classList.add("correct")
    } else if (index === selectedAnswer && index !== question.correct) {
      option.classList.add("incorrect")
    }
  })

  if (selectedAnswer === question.correct) {
    score++
    const currentScore = document.getElementById("currentScore")
    if (currentScore) currentScore.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++
    loadQuestion()
  }, 1500)
}

function showQuizResults() {
  const quizContainer = document.getElementById("quizContainer")
  const quizResults = document.getElementById("quizResults")
  const finalScore = document.getElementById("finalScore")
  const scoreMessage = document.getElementById("scoreMessage")

  if (quizContainer) quizContainer.style.display = "none"
  if (quizResults) quizResults.style.display = "block"
  if (finalScore) finalScore.textContent = score

  let message = ""
  let messageClass = ""

  if (score >= 9) {
    message = "Excelente! Você está muito bem preparado para situações de enchente."
    messageClass = "excellent"
  } else if (score >= 7) {
    message = "Bom trabalho! Você tem um bom conhecimento sobre prevenção de enchentes."
    messageClass = "good"
  } else if (score >= 5) {
    message = "Razoável. Recomendamos estudar mais sobre prevenção de enchentes."
    messageClass = "average"
  } else {
    message = "É importante aprender mais sobre prevenção de enchentes para sua segurança."
    messageClass = "average"
  }

  if (scoreMessage) {
    scoreMessage.textContent = message
    scoreMessage.className = `score-message ${messageClass}`
  }
}

function restartQuiz() {
  currentQuestionIndex = 0
  score = 0
  selectedAnswer = null

  const currentScore = document.getElementById("currentScore")
  const quizContainer = document.getElementById("quizContainer")
  const quizResults = document.getElementById("quizResults")

  if (currentScore) currentScore.textContent = "0"
  if (quizContainer) quizContainer.style.display = "block"
  if (quizResults) quizResults.style.display = "none"

  loadQuestion()
}

function changeTheme(theme) {
  document.body.className = `theme-${theme}`
  alert(`Tema alterado para ${theme}`)
}
