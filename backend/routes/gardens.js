const router = require('express').Router();
let garden = require('../models/garden.model');


router.route('/add').put((req, res) => {
    const userID = req.body.userID;
    const plantID = req.body.plantID;
    

    garden.findOne({userID:userID}).then(gard => {
        if(gard == null) {
            const newGarden = new garden({userID:userID, plants:[plantID]});
            newGarden.save().then(() => res.status(200).json("Added to garden!")).catch(err => res.status(400).json("Error: " + err))
        }
        else {
            //console.log(gard[0].plants)
            gard.plants.push(plantID);
            gard.save().then(()=> res.status(200).json("Added to garden!")).catch(err => res.status(400).json("Error: "+ err))
        }
    }).catch(err=>res.status(400).json('Error: '+ err) )
});

router.route('/get/:userID').get((req, res) => {
    const userID = req.params.userID;
    garden.findOne({userID:userID}).then(gard => {
        if(gard == null) {
            res.status(200).json("Empty!")
        }
        else {
            res.status(200).json(gard.plants)
        }
    })
})

module.exports = router; //do this for all routers