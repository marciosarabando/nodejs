console.log('Javascript no Frontend');

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('h3');
const symbol = document.querySelector('#symbol');
const price_open = document.querySelector('#price_open');
const price = document.querySelector('#price');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerHTML = "Buscando...";

    symbol.innerHTML = "";
    price_open.innerHTML = "";
    price.innerHTML = "";
    day_high.innerHTML = "";
    day_low.innerHTML = "";

    event.preventDefault();
    const ativo = document.querySelector('input').value.toUpperCase();
    
    if(!ativo)
    {
        mainMensage.innerHTML = "O ativo deve ser informado";
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            mainMensage.innerHTML = `Alguma coisa deu errado ${data.error.mensage} código ${data.error.code}`;
        }
        else
        {
            console.log(data);
            mainMensage.innerHTML = "";
            symbol.innerHTML = `ATIVO: ${data.symbol}`;
            price_open.innerHTML = `PREÇO DE ABERTURA: ${data.price_open}`;
            price.innerHTML = `PREÇO: ${data.price}`;
            day_high.innerHTML = `MAX DIA: ${data.day_high}`;
            day_low.innerHTML = `MIN DIA: ${data.day_low}`;
        }
    });
});


});
