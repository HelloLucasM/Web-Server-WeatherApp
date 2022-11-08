const path = require('path')

const express = require('express')
const app = express()

const hbs = require('hbs')

const {forecast} = require('./utils/forecast')
const {geolocate} = require('./utils/geolocate')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(path.join(__dirname, '../templates/views'))
const viewPartialsPath = path.join(path.join(__dirname, '../templates/partials'))


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(viewPartialsPath)

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
console.log(_location);
if(!_location){
    return res.send({
        error:"¡Provide us a location please!"
    })
}

geolocate(_location, (error, {latitud, longitud, location})=>{
    if(error){
        return res.send({
            error: error
        })
    }

    forecast(latitud, longitud, (error, body)=>{
        if(error){
            return res.send({
                error: error
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

app.listen(3000, ()=>{
    console.log("Server on")
})


// const carta = 'bici   coche balón _playstation bici coche peluche  carmel'
 
// const gifts = (string)=>{
//  const arrayGifts = string.split(/\s+/); 
//  const gifts = {}; 
//  arrayGifts.forEach(item => {
//     console.log(item)
//     if(item.startsWith("_")) return; 
//     if(Object.hasOwn(gifts, item)){
//         gifts[item] = gifts[item] + 1; 
//     }else{
//         gifts[item] = 1
//     }

//  });
// console.log(gifts)
//  return gifts; 
// }

// gifts(carta)