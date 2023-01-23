import { WebSocketServer,  createWebSocketStream  } from 'ws';
import config from '../config';
import { handleCommand } from '../handleCommand';

const DEFAULT_PORT = 8080;

const port = config.port ? +config.port : DEFAULT_PORT;



export const startWebSocket = () => {
  const wsserver  = new WebSocketServer({ port: port });

  if(wsserver) {
    console.log('Waiting for connection..');
  } else {
    console.log('WS Server does not work');
  }
  
  wsserver.on('connection', (ws) => {
    console.log('Connection established');
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.setDefaultEncoding('utf8');


    duplex.on('data', async (data) => {
      console.log(`--> ${data}`);
      try {

        const result = await handleCommand(data.toString());
        
        if (result) {
          console.log(`<-- ${result}`);
          duplex.write(result);
        } else {

         // duplex.write(`${data}`);
        }
      } catch(e) {
        console.log(`Error ${(e as Error).message} in command ${data} `);
      }
      

    });
    
  });
}





