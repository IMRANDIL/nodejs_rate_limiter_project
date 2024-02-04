require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const rateLimitMiddleware = require('./middlewares/ratelimiter')
const server = http.createServer(app);


const PORT = process.env.PORT || 5005;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Use your custom rate-limiting middleware
const limiter = rateLimitMiddleware({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // 3 requests per minute
    message: 'Too many requests from this IP, please try again later.',
  });
  
  app.use('/api/v1',limiter);


app.use('/api/v1', require('./routers/ratelimitexRouter'));



server.listen(PORT, ()=>{
    console.log(`Server runs on port: ${PORT}`);
})