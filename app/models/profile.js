const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
    skills:{
        type:String,
        required:true,
    },
    hobbies:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Profile = mongoose.model('Profile',profileSchema)

module.exports = Profile