const mongoose = require('../../database');

const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    institution:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
    },
    dateOfBirth:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
}, {versionKey: false});

ContactSchema.pre('save', async function(next){
    next();
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;