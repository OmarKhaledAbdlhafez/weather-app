const request = require('request')

const weather = (location , callback) => {
  const url = "http://api.weatherstack.com/current?access_key=92e210d5d5a36a270a4338e7cdf653c5&query="+location
  //London;Singapur;Shanghai"
  request({ url: url, json: true }, (error, response) => {
    if (error) {
        callback('Unable to connect to weather service!',undefined)
    } else if (response.body.error) {
        callback('Unable to find location',undefined)
    } else {
      callback(undefined,{
        current: response.body.current.temperature,
        wind_speed: response.body.wind_speed
      })
    }
})
}
//response.body.daily.data[0].summary
// temp:response.body.currently.temperature,
// rain :response.body.currently.precipProbability
module.exports=weather
