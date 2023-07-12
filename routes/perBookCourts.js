const express = require('express')
const PerBookingModel = require('../models/permanantbooking')
const router = express.Router()
const bcrypt = require('bcryptjs')


// Getting All
router.get('/',async(req,res) =>{
    try{
        const users = await PerBookingModel.find() 
        res.json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Getting One
router.get('/:id',getPBooking,(req,res) =>{
    res.send(res.booking)
})

// Creating One
router.post('/',async(req,res) =>{
    
    try{

        // const salt = bcrypt.genSalt()
        //const hashedPassword = await bcrypt.hash(req.body.password,10)
        const{
            booking_item,
            booking_date_start,
            booking_date_end,
            booking_time_start,
            booking_time_end,
            booking_price,
            booking_status,
            booking_type,
            pay_status,
            players_count,
            day_of_week,
            court_no,
            userName
        } = req.body;
        const pbookObj = new PerBookingModel({
            booking_item,
            booking_date_start,
            booking_date_end,
            booking_time_start,
            booking_time_end,
            booking_price,
            booking_status,
            booking_type,
            pay_status,
            players_count,
            day_of_week,
            court_no,
            userName
            
        })

        const newPBooking = await pbookObj.save()
        res.status(201).json({message:"New Per Booking Created !!"})

    }catch(err){
        res.status(400).json({message:err.message})
    }
})
// Updating One
router.patch('/:id',getPBooking,(req,res) =>{

})
// Delete One
router.delete('/:id',getPBooking,async(req,res) =>{
    try{
        await res.user.remove()
        res.json({message:'User deleted Successfully !!'})

    }catch(err){
        res.status(500).json({message:err.message})
    }
})





//middleware to get a single user
async function getPBooking(req,res,next){

    let pbooking
    try{
        pbooking = await PerBookingModel.findById(req.params.id)
        if(pbooking == null){
            return res.status(404).json({message:'cannot find the Booking'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.booking = pbooking
    next()
}

module.exports = router