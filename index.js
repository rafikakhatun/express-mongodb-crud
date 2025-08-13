const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require('cors')
const port = 5070;

// middleware app
app.use(express.json());

app.use(cors());


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

/* --- CRUD ROUTES for --- */

// cretate POST API 
app.post('/users', async(req,res)=>{
    try{
        const user = req.body; 
        console.log(user)

        const result = await usersCollection.insertOne(user);
        res.status(201).json({massage:"user created", data:result});
         
    }catch(error){
        res.status(500).json({massage:"Error creating user",error})
    }
})

// READ - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// UPDATE - Update user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    res.json({ message: "User updated", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});




// start server 
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})