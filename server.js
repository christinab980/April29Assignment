const express = require("express");
es6Renderer = require('express-es6-template-engine');
const { checkAuth } = require('./middleware')
const pgp = require('pg-promise')();

const server = express();
server.use(express.json());
// server.use( checkAuth );

// server.use("/", express.static(__dirname + "/public"));

server.engine('html', es6Renderer);
server.set('views', 'views')
server.set('view engine', 'html')

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'users',
    user: "christinabarron",
    password: ' ',
    allowExitOnIdle: true
};

const db = pgp(cn);

server.get('/heartbeat', (req, res) => {
    res.json({
        "is":"working",
    });
});

server.get('/test', async (req, res) => {
    const user = await test();
    res.json(user)
});

async function test() {
    const user = await db.any('SELECT * FROM userAuth', [true]);
    return user
};

server.post('/auth/login', (req, res) => {
    res.send(`${req.body.username}, ${req.body.password}`)
})

server.listen(8080, () => {
    console.log("This server is running at PORT 8080")
});