import hapi from '@hapi/hapi';
import {hello, time} from './handlers/demo';

function init() {
  const server = new hapi.Server({
    address: '0.0.0.0',
    port: process.env.PORT || 3001,
    debug: {
      log: process.env.NODE_ENV === 'development' ? ['*'] : undefined,
      request: process.env.NODE_ENV === 'development' ? ['*'] : undefined,
    },
  });
  
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => h.redirect(process.env.APP_URL),
  });
  
  server.route({
    method: 'GET',
    path: '/api/demo/time',
    handler: time,
  });
  
  server.route({
    method: 'GET',
    path: '/api/demo/hello',
    handler: hello,
  });

  return server;
}

const server = init();
server.start();