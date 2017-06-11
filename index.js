const http = require('http')
const app = require('./server/server');
const bot = require('./server/bot');
const server = http.Server(app);
bot(server)
server.listen(4000, () => {
  console.log('Listening');
});

