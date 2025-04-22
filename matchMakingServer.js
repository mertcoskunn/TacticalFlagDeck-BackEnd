const WebSocket = require('ws');

const matchmakingServer = new WebSocket.Server({ port: 3000 });
let matchServerConnection = null;
let matches = {}; 


matchmakingServer.on('connection', (ws) => {
    console.log('Player connected');

    ws.on('message', (message) => {
        const playerData = JSON.parse(message); 

        if (Object.keys(matches).length === 0) {
            const matchID = `match_${Date.now()}`;

            let playerInfo = {
                username: playerData.username,
                ws: ws 
            }

            matches[matchID] = [playerInfo];  
            ws.send(JSON.stringify({
                type: 'waiting_match',
                match_id: matchID  
            }
          ));
        } else {
            const matchID = Object.keys(matches)[0]; 
            
            let playerInfo = {
                username: playerData.username, 
                ws: ws
            }
            matches[matchID].push(playerInfo);  
           
            for (let i = 0; i < matches[matchID].length; i++) {
                const player = matches[matchID][i];
                const ws = player.ws;
            
                ws.send(JSON.stringify({
                    type: 'match_ready',
                    match_id: matchID  
                }
              ));
              }
            
            delete matches[matchID];

              
        }
    });


    ws.on('close', () => {
        
    Object.keys(matches).forEach(key => delete matches[key]);
    console.log("Player disconnected");

        
    }
    );
});
