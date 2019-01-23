window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.description');
    let temperatureDegree = document.querySelector(".degree");
    let locationTimezone = document.querySelector(".location-timezone");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/855fc1112bfbcd98d6c031271014c6f0/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, } = data.currently;
                    // set domential elements from the api
                    temperatureDegree.textContent = Math.floor((temperature - 32) * 5 / 9);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                });
        });

    }
});