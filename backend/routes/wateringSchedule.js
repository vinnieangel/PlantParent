const router = require('express').Router();
let wS = require('../models/wateringSchedule.model');

router.route('/create').post((req, res) => {
    const frequency = req.body.frequency;
    const lastWatered = req.body.lastWatered;
    const nextWatering = req.body.nextWatering;
    const newWS = new wS({frequency:frequency, lastWatered:lastWatered, nextWatering:nextWatering});
    newWS.save().then ((saved) => res.status(200).json({WSID:saved._id})).catch(err => res.status(400).json("Error: "+err));
})

router.route('/editLastWatered').put((req, res) => {
    const WSID = req.body.WSID;
    const newLastWatered = req.body.newLastWatered;
    wS.findOne({_id:WSID}).then(ws => {
        ws.lastWatered = newLastWatered;
        ws.save().then(newWs =>res.status(200).json(newWs)).catch(err => console.log("Error: " + err))
    }).catch(err => console.log("Error: " + err));
})

router.route('/editFrequency').put((req, res) => {
    const WSID = req.body.WSID;
    const frequency = req.body.frequency;
    wS.findOne({_id:WSID}).then(ws => {
        ws.frequency = frequency;
        ws.save().then(newWs =>res.status(200).json(newWs)).catch(err => console.log("Error: " + err))
    }).catch(err => console.log("Error: " + err));
})

router.route('/editNextWatering').put((req, res) => {
    const WSID = req.body.WSID;
    const nextWatering = req.body.nextWatering;
    wS.findOne({_id:WSID}).then(ws => {
        ws.nextWatering = nextWatering;
        ws.save().then(newWs =>res.status(200).json(newWs)).catch(err => console.log("Error: " + err))
    }).catch(err => console.log("Error: " + err));
})

router.route('/updateToNext').put((req, res) => {
    const WSID = req.body.WSID;
    wS.findOne({_id: WSID}).then(ws => {
        ws.lastWatered = ws.nextWatering;
        const newNext = new Date(ws.nextWatering);
        ws.nextWatering = new Date(newNext.getDate() + ws.frequency);
        ws.save().then(newWs => res.status(200).json(newWs)).catch(err => console.log("Error: " + err));
    }).catch(err => console.log("Error: " + err))
})

module.exports = router; //do this for all routers