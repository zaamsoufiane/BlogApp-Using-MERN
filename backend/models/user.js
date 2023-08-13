const mongoose = require('mongoose')
const {v1: uuid} = require('uuid')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type:String,
    },
}, {
    timestamps: true
})

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuid()
    this.hashed_password = this.cryptPassword(password)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    cryptPassword : function(password){
        if(!password){
            return ''
        }
        try {
            return crypto
                   .createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex')
        } catch (error) {
            return ''
        }
    },

    authenticate: function(password){
        return this.hashed_password === this.cryptPassword(password)
    } 
}

module.exports = mongoose.model('User', userSchema)