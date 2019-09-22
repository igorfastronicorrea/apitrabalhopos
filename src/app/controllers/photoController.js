const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();

router.post('/upload',  multer(multerConfig).single('file'), async(req, res) =>{

    console.log(req.file);

    return res.status(200).send({message: `http://159.65.170.3:3000/${req.file.filename}`})
});

module.exports = app => app.use('/photo', router);