const express = require('express'); //mostra o arquivo estático
const path = require('path'); // exportação do path

const app = express(); // app do express
const server = require('http').createServer(app); // definição do protocolo http
const io = require('socket.io')(server); // definição do protocolo wss pro websocket / importando o socket.io e retornando a função server.

app.use(express.static(path.join(__dirname,'public'))); // local onde ficarão os arquivos publicos acessados pela aplicação
app.set('views',path.join(__dirname,'public')); // Para definir que as views estão sendo utilizadas como html , por padrão no node se utiliza o ejs 
                                                //path.join define onde ficaram as views, que ficará no diretório publico
app.engine('html', require('ejs').renderFile); // definindo a engine como 'html'
app.set('view engine', 'html'); // html definida como a view engine

io.on('connection',socket => { // Conexão do websocket
    console.log(`Socket conectado: ${socket.id}`);

    socket.on('marker', data =>{
            markers.push(data);
            io.emit('marker',data);
            console.log(data);
    });
});

app.use('/', (req, res)=>{ // Quando for acessado o endereço do servidor padrão, ele vai renderizar a view 'index.html'
    res.render('index.html');
});


server.listen(3000); // Quando iniciar vai ouvir a porta 3000