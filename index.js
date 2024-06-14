const express = require('express');
const cors = require('cors');


require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


console.log(process.env.DB_PASSS);




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSS}@cluster0.kgkkymv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
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
    await client.connect();
    console.log("db connected")
    const itemsCollection = client.db('artDB').collection('items');
    const subCategoriesCollection = client.db('artDB').collection('subCategories');
app.post('/items', async (req, res) => {
    const newitem = req.body;
    // console.log(newuser);
    const result = await itemsCollection.insertOne(newitem);
    console.log(result);
    res.send(result);
  })



app.get('/items', async (req, res) => {
  const result = await itemsCollection.find().toArray();
  res.send(result);
})
app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await itemsCollection.findOne(query);
    res.send(result);
  })

  // update data


app.put('/items/:id', async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const options = { upsert: true };
    const updateditem = req.body;
  
    const item = {
        $set: {
            item: updateditem.item, 
            category: updateditem.category, 
            price: updateditem.price, 
            rating: updateditem.rating, 
            ptime: updateditem.ptime, 
            customization: updateditem.customization, 
            stockstatus: updateditem.stockstatus, 
            image: updateditem.image, 
            sdescription: updateditem.sdescription, 
            email: updateditem.email, 
            displayname: updateditem.displayname, 

        }
    }
  
    
  
    const result = await itemsCollection.updateOne(filter, item, options);
    res.send(result);
  })
  // update done

  app.get('/subcats', async (req, res) => {
    const result = await subCategoriesCollection.find().toArray();
    res.send(result);
  })

  // delete processs start
app.delete('/items/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await itemsCollection.deleteOne(query);
    res.send(result);
  })
  
  // delete process done

  
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get('/', (req, res) => {
    res.send('assignment-10 server   is running')
})

app.listen(port, () => {
    console.log(`assignment-10 is running on port: ${port}`)
})

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Mujibmarziya/assignment-10-server-site.git
// git push -u origin main

