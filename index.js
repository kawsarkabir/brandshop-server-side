const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

// mongoDB config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvlfmu8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("brandShopDB").collection("user");
    const productCollection = client.db("brandShopDB").collection("product");
    const brandCollection = client.db("brandShopDB").collection("brand");

    // create a new user
    app.post('/user', async(req, res)=>{
        const newUser = req.body;
        console.log(newUser);
        res.send(await userCollection.insertOne(newUser));
    })

    // get data in database with get method
    app.get("/user", async (req, res) => {
        res.send(await userCollection.find().toArray());
      });




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("coming brand shop");
});
app.listen(port, () => {
  console.log(`brand shop site runing on:${port} `);
});
