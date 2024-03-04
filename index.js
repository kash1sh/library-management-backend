const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");
const cors = require('cors');

require('dotenv/config'); 


const app = express(); 
const dataRoute = require('./routes/dataRoutes.js'); 

// const client = new MongoClient(process.env.MONGO_DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  

const PORT = process.env.PORT; 
  
// app.use(express.json()); 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
})) 

app.use(cors());

app.use('/', dataRoute);  

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });

  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);