const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://sndpbag4you:Sandipan123@cluster0.h1hso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("mydb");
    usersCollection = db.collection("usersTable");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

connectDB();

// ----------------- CRUD API -----------------

// CREATE - Add a new user
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
     
    const result = await usersCollection.insertOne(user);
    res.status(201).json({ message: "User created", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// READ - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});


// READ - Get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
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

// DELETE - Delete user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "User deleted", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server http://localhost:5000 running on port  ${port}`);
});



 


// For your CRUD API, typically:

// 201 → When creating a new user (POST /users).

// 200 → When reading or updating successfully.

// 204 → When deleting and returning no data.

// 400 → When user input is wrong.

// 404 → When user not found.

// 500 → When something fails on the server.




// function App() {
//   const handleSubmit = async () => {
//     const user = {
//       name: "Sandipan",
//       email: "sndp@gmail.com"
//     };

//     try {
//       const response = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//       });

//       const data = await response.json();
//       console.log("Server Response:", data);
 
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Send Data to MongoDB</h1>
//       <button onClick={handleSubmit}>Send</button>
//     </div>
//   );
// }

// export default App;