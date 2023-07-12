const mongoose = require('mongoose')

const perbookingSchema = new mongoose.Schema({
    booking_item:{
        type:String,
        required:true
    },
    booking_date_start:{
        type:String,
        required:true
    },
    booking_date_end:{
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
    booking_type:{
        type:String,
        required:true
    },
    pay_status:{
        type:String,
        required:true
    },
    players_count:{
        type:Number,
        required:true
    },
    day_of_week:{
        type:String,
        required:true
    },
    court_no:{
        type:Number,
        required:true
    },
    userName:{
        type:String,
        required:true
    }
    
})
module.exports =  mongoose.model('PerBookingModel',perbookingSchema)