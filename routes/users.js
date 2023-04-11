const express = require('express')
const UserModel = require('../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs')


// Getting All
router.get('/',async(req,res) =>{
    try{
        const users = await UserModel.find() 
        res.json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Getting One
router.get('/:id',getUser,(req,res) =>{
    res.send(res.user)
})

// Creating One
router.post('/',async(req,res) =>{
    
    try{

        // const salt = bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const userObj = new UserModel({

            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            contact:req.body.contact,
            address:req.body.address,
            userName:req.body.userName,
            password:hashedPassword
        })

        const newUser = await userObj.save()
        res.status(201).json({message:"New User Created !!"})

    }catch(err){
        res.status(400).json({message:err.message})
    }
})
// Updating One
router.patch('/:id',getUser,(req,res) =>{

})
// Delete One
router.delete('/:id',getUser,async(req,res) =>{
    try{
        await res.user.remove()
        res.json({message:'User deleted Successfully !!'})

    }catch(err){
        res.status(500).json({message:err.message})
    }
})





//middleware to get a single user
async function getUser(req,res,next){

    let user
    try{
        user = await UserModel.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:'cannot find the user'})
        }



    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.user = user
    next()
}

module.exports = router