const express = require('express')
const BookingModel = require('../models/booking')
const router = express.Router()
const bcrypt = require('bcryptjs')


// Getting All
router.get('/',async(req,res) =>{
    try{
        const users = await BookingModel.find() 
        res.json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Getting One
router.get('/:id',getBooking,(req,res) =>{
    res.send(res.booking)
})

// Creating One
router.post('/',async(req,res) =>{
    
    try{

        // const salt = bcrypt.genSalt()
        //const hashedPassword = await bcrypt.hash(req.body.password,10)
        const{
            booking_item,
            booking_date,
            booking_time_start,
            booking_time_end,
            booking_price,
            booking_status,
            userName,
            firstName,
            lastName,
            email,
            contact,
            playersCount,
            createdBy
        } = req.body;
        const bookObj = new BookingModel({
            booking_item,
            booking_date,
            booking_time_start,
            booking_time_end,
            booking_price,
            booking_status,
            userName,
            firstName,
            lastName,
            email,
            contact,
            playersCount,
            createdBy
        })

        const newBooking = await bookObj.save()
        res.status(201).json({message:"New Booking Created !!"})

    }catch(err){
        res.status(400).json({message:err.message})
    }
})
// Updating One
router.patch('/:id',getBooking,async(req,res) =>{
    const{booking_date,booking_time_start,booking_time_end,booking_item,booking_price} = req.body
    if(booking_date !== null){
        res.booking.booking_date = booking_date;
    }
    if(booking_time_start !== null){
        res.booking.booking_time_start = booking_time_start;
    }
    if(booking_time_end !== null){
        res.booking.booking_time_end = booking_time_end;
    }
    if(booking_item !== null){
        res.booking.booking_item = booking_item;
    }
    if(booking_price !== null){
        res.booking.booking_price = booking_price;
    }
    try{
        const updated_booking = await res.booking.save();
        res.status(200).json(updated_booking)
    }catch(err){
         res.status(400).json({message:err.message})
        //res.send(err.message)
    }
    
})
// Delete One
router.delete('/:id',getBooking,async(req,res) =>{
    try{
        await res.booking.deleteOne();
        res.status(200).json({message:'Booking deleted Successfully !!'})

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//middleware to get a single user
async function getBooking(req,res,next){

    let booking
    try{
        booking = await BookingModel.findById(req.params.id)
        if(booking == null){
            return res.status(404).json({message:'cannot find the Booking'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.booking = booking
    next()
}

module.exports = router