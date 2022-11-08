const request = require('request'); 
require('dotenv').config()
const env = process.env

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${env.API_KEY_WEATHERSTACK}&query=${lat},${long}`;
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("We cannot connect with the api", undefined); 
        }else if(body.error){
            callback(body.error, undefined) 
        }else{ 
            callback(undefined, body)
        }
    });
}

module.exports = {forecast};

