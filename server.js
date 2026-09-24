const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const cookieparser = require('cookie-parser')

require("dotenv").config();

// console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

// console.log(
//   "RAZORPAY SECRET EXISTS:",
//   !!process.env.RAZORPAY_KEY_SECRET
// );

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));
app.use(cookieparser())

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("DB Connected Sucessfully")
}).catch((error)=>{
    console.log(error)
});

app.use('/api', require('./routes/productroutes'));

app.use("/api", require("./routes/authRoutes"));

app.use('/api', require('./routes/cartRoutes'));

app.use('/api', require('./routes/contactRoutes'));

app.use("/api", require("./routes/paymentRoutes"));

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerFile))

app.listen(5000, () => console.log('Server running'));