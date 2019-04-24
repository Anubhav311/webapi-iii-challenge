const express = require('express');
const db = require('./data/helpers/postDb');
const router = express.Router();


router.post('/', (req, res) => { 
    const postInformation = req.body;

    if (postInformation.text && postInformation.user_id) {
        db.insert(postInformation)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })

    } else {
        res.status(400).json({errorMessage: "Please provide text and user_id for the post."})
    }
})

router.get('/', (req, res, next) => {
    db.get()
    .then(posts => {
        res.status(200).send(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving posts'
        })
    })
})

router.get('/:id', (req, res) => {
    const postId = req.params.id;

    db.getById(postId)
        .then(post => {
            console.log(post)
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        }) 
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    db.remove(postId)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"})
        })
})

router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const postInformation = req.body
    console.log(postInformation.text)
    if (postInformation.text) {
        db.update(postId, postInformation)
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