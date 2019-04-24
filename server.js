const express = require('express');
const morgan = require('morgan');


const userRouter = require('./user-router');
const postRouter = require('./post-router');



const server = express();


server.use(express.json());
server.use(morgan('dev'));


server.get('/', (req, res, next) => {
    res.send('its working');
})

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


module.exports = server;