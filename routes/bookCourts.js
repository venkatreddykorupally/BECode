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
        const bookObj = new BookingModel({

            booking_item:req.body.booking_item,
            booking_date:req.body.booking_date,
            booking_time_start:req.body.booking_time_start,
            booking_time_end:req.body.booking_time_end,
            booking_price:req.body.booking_price,
            booking_status:req.body.booking_status,
            userName:req.body.userName
        })

        const newBooking = await bookObj.save()
        res.status(201).json({message:"New Booking Created !!"})

    }catch(err){
        res.status(400).json({message:err.message})
    }
})
// Updating One
router.patch('/:id',getBooking,(req,res) =>{

})
// Delete One
router.delete('/:id',getBooking,async(req,res) =>{
    try{
        await res.user.remove()
        res.json({message:'User deleted Successfully !!'})

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