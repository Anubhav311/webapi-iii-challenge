const express = require('express');
const db = require('./data/helpers/userDb');
const router = express.Router();
// const db = require('./data/helpers/postDb');


router.post('/', (req, res) => { 
    const userInformation = req.body;

    if (userInformation.name) {
        db.insert(userInformation)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })

    } else {
        res.status(400).json({errorMessage: "Please provide title and content for the post."})
    }
})

router.get('/', (req, res, next) => {
    db.get()
    .then(users => {
        res.status(200).send(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving users.'
        })
    })
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;

    db.getById(userId)
        .then(post => {
            console.log(post)
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        }) 
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."})
        })
})

router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    db.remove(userId)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"})
        })
})

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const userInformation = req.body

    if (userInformation.name) {
        db.update(userId, userInformation)
        .then(response => {
            if(response) {
                res.status(200).json(response)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be modified."})
        })
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the post."})
    }

})



module.exports = router;