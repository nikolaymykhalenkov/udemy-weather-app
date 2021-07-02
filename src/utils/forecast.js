const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const accessKey = process.env.WEATHERSTACK_ACCESS_KEY;
    if (!accessKey) throw new Error("Missing Weatherstack Access Key");
    const url = encodeURI(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`);
    request( {url, json: true}, (error, response, body)=> {
        if (error) throw new Error(error);
        if (error) {
            callback(error);
        } else if (body.success === false) {
            callback(body.error.info);
        } else {
            const weather = body.current;

            if (Array.isArray(weather.weather_descriptions)) {
                weather.descriptionString = weather.weather_descriptions.join(", ");
            } else {
                weather.descriptionString = weather.weather_descriptions;
            }

            weather.forecast = `${weather.descriptionString}. It is currently ${weather.temperature} degrees out.`;

            callback(undefined, weather);
        }
    });
}

module.exports = forecast;
