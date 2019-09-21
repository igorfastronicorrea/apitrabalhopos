const express = require('express');
const Contact = require('../models/contact');

const router = express.Router();


router.post('/:userId/contact/create', async(req, res) =>{
    try{
        console.log(req.params.userId)
        const users = req.params.userId;
        const contact = await Contact.create({...req.body, user: users});

        return res.status(200).send({contact});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'contact not created'});
    }
});

router.get('/:userId/contacts', async(req, res) =>{
    try{
        const contacts = await Contact.find({'user': req.params.userId})
        return res.status(200).send({'contacts': contacts});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'contact not listed'});
    }
});

router.put('/:userId/contacts/:contactId', async(req, res) =>{
    try{
        const contact = await Contact.findByIdAndUpdate(req.params.contactId, {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            institution: req.body.institution,
            photo: req.body.photo,
            dateOfBirth: req.body.dateOfBirth,
        },{
            new: true
        })

        return res.status(200).send({status: 'update success'});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'contact not have updated'})
    }
});

router.delete('/:userId/contact/:contactId', async(req, res) =>{
    try{
        await Contact.findByIdAndRemove(req.params.contactId);

        return res.status(200).send({message: 'contact deleted with success'})
        
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'contact are cannot deleted'});
    }
});

module.exports = app => app.use('/userid', router);