const express = require("express");
es6Renderer = require('express-es6-template-engine');

const server = express();

// server.use("/", express.static(__dirname + "/public"));

server.engine('html', es6Renderer);
server.set('views', 'views')
server.set('view engine', 'html')

server.get('/heartbeat',(req, res) => {
    res.json({
        "is":"working",
    });
});

server.listen(8080, () => {
    console.log("This server is running at PORT 8080")
});