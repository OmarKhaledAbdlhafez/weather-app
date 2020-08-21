const express= require('express')
const hbs=require('hbs')
const path = require('path')
const request = require('request')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const app = express()
//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//static
app.use(express.static(publicDirectoryPath))
//set
app.set('view engine', 'hbs');
app.set('views',viewspath);
hbs.registerPartials(partialsPath)
const port = process.env.Port || 3000
app.get('/', function (req, res) {
  res.render('index', {
        title: 'Weather',
        name: 'omar khaled'
    })
})

app.get('/weather',(req,res)=>{
  if (! req.query.location){
    return res.send({
           error: 'You must provide a location  term'
       })
  }
  geocode(req.query.location, (error, data) => {
  if (error){
        return   console.log('Error', error)
  }
    const loc = data.latitude + "," +data.longitude
    weather(loc, (error, weatherdata) => {
      if (error){
            return   console.log('Error', error)
      }
        console.log('Data', weatherdata)
        res.send(weatherdata)
    })

})

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'omar khaled'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'omar khaled'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'omar khaled',
        errorMessage: 'Page not found.'
    })
})
app.listen(port,()=>{
  console.log('listen on port'+ port );
})
