const router = require('express').Router();
let user = require('../models/user.model');


//handles incoming get requests to localhost/menuItems/
router.route('/createAccount').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new user({username, password});

    newUser.save().then(()=>{res.json("New user created!")}).catch(err=>{
        if(err.name == 'MongoError')
            res.status(400).json('Duplicate')
        else if (err.name == 'ValidationError')
            res.status(400).json('Too short')
        
        else
            res.status(400).json('Error'+err)
    }
        )
    
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({username:username, password:password}).then(user => {
        if(user){
            res.status(200).json('Logged in!')
        }
        else {
            res.status(400).json('Not Found')
        }
    }).catch(err=>res.status(400).json('Error' + err));
    })



module.exports = router; //do this for all routers