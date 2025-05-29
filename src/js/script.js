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
];
