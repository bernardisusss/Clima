// Variáveis
const cityInput = document.querySelector('#cityinput');
const btn = document.querySelector('#enviar');
const descriptionElement = document.querySelector('#descrição');
const tempElement = document.querySelector('#temp');
const windElement = document.querySelector('#vento');
const apiKey = "7834314aa925de100f0186d06a999d0b";

// Função para converter temperatura de Kelvin para Celsius
function convertTemperature(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

// Função para buscar dados da API
function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const description = data.weather[0].description;
      const temperature = convertTemperature(data.main.temp);
      const windSpeed = data.wind.speed;
      descriptionElement.textContent = description;
      tempElement.textContent = `${temperature}°C`;
      windElement.textContent = `${windSpeed} km/h`;
    })
    .catch(error => {
      console.error(error);
      alert('Erro ao buscar dados do clima. Verifique o nome da cidade ou sua conexão com a internet.');
    });
}

// Adicionar evento de clique ao botão
btn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert('Por favor, digite o nome da cidade.');
  }
});