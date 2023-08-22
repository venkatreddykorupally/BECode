require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB...'));

app.use(express.json())
app.use(cors({
  origin:'*'
}))

app.get('/',(req,res) =>{
   res.send('Backend Server Greets you...')
})
// Define our Routes 
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const bookingRouter = require('./routes/bookCourts')
const pbookingRouter = require('./routes/perBookCourts')

app.use('/users',usersRouter)
app.use('/login',loginRouter)
app.use('/bookings',bookingRouter)
app.use('/perbookings',pbookingRouter)


app.listen(9000,() => console.log('Server has Started...'))
