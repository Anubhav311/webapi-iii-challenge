const express = require('express');
const morgan = require('morgan');


const userRouter = require('./user-router');
const postRouter = require('./post-router');

const server = express();


function caseConverter(req, res, next) {
    
    if(req.body.name) {
        const name = req.body.name
        req.body.name = name.toUpperCase()
        next()
    } else {
        next()
    }
}

server.use(express.json());
server.use(morgan('dev'));


server.get('/', (req, res, next) => {
    res.send('its working');
})

server.use('/api/users', caseConverter, userRouter);
server.use('/api/posts', postRouter);


module.exports = server;