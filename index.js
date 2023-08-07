const express = require('express');
const app = express();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obhaluk.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const dataBase = client.db('eShop')
    const dataCollection = dataBase.collection('dailyData')


    app.post('/data', async (req, res) => {
      const order = req?.body;
      console.log(order)
      const result = await dataCollection.insertOne(order)
      res.send(result)

    })
    app.get('/info',async(req,res)=>{
      const info= await dataCollection.find().toArray()
      console.log(info)
      res.send(info)
    })

    // app.get('/shop', (req, res) => {
    //   console.log("this is me what is yours problem")
    //   res.send('user management')
    // })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








// app.get('/shop', (req, res) => {
//   console.log("this is me what is yours problem")
//   res.send('user management')
// })
app.listen(port, () => {
  console.log(`server is running ${port}`)
})