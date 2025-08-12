const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require('cors')
const port = 5070;

// middleware app
app.use(express.json());

app.use(cors());


// mongodb connection 
// MongoDB connection 

const uri = "mongodb+srv://rafikakhatun:Rafika786@cluster0.ybxfupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let usersCollection;

async function connectDB() {

    try{
        await client.connect();
        console.log("connect to mongoDB")

        const db = client.db("myDb"); // create database 
        usersCollection = db.collection("userTable"); // create database collection 
    }catch(error){
        console.log("mongoDB connection faild",error);
    }


    
}
connectDB()






//test route 

app.get("/",(req,res)=>{
    res.send("server is running now")
});


// start server 
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})