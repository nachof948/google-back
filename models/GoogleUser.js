const mongoose = require('mongoose')

const googleUserSchema = new mongoose.Schema({
    username:{
        type: String
    },
    image:{
        type:String
    },
    googleId:{
        type:String
    }
})

const GoogleUser = mongoose.model('GoogleUsuario', googleUserSchema)
module.exports = GoogleUser