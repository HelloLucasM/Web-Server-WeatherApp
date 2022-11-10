const path = require('path')

const express = require('express')
const app = express()
const port = process.env.port || 3000

const hbs = require('hbs')

const {forecast} = require('./utils/forecast')
const {geolocate} = require('./utils/geolocate')

//Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(path.join(__dirname, '../templates/views'))
const viewPartialsPath = path.join(path.join(__dirname, '../templates/partials'))

//Setup handlebars engine and view location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(viewPartialsPath)

//Setup static directory to serve.
app.use("/public", express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        user:'Lucas Mazzoni'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help Section',
        user: 'Lucas Mazzoni'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Section',
        user: 'Lucas Mazzoni'
    })
})

app.get('/weather', (req, res)=>{

const _location = req.query.location

if(!_location){
        return res.send({
            error:"¡Provide us a location please!"
        })
    }

    geolocate(_location, (error, {latitud, longitud, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitud, longitud, (error, body)=>{
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                locationProvided: _location,
                locationFound: location, 
                weather: body
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('notFound',{
        title:'Help article does not exist try with other.',
        user:'Lucas Mazzoni'
    })
})

app.get('*', (req, res)=>{
    res.render('notFound',{
        title:'Page not working try with another url.',
        user: 'Lucas Mazzoni'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}.`)
})


