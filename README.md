# Minesweeper

### How to run the game?

```bash
npm install

# To run the client
cd client
tsc && node ./bin/main.js

# To run the server
cd server
tsc && node ./bin/main.js
```

### TODO

1. Create a point system, rewarding people for winning games.
2. Figure out how to track games wons.
3. Create settings that allow users to switch between easy/medium/hard games that reward different amount of points.

### Features

1. Point system - rank top 30 players. Rewards vary based on game difficulty.
2. Competitions - challange your friends.

**Competition mode** - The server generates a certain amount of boards that are the same for each player participating in the challange.
**Flag unlocking** - The flag is only available for people who have a certain amout of points.
