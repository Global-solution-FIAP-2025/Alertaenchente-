// Global variables
let currentRiskLevel = "alto"
let currentSlide = 0
let slideInterval
let currentQuestionIndex = 0
let score = 0
let selectedAnswer = null

// Vamos atualizar o array de regiões para incluir mais áreas monitoradas
const regions = [
  { name: "Centro", risk: "medio", rain: "12.5mm/h", population: "45k" },
  { name: "Zona Norte", risk: "alto", rain: "18.2mm/h", population: "78k" },
  { name: "Zona Sul", risk: "baixo", rain: "5.8mm/h", population: "32k" },
  { name: "Zona Leste", risk: "critico", rain: "25.1mm/h", population: "92k" },
  { name: "Zona Oeste", risk: "medio", rain: "14.7mm/h", population: "56k" },
  { name: "Periferia Norte", risk: "alto", rain: "19.3mm/h", population: "34k" },
  { name: "Periferia Sul", risk: "baixo", rain: "7.2mm/h", population: "28k" },
  { name: "Industrial", risk: "medio", rain: "11.9mm/h", population: "15k" },
  { name: "Ribeirinha", risk: "critico", rain: "22.7mm/h", population: "23k" },
  { name: "Vale Central", risk: "alto", rain: "17.8mm/h", population: "41k" },
  { name: "Região Portuária", risk: "medio", rain: "13.5mm/h", population: "19k" },
  { name: "Distrito Comercial", risk: "baixo", rain: "8.3mm/h", population: "12k" },
  { name: "Área Rural Norte", risk: "medio", rain: "15.2mm/h", population: "8k" },
  { name: "Área Rural Sul", risk: "baixo", rain: "6.9mm/h", population: "7k" },
  { name: "Região Metropolitana", risk: "alto", rain: "16.4mm/h", population: "63k" },
  { name: "Região Costeira", risk: "critico", rain: "24.3mm/h", population: "37k" },
]

const events = [
  {
    time: "14:30",
    type: "danger",
    title: "Alerta Crítico - Zona Leste",
    description: "Nível do rio atingiu 3.2m. Evacuação recomendada.",
  },
  {
    time: "13:45",
    type: "warning",
    title: "Aumento da Precipitação",
    description: "Chuva intensificou para 25mm/h na região norte.",
  },
  {
    time: "12:15",
    type: "info",
    title: "Monitoramento Ativo",
    description: "Sensores instalados em 15 pontos críticos.",
  },
  {
    time: "11:30",
    type: "warning",
    title: "Alerta Preventivo",
    description: "Possibilidade de enchentes em áreas baixas.",
  },
  {
    time: "10:00",
    type: "info",
    title: "Sistema Atualizado",
    description: "Novos dados meteorológicos incorporados.",
  },
]
function renderRegions() {
    const regionsGrid = document.getElementById('regionsGrid');
    regionsGrid.innerHTML = '';

    regions.forEach(region => {
        const regionCard = document.createElement('div');
        regionCard.className = `region-card ${region.risk}`;
        regionCard.innerHTML = `
            <div class="region-header">
                <div class="region-name">${region.name}</div>
                <div class="region-status ${region.risk}">${getRiskText(region.risk)}</div>
            </div>
            <div class="region-details">
                Precipitação: ${region.rain} | População: ${region.population}
            </div>
        `;
        regionsGrid.appendChild(regionCard);
    });
}

const imagens = [
  "src/assets/imagem1.jpeg",
  "src/assets/imagem2.jpeg",
  "src/assets/imagem3.jpeg",
  "src/assets/imagem5.jpeg",
  "src/assets/imagem6.jpeg",
];
let index = 0;
const slide = document.getElementById("slide-img");

function trocarImagem() {
  index = (index + 1) % imagens.length;
  slide.src = imagens[index];
}

setInterval(trocarImagem, 2000); // Troca a cada 3 segundos

// Adiciona a classe fade-out ao elemento de tela de entrada
window.onload = function () {
  setTimeout(function () {
    document.getElementById("entradaTela").classList.add("fade-out");
  }, 4000); // Aguarda 4 segundos antes de remover a tela de entrada
};

// Initialize the application based on current page
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupMobileMenu()
  setupEmergencyButton()

  // Detect current page and initialize accordingly
  const currentPage = getCurrentPage()

  switch (currentPage) {
    case "index":
      initializeHomePage()
      break
    case "dashboard":
      initializeDashboard()
      break
    case "quiz":
      initializeQuiz()
      break
    case "historico":
      initializeHistorico()
      break
    case "prevencao":
      initializePrevencao()
      break
    case "cadastro":
      initializeCadastro()
      break
  }
}

function getCurrentPage() {
  const path = window.location.pathname
  const filename = path.split("/").pop().split(".")[0]
  return filename || "index"
}

// Home Page Functions
function initializeHomePage() {
  initializeSlideshow()
}

function initializeSlideshow() {
  const slides = document.querySelectorAll(".slide")
  if (slides.length === 0) return

  startSlideshow()
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    changeSlide(1)
  }, 5000)
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".slide")
  const indicators = document.querySelectorAll(".indicator")

  if (slides.length === 0) return

  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("active")

  currentSlide += direction

  if (currentSlide >= slides.length) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1
  }

  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.add("active")
}

function setCurrentSlide(n) {
  const slides = document.querySelectorAll(".slide")
  const indicators = document.querySelectorAll(".indicator")

  if (slides.length === 0) return

  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("active")

  currentSlide = n - 1

  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.add("active")

  clearInterval(slideInterval)
  startSlideshow()
}

// Dashboard Functions
function initializeDashboard() {
  renderRegions()
  updateRiskLevel()
  checkForAlerts()
  updateLastUpdate()
  setupRegionCards()

  // Start real-time updates
  setInterval(updateData, 30000)
  setInterval(updateLastUpdate, 60000)
  simulateRealTimeData()
}

function renderRegions() {
  const regionsGrid = document.getElementById("regionsGrid")
  if (!regionsGrid) return

  regionsGrid.innerHTML = ""

  // Ordenar regiões por nível de risco (crítico primeiro)
  const sortedRegions = [...regions].sort((a, b) => {
    const riskOrder = { critico: 0, alto: 1, medio: 2, baixo: 3 }
    return riskOrder[a.risk] - riskOrder[b.risk]
  })

  sortedRegions.forEach((region) => {
    const regionCard = document.createElement("div")
    regionCard.className = `region-card ${region.risk}`
    regionCard.innerHTML = `
      <div class="region-header">
        <div class="region-name">${region.name}</div>
        <div class="region-status ${region.risk}">${getRiskText(region.risk)}</div>
      </div>
      <div class="region-details">
        <div><i class="fas fa-cloud-rain"></i> Precipitação: ${region.rain}</div>
        <div><i class="fas fa-users"></i> População: ${region.population}</div>
      </div>
    `

    // Adicionar evento de clique para mostrar mais detalhes
    regionCard.addEventListener("click", () => {
      showRegionDetails(region)
    })

    regionsGrid.appendChild(regionCard)
  })
}

// Nova função para mostrar detalhes da região
function showRegionDetails(region) {
  const riskColors = {
    baixo: "var(--success-color)",
    medio: "var(--warning-color)",
    alto: "#e67e22",
    critico: "var(--danger-color)",
  }

  const riskLevel = getRiskText(region.risk)
  const riskColor = riskColors[region.risk] || "#333"

  const detailsHTML = `
    <h3 style="margin-bottom: 15px;">Detalhes da Região: ${region.name}</h3>
    <p><strong>Nível de Risco:</strong> <span style="color: ${riskColor}; font-weight: bold;">${riskLevel}</span></p>
    <p><strong>Precipitação Atual:</strong> ${region.rain}</p>
    <p><strong>População Estimada:</strong> ${region.population}</p>
    <p><strong>Recomendação:</strong> ${getRecommendation(region.risk)}</p>
  `

  showNotification(detailsHTML, "info", 8000, true)
}

// Função para obter recomendações baseadas no nível de risco
function getRecommendation(risk) {
  switch (risk) {
    case "baixo":
      return "Monitoramento normal. Sem necessidade de ações especiais."
    case "medio":
      return "Atenção redobrada. Evite áreas propensas a alagamentos."
    case "alto":
      return "Alerta! Prepare-se para possível evacuação em áreas baixas."
    case "critico":
      return "EVACUAÇÃO IMEDIATA recomendada! Procure abrigos em áreas altas."
    default:
      return "Mantenha-se informado sobre as condições."
  }
}

function updateRiskLevel() {
  const riskLevels = document.querySelectorAll(".risk-level")
  const riskDescription = document.getElementById("riskDescription")

  riskLevels.forEach((level) => {
    level.classList.remove("active")
    if (level.dataset.level === currentRiskLevel) {
      level.classList.add("active")
    }
  })

  const descriptions = {
    baixo: "Risco Baixo: Condições normais. Continue monitorando as previsões.",
    medio: "Risco Médio: Atenção redobrada. Evite áreas propensas a alagamento.",
    alto: "Risco Alto: Possibilidade de enchentes em áreas baixas. Mantenha-se atento aos alertas.",
    critico: "Risco Crítico: Enchentes iminentes. Evacue áreas de risco imediatamente.",
  }

  if (riskDescription) {
    riskDescription.textContent = descriptions[currentRiskLevel]
  }
}

function checkForAlerts() {
  const criticalRegions = regions.filter((region) => region.risk === "critico")
  const alertBanner = document.getElementById("alertBanner")
  const alertText = document.getElementById("alertText")

  if (criticalRegions.length > 0) {
    if (alertText) {
      alertText.textContent = `ALERTA CRÍTICO: ${criticalRegions.length} região(ns) em risco extremo de enchente!`
    }
    if (alertBanner) {
      alertBanner.classList.add("show")
    }
    showNotification("Alerta Crítico Ativado!", "error")
  } else if (currentRiskLevel === "alto") {
    if (alertText) {
      alertText.textContent = "ATENÇÃO: Risco alto de enchentes. Mantenha-se informado."
    }
    if (alertBanner) {
      alertBanner.classList.add("show")
    }
  }
}

function updateData() {
  const currentRain = document.getElementById("currentRain")
  const riverLevel = document.getElementById("riverLevel")
  const riskAreas = document.getElementById("riskAreas")
  const affectedPeople = document.getElementById("affectedPeople")

  if (currentRain) {
    const rainValue = (Math.random() * 30 + 5).toFixed(1)
    currentRain.textContent = `${rainValue}mm/h`
  }

  if (riverLevel) {
    const riverValue = (Math.random() * 2 + 1.5).toFixed(1)
    riverLevel.textContent = `${riverValue}m`
  }

  if (riskAreas) {
    const areasValue = Math.floor(Math.random() * 10 + 3)
    riskAreas.textContent = areasValue
  }

  if (affectedPeople) {
    const peopleValue = (Math.random() * 20 + 5).toFixed(1)
    affectedPeople.textContent = `${peopleValue}k`
  }

  regions.forEach((region) => {
    region.rain = `${(Math.random() * 25 + 5).toFixed(1)}mm/h`
  })

  renderRegions()
}

function updateLastUpdate() {
  const lastUpdate = document.getElementById("lastUpdate")
  if (lastUpdate) {
    const now = new Date()
    const timeString = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    lastUpdate.textContent = timeString
  }
}

function simulateRealTimeData() {
  setInterval(() => {
    const riskLevels = ["baixo", "medio", "alto", "critico"]
    const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)]

    if (Math.random() < 0.1) {
      currentRiskLevel = randomRisk
      updateRiskLevel()
      checkForAlerts()
    }
  }, 10000)
}

function setupRegionCards() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".region-card")) {
      const regionCard = e.target.closest(".region-card")
      const regionName = regionCard.querySelector(".region-name").textContent
      showNotification(`Detalhes da região ${regionName} carregados`, "info")
    }
  })
}

// Historico Functions
function initializeHistorico() {
  renderEvents()
  setupPeriodSelector()
}

function renderEvents() {
  const eventsTimeline = document.getElementById("eventsTimeline")
  if (!eventsTimeline) return

  eventsTimeline.innerHTML = '<h3 style="margin-bottom: 1.5rem; color: var(--secondary-color);">Eventos Recentes</h3>'

  events.forEach((event) => {
    const eventItem = document.createElement("div")
    eventItem.className = "timeline-item"
    eventItem.innerHTML = `
      <div class="timeline-time">${event.time}</div>
      <div class="timeline-icon ${event.type}">
        <i class="fas ${getEventIcon(event.type)}"></i>
      </div>
      <div class="timeline-content">
        <div class="timeline-title">${event.title}</div>
        <div class="timeline-description">${event.description}</div>
      </div>
    `
    eventsTimeline.appendChild(eventItem)
  })
}

function setupPeriodSelector() {
  const periodButtons = document.querySelectorAll(".btn-period")

  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      periodButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const period = this.dataset.period
      showNotification(`Período alterado para ${period}`, "info")
    })
  })
}

// Prevencao Functions
function initializePrevencao() {
  // Prevention page is mostly static, no special initialization needed
}

// Cadastro Functions
function initializeCadastro() {
  setupRegistrationForm()
}

function setupRegistrationForm() {
  const form = document.getElementById("registrationForm")
  if (!form) return

  const inputs = form.querySelectorAll("input, select")

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input))
    input.addEventListener("input", () => clearError(input))
  })

  form.addEventListener("submit", handleFormSubmit)
}

function validateField(field) {
  const fieldName = field.name
  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  switch (fieldName) {
    case "username":
      if (!value) {
        errorMessage = "Nome de usuário é obrigatório"
        isValid = false
      } else if (value.length < 3) {
        errorMessage = "Nome de usuário deve ter pelo menos 3 caracteres"
        isValid = false
      }
      break

    case "password":
      if (!value) {
        errorMessage = "Senha é obrigatória"
        isValid = false
      } else if (value.length < 8) {
        errorMessage = "Senha deve ter pelo menos 8 caracteres"
        isValid = false
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
        errorMessage = "Senha deve conter letras e números"
        isValid = false
      }
      break

    case "confirmPassword":
      const password = document.getElementById("password").value
      if (!value) {
        errorMessage = "Confirmação de senha é obrigatória"
        isValid = false
      } else if (value !== password) {
        errorMessage = "Senhas não coincidem"
        isValid = false
      }
      break

    case "city":
      if (!value) {
        errorMessage = "Cidade é obrigatória"
        isValid = false
      } else if (value.length < 2) {
        errorMessage = "Nome da cidade deve ter pelo menos 2 caracteres"
        isValid = false
      }
      break

    case "region":
      if (!value) {
        errorMessage = "Região é obrigatória"
        isValid = false
      }
      break

    case "terms":
      if (!field.checked) {
        errorMessage = "Você deve aceitar os termos de uso"
        isValid = false
      }
      break
  }

  showFieldError(field, errorMessage, !isValid)
  return isValid
}

function showFieldError(field, message, hasError) {
  const errorElement = document.getElementById(field.name + "Error")

  if (hasError) {
    field.classList.add("error")
    if (errorElement) {
      errorElement.textContent = message
      errorElement.classList.add("show")
    }
  } else {
    field.classList.remove("error")
    if (errorElement) {
      errorElement.classList.remove("show")
    }
  }
}

function clearError(field) {
  field.classList.remove("error")
  const errorElement = document.getElementById(field.name + "Error")
  if (errorElement) {
    errorElement.classList.remove("show")
  }
}

function handleFormSubmit(e) {
  e.preventDefault()

  const form = e.target
  const inputs = form.querySelectorAll("input, select")
  let isFormValid = true

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false
    }
  })

  if (isFormValid) {
    showNotification("Processando cadastro...", "info")

    setTimeout(() => {
      form.style.display = "none"
      const successDiv = document.getElementById("registrationSuccess")
      if (successDiv) {
        successDiv.style.display = "block"
      }
      showNotification("Cadastro realizado com sucesso!", "success")
    }, 2000)
  } else {
    showNotification("Por favor, corrija os erros no formulário", "error")
  }
}

function showTerms() {
  alert(
    "Termos de Uso:\n\n1. Este sistema é destinado ao monitoramento de enchentes.\n2. As informações fornecidas devem ser precisas.\n3. O usuário concorda em receber alertas de emergência.\n4. Os dados pessoais serão protegidos conforme a LGPD.",
  )
}

// Common Functions
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mainNav")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileNav.classList.toggle("active")
    })

    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileMenuBtn.classList.remove("active")
        mobileNav.classList.remove("active")
      }
    })
  }
}

function setupEmergencyButton() {
  const emergencyBtn = document.querySelector(".btn-emergency")

  if (emergencyBtn) {
    emergencyBtn.addEventListener("click", () => {
      const confirmed = confirm("Você está reportando uma situação de emergência. Deseja continuar?")
      if (confirmed) {
        showNotification("Emergência reportada! Equipes serão notificadas.", "error")
      }
    })
  }
}

function closeAlert() {
  const alertBanner = document.getElementById("alertBanner")
  if (alertBanner) {
    alertBanner.classList.remove("show")
  }
}

function showNotification(message, type = "info", duration = 5000, isHTML = false) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  if (isHTML) {
    notification.innerHTML = message
  } else {
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
      </div>
    `
  }

  // Adicionar botão de fechar para notificações HTML
  if (isHTML) {
    const closeBtn = document.createElement("button")
    closeBtn.innerHTML = '<i class="fas fa-times"></i>'
    closeBtn.className = "notification-close"
    closeBtn.style.cssText =
      "position: absolute; top: 10px; right: 10px; background: none; border: none; color: #666; cursor: pointer;"
    closeBtn.onclick = () => notification.remove()
    notification.appendChild(closeBtn)

    // Estilizar notificações HTML para serem maiores
    notification.style.maxWidth = "400px"
    notification.style.padding = "20px"
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, duration)
}

function getRiskText(risk) {
  const texts = {
    baixo: "Baixo",
    medio: "Médio",
    alto: "Alto",
    critico: "Crítico",
  }
  return texts[risk] || "Desconhecido"
}

function getEventIcon(type) {
  const icons = {
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
    danger: "fa-exclamation-circle",
  }
  return icons[type] || "fa-info-circle"
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    warning: "fa-exclamation-triangle",
    error: "fa-exclamation-circle",
    info: "fa-info-circle",
  }
  return icons[type] || "fa-info-circle"
}
