var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const userRouter = require("express").Router()
const User = require('../models/User.model')

const SECRET = 'chingubears3';

userRouter.route('/register').post(function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.status(400).send('Empty body');

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save()
        .then(user => {
            return res.status(200).send({ success: true });
        })
        .catch(err => {
            if(err.code && err.code == 11000) 
                return res.status(400).send('Email already in use');
            else
                return res.status(400).send('Server error');
        });
});

userRouter.route('/login').post(function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.status(400).send('Empty body');

    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user)
            return res.status(404).send("No user found");
        if (err)
            return res.status(500).send("Server error");

        var validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) 
            return res.status(401).send({ success: false, access_token: null });
        
        var token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: 86400 // 24 hours
        });
        
        res.status(200).send({ success: true, access_token: token });        
    });
});

userRouter.route('/testget').get(function(req, res) {
    var token = req.headers['access_token'];

    if (!token) 
        return res.status(401).send("No token found");
  
    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) 
            return res.status(500).send('Failed to authenticate token');
        
        User.findById(decoded.id, function (err, user) {
            if (!user)
                return res.status(404).send("No user found");
            if (err)
                return res.status(500).send("Server error");
            
            res.status(200).send(user);
        });
    });
});

module.exports = userRouter;