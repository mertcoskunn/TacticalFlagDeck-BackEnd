# TacticalFlagDeck-BackEnd

This repository contains the servers required for the [TacticalFlagDeck](https://github.com/mertcoskunn/TacticalFlagDeck) project. The backend is built with Node.js and consists of three separate servers: one for sign-in/sign-up, one for matchmaking, and one for handling live matches.

The sign-in/sign-up server uses HTTP.

The matchmaking and match servers use WebSocket for real-time communication.

User data is currently stored in MongoDB.

⚠️ Important note: At this stage, there is no token-based authentication or encryption implemented, so the system is not secure for production use yet.
