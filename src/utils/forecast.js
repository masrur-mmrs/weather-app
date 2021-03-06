const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7804e5b26265f4c75b1588a89faf4542&query=' + longitude + ',' + latitude + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_discriptions = body.current.weather_descriptions
            const humidity = body.current.humidity

            const res = weather_discriptions + '. It is currently ' + temperature + '°C. It feels like ' + feelslike + '°C out. The humidity is ' + humidity + '%'
            callback(undefined, res)
        }
    })
}

module.exports = forecast