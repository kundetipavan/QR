const express = require('express');
const cors = require('cors');
require('dotenv').config();
const menuroutes = require('./routes/menuroutes');
const filterroutes = require('./routes/filterroutes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



const port = process.env.DB_PORT || 4000;

app.use("/api/m", menuroutes);
app.use("/api/cat", filterroutes);


app.listen(port,  ()=>{
    console.log(`Your Server Running at ${port}`);
})