const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// console.log(process.env.USER_NAME);

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.ujgfmru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://<username>:<password>@cluster0.ujgfmru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const carsCollection = client.db("carDealerDB").collection("cars");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.get("/cars", async (req, res) => {
      const cursor = carsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Car Dealer is Running");
});

app.listen(port, () => {
  console.log(`Car Dealer is Running on port : ${port}`);
});
