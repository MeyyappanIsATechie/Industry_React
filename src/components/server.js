const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

let games = Array.from({length: 100000}, (_, i) => ({
    id: i + 1,
    name: `Game #${i + 1}`,
}));

app.get('/api/games', (req, res) => {
    const {lastId = 0, pageSize = 20} = req.query;
    const filteredGames = games.filter((game) => game.id > Number(lastId)).slice(0,Number(pageSize));
    console.log('filteredGames', filteredGames);
    
    res.json(filteredGames);
});

app.listen(3001, () => console.log('server running on port 3001'));
