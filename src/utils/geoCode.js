const request = require('request');

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJ1bnJhajkxIiwiYSI6ImNrZTEzbm8xdDQyMWwycXR2eWx2b3UxeGwifQ.5a6I7kggEuldaWTcaiKG-w';
    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location, Try another location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;



