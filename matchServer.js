const WebSocket = require('ws');

const matchServer = new WebSocket.Server({ port: 4000 });
let matches = {}; 

matchServer.on('connection', (ws) => {
    ws.send(JSON.stringify({
        type: 'match_connection_ready'
    }
  ));
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'INIT_MATCH') {
            if(matches[data.matchID] == null){
                let playerInfo = {
                        username: "ddd", 
                        ws: ws
                    };

                matches[data.matchID] = [playerInfo]; 
            }
            else{
                
                let playerInfo = {
                        username: "ddd", 
                        ws: ws
                    };

                matches[data.matchID].push(playerInfo);

                for (let i = 0; i < matches[data.matchID].length; i++) {
                    const player = matches[data.matchID][i];
                    const ws = player.ws;
                    
                    ws.send(JSON.stringify({
                        type: 'START_MATCH',
                        currentTeam: i, 
                        matchID: data.matchID  
                    }
                ));
                }

            }
        }

        if(data.type === 'CHAR_CREATE')
        {
            if(matches[data.matchID] != null)
            {
                broadcastToMatch(matches[data.matchID], message.toString()); 
            }
        }

        if(data.type === 'MOVE')
        {
            if(matches[data.matchID] != null)
            {
                broadcastToMatch(matches[data.matchID], message.toString()); 
            }
        }

        if(data.type === 'ATTACK')
        {
            if(matches[data.matchID] != null)
            {
                broadcastToMatch(matches[data.matchID], message.toString()); 
            }   
        }

        if(data.type === 'TURN_END')
        {
            if(matches[data.matchID] != null)
            {
                broadcastToMatch(matches[data.matchID], message.toString()); 
            }          
        }

        if(data.type === 'MATCH_END')
            {
                if(matches[data.matchID] != null)
                {
                    broadcastToMatch(matches[data.matchID], message.toString()); 
                }          
            }
        
       
    });

    ws.on('close', () => {
        let matchIdOfDisconnectedPlayer = null;
        let usernameOfDisconnectedPlayer = null;
    
        for (let matcheID in matches) {
            let players = matches[matcheID];
            
            for (let i = 0; i < players.length; i++) {
                if (players[i].ws === ws) {
                    
                    matchIdOfDisconnectedPlayer = matcheID;
                    usernameOfDisconnectedPlayer = players[i].username;
                    break;
                }
            }
    
            if (matchIdOfDisconnectedPlayer) break;
        }


        if (matchIdOfDisconnectedPlayer) {
            const players = matches[matchIdOfDisconnectedPlayer];
    
            players.forEach(player => {
                if (player.ws !== ws) {
                    player.ws.send(JSON.stringify({
                        type: 'opponent_disconnected'
                    }));
                }
            });
    
            delete matches[matchIdOfDisconnectedPlayer];
      }});

});


function broadcastToMatch(match, json_msg) {

    for (let i = 0; i < match.length; i++) {
        const player = match[i];
        const ws = player.ws;
    
        ws.send(json_msg);
      }
}