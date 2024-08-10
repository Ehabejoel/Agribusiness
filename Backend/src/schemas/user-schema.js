const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   username: {type: String},
   email: {type: String, unique: true},
   password: {type: String},
   phoneNumber: {type: String},
   remenberMe: {type: Boolean},
})

module.exports = {
    userSchema
}