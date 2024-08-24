import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new Schema ({
    userName: {type: String, required: true, unique: true, minLength: 3},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
})

// hash password before saving user to database
userSchema.pre('save', async function (next) {
    try { //new password or changed password? 
        if (!this.isModified('password')) {
            next()
        }else {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
        }
    }catch (err) {
        next(err)
    }
})

// authentication method added to schema
userSchema.methods.authenticate = async function (passwordInput) {
    return await bcrypt.compare(passwordInput, this.password)
}

export const User = model('User', userSchema)