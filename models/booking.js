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
    }
    
})
module.exports =  mongoose.model('BookingModel',bookingSchema)