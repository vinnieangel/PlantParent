const router = require('express').Router();
let plant = require('../models/plant.model');

router.route('/getAll').get((req, res) => {
    plant.find().then(plants=> {
        if(plants.length > 0) {
            res.status(200).json({plants: plants})
        }
            
        else 
            res.status(400).json("No plants found!")
    }).catch(err => res.status(400).json("Error: " + err))
});

module.exports = router; //do this for all routers