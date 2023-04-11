const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const UserModel = require('../models/user')

// User Authentication
router.post('/',async(req,res) =>{
    
    const usermodel = await UserModel.find()
    const userLog = usermodel.find(user => user.userName == req.body.userName) 
    res.set('Access-Control-Allow-Origin', '*');
    if(userLog == null){
        res.status(400).send('User Not Found')
    }
    try{
        if(await bcrypt.compare(req.body.password,userLog.password)){
           // res.send('Success')
           res.send({
            firstName:userLog.firstName,
            lastName:userLog.lastName,
            email:userLog.email,
            contact:userLog.contact,
            address:userLog.address,
            userName:userLog.userName,
            isAdmin:userLog.isAdmin
        })
        }else{
            res.send('You are not Authorized')
        }

    }catch(err){
        res.status(500).send()
    }
    res.send(res.user)
})

module.exports = router