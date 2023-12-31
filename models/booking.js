const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    booking_item:{
        type:String,
        required:true
    },
    booking_date:{
        type:String,
        required:true
    },
    booking_time_start:{
        type:String,
        required:true
    },
    booking_time_end:{
        type:String,
        required:true
    },
    booking_price:{
        type:Number,
        required:true
    },
    booking_status:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    playersCount:{
        type:Number,
        required:true
    },
    createdBy:{
        type:String
    }
    
})
module.exports =  mongoose.model('BookingModel',bookingSchema)