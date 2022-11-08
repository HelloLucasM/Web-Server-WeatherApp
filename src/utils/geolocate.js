const request = require('request'); 
require('dotenv').config()
const env = process.env

const geolocate = (_name, callback) =>{
    const location = encodeURIComponent(_name)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${env.API_KEY_MAPBOX}`
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("We cannot connect with the api", undefined); 
        }else if(body.error){
            callback(body.error, undefined)
        }else if(body.features.length === 0){
            callback("No se pudo encontrar el destino", undefined)
        }else{ 
            callback(undefined, {
                 latitud: body.features[0].center[1], 
                longitud: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
        
    })
}

module.exports = {geolocate}
