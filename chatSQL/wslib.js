const WebSocket = require("ws");
const axios = require('axios')


const clients = [];
const nombres = ['Andres', 'Juan', 'Adolfo', 'Ricardo', 'Laura', 'Andrea', 'Camila', 'Juliana']
const apellidos = ['Gomez', 'Gonzalez', 'Martinez', 'Gutierrez', 'Fernandez', 'Mejia']

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    var nombre = nombres[Math.floor(Math.random() * nombres.length)];
    var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];

    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messageObj = { author: `${nombre} ${apellido}`, message: message }
      axios.
        post('http://localhost:3000/messages',
          messageObj).then(response => {
            sendMessages();
          }).catch(err =>
            console.log(err.err));
    });
  });

  const sendMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then(response => {
        clients.forEach((client) => client.send(JSON.stringify(response.data)));
      }).catch(err =>
        console.log(err));
  };
};

exports.wsConnection = wsConnection;