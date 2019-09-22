const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.get('/test', async(req, res) =>{
    return res.status(200).send({message: 'Ok'});
});

router.post('/register', async(req, res) => {
    const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists'});
        }
        const user = await User.create(req.body);
  
        user.password = undefined;

        return res.send({user});
    }catch(err){
        console.log(err)
        return res.status(400).send({error: 'Registration failed'});
    }
});

router.get('/', async(req, res) =>{
    try{
        const users = await User.find();
        return res.status(200).send({users})
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'error'});
    }
});

router.post('/login', async(req, res)=>{
    try{
        const user = await User.find({'email': req.body.email});
        if (user[0].password == req.body.password){
            return res.status(200).send({user});
        }else{
            return res.status(401).send({message: 'password or username invalid'})
        }

    }catch(err){
        console.log(err);
        return res.status(401).send({message: 'password or username invalid'})
    }
});

router.delete('/:userId', async(req, res) =>{
    try{
        await User.findByIdAndRemove(req.params.userId);
        
        return res.send();
    }catch(err){
        return res.status(400).send({error: 'error'})
    }
});

router.put('/:userId', async(req, res) =>{
    try{
        await User.findByIdAndUpdate(req.params.userId, {
            password: req.body.password
        },{
            new: true
        })

        return res.status(200).send({status: 'update success'});
    }catch(err){
        console.log(err)
        return res.status(500).send({error: 'error'});
    }
})

module.exports = app => app.use('/auth', router);