const router = require('express').Router();
let userPlant = require('../models/userPlant.model');

router.route('/add').post((req, res) => {
    const plantID = req.body.plantID;
    const givenName = req.body.givenName;
    const stage = req.body.stage;
    const dob = req.body.dob;
    console.log("STAGE:", stage)
    const newUserPlant = new userPlant({plantID, givenName, stage, dob});
    newUserPlant.save().then((saved) => res.status(200).json({userPlantID:saved._id})).catch(err => res.status(400).json("Error: "+err) )

});

module.exports = router; //do this for all routers