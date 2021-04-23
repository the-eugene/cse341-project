const http=require('http');
const routeHandler=require('./prove01-routes');

const server=http.createServer(routeHandler);

server.listen(3000);