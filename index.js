const express = require("express");
const app = express();
const port = 5070;








//test route 

app.get("/",(req,res)=>{
    res.send("server is running")
});


// start server 
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})