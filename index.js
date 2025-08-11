const express = require("express");
const app = express();
const cors = require('cors')
const port = 5070;

// middleware app
app.use(express.json());

app.use(cors());






//test route 

app.get("/",(req,res)=>{
    res.send("server is running")
});


// start server 
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})