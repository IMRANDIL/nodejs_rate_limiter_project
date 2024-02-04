require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);


const PORT = process.env.PORT || 5005;

app.use(express.json());
app.use(express.urlencoded({extended: true}))




app.use('/api/v1', require('./routers/ratelimitexRouter'))

server.listen(PORT, ()=>{
    console.log(`Server runs on port: ${PORT}`);
})