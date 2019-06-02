const path =  require('path');
const express = require('express');
const hbs = require('hbs');
const cotacao = require('./util/cotacao');

//Configuração Basica do Express
const app = express();

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'));

//DEFININDO O CAMINHO DOS CONTEÚDO ESTÁTICOS PUBLICO
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

//DEFINIR O HANDLEBARS (HBS) PARA LER AS PAGINAS HBS NO DIRETÓRIO VIEWS
app.set('view engine', 'hbs');

//CUSTOMIZANDO O CAMINHO DAS VIEWS
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

//SETANDO O DIRETÓRIO DE PARTIALS
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

//Exemplos de Utilização de Rotas
// minhaapp.com.br
// minhaapp.com.br/help
// minhaapp.com.br/about

//Definindo as Rotas
// app.get('',(req, res) => {
//     res.send('<h1>Hello minha app</h1>');
// });

// app.get('/help',(req, res) => {
//     res.send('Help PAGE');
// });

// app.get('/about',(req, res) => {
//     res.send('Sistema Web com NODE.js desenvolvido por Marcio Sarabando');
// });

app.get('',(req, res) => {
    res.render('index', {
        title: "Bem Vindo ao Sistema de Cotações",
        author: "Criado por: Marcio Sarabando"
    });
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: "Sobre",
        author: "Criado por: Marcio Sarabando"
    });
});

app.get('/help',(req, res) => {
    res.render('help', {
        title: "Ajuda",
        author: "Criado por: Marcio Sarabando"
    });
});

app.get('/cotacoes',(req, res) => {
    
    //OBJETO JAVASCRIPT
    //const cotacao = {
    //    symbol: 'PETR4.SA',
    //    description: 'PETROLEO BRASILEIRO', 
    //   price_open: 10, 
    //    price: 12, 
    //    day_high: 13, 
    //    day_low: 9
    //}

    //Criando um Array e Inserido Elementos em JSON
    //const cotacoes = new Array();
    //cotacoes.push(cotacao);
    //cotacoes.push(cotacao);
    //res.send(cotacoes);
   
    if(!req.query.ativo){
        const error = {
            mensage: 'O Ativo deve ser informado como query parameter',
            code: 400
        }
    }
    else
    {
        const symbol = req.query.ativo.toUpperCase();

        cotacao.cotacao(symbol, (err, data) => {
            if(err){
                return res.status(err.code).json({error : {
                    mensage: err.mensage,
                    code: err.code
                }})
            }
            else
            {
                res.status(200).json(data);
            }
           
                
        });
    }
  
  
});



//TRATANDO ERRO TUDO APOS O /HELP- página não existe 404
app.get('/help/*',(req, res) => {
    res.render('404', {
        title: "404",
        author: "Marcio Sarabando",
        errorMessage: 'Não existe Nada Após p HELP'
    })
});

//TRATANDO ERRO - página não existe 404
app.get('*',(req, res) => {
    res.render('404', {
        title: "404",
        author: "Marcio Sarabando",
        errorMessage: 'Página não encontrada'
    })
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is UP na porta ${port}`);
});
