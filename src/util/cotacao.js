const request = require('request');

const api_token = 'b3A3r6ZLEIzFvrLcgTR1TpDpIQxa7uIy7AJ0jRYKNhNdScldyXQGnbZG5zCj';

const cotacao = (symbol, callback) => {

    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`; 
    
    request({url: url, json: true}, (err, response) =>{

        if(err){
            callback({
                mensage: `Something went wrong: ${err}`,
                code: 500
            }, undefined);
        }

        else if(response.body === undefined || response.body.data === undefined){
            callback({
                mensage: `There is no data found! ${err}`,
                code: 404
            }, undefined);
        } 

        else{
            const parsedJSON = response.body.data[0];

            const {sysmbol, price_open, price, day_high, day_low} = parsedJSON;
    
            callback(undefined, {symbol, price_open, price, day_high, day_low});    
        }
       
    })
}

module.exports = {
    cotacao
}

//cotacao('PETR4.SA', (data) => {
//    console.log(data)
//})