import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
    {
        userId : Number,
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(oleg) {

                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(oleg);
                },
                message: 'daun? incorrect data'
            }

        },
        password : String,
        userdata : {
            name : String,
            surname : String,
            middlename : String,
            birthdate : String,
            town : String,
            street : String,
            house : String,
            apartment : String,
            phoneNumber : String,

        },



    },{ timestamps: true }

)
export const User = models.User || mongoose.model('User', UserSchema)