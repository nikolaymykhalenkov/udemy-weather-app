const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherText = document.querySelector('.weather-text');
const weatherImages = document.querySelector('.weather-img');
const info = document.querySelector('.info');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    info.textContent = "Loading...";

    if (location) {
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    info.textContent = data.error;
                } else {
                    info.textContent = "";
                    weatherText.textContent = data.forecast;

                    if (data.weatherIcons) {
                        let images = "";
                        for (let icon of data.weatherIcons) {
                            images += `<img src="${icon}">`
                        }
                        weatherImages.innerHTML = images;
                    }
                }
            });
        });
    }
});