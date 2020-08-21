const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoib21hcmtoYWxlZDAyIiwiYSI6ImNrZHp6bXc0bTA2MTIyenA5MzZlZmN1YnAifQ.7u2ICbLrwzcK4aMyhc4GxA"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
