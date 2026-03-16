const dotenv = require('dotenv')
require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("DB Connected Sucessfully")
}).catch((error)=>{
    console.log(error)
});

app.use('/api', require('./routes/productroutes'));

app.use("/api", require("./routes/authRoutes"));

app.use('/api', require('./routes/cartRoutes'))

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerFile))

app.listen(5000, () => console.log('Server running'));