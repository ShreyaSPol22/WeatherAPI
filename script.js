const countryList = document.getElementById('country-list');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close');

// countries data
fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data => {
        data.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('country-card');

            card.innerHTML = `
                <h2>${country.name}</h2>
                <img src="${country.flag}" alt="${country.name}">
                <p>Capital: ${country.capital}</p>
                <p>Region: ${country.region}</p>
                <p>Country Code: ${country.alpha2Code}</p>
                <button class="weather-btn">Click for Weather</button>
            `;

            // event listener
            card.querySelector('.weather-btn').addEventListener('click', () => {
                getWeatherData(country.name);
            });

            countryList.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching countries data:', error));

// Get data
function getWeatherData(countryName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=010f5cf51b13dc58b374219b19b6c4c9`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp - 273.15; 
            const description = data.weather[0].description;

            // Update
            document.getElementById('modal-country-name').textContent = countryName;
            document.getElementById('modal-temp').textContent = temp.toFixed(2);
            document.getElementById('modal-description').textContent = description;

            // Show
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// closing when click outside
window.addEventListener('click', event => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
