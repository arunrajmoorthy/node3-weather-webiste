const request = require('request');

const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a965978783ebffe0366fb17bec22688&query='+  longitude  +','+ latitude + '&units=f';
    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service! ', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            console.log(body, "BODY");
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + ' chance of rain.' );
        }
    })
}


module.exports = foreCast;


