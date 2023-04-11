require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB...'));

app.use(express.json())

app.get('/',(req,res) =>{
   res.send('Backend Server Greets you...')
})
// Define our Routes 
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const bookingRouter = require('./routes/bookCourts')

app.use('/users',usersRouter)
app.use('/login',loginRouter)
app.use('/bookings',bookingRouter)


app.listen(9000,() => console.log('Server has Started...'))