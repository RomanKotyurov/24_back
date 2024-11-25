const express = require('express')
const app = express()
app.use(express.json());
const port = 2000
var cors = require('cors')

require('dotenv').config()

//#region Mongo DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect("mongodb+srv://rn1nhf:0drUxII9Xa7BQEz3@cluster0.22tlsbv.mongodb.net/food");

const Product = mongoose.model('Product', {
  name: String,
  image: String,
  ingredients: [String],
  description: String
});
//#endregion

app.use(cors())

app.get('/api/product', async (req, res) => {
  let allProducts = await Product.find()
  res.json(allProducts)
  // res.json({'status': true})
})

app.post('/api/product', async (req, res) => {
  let product = req.body
  if(!product._id) product._id = new mongoose.Types.ObjectId()
  await Product.findByIdAndUpdate(product._id, product, {upsert: true})
  res.json({'status': true})
})

app.get('/api/findProduct', async (req, res) => {
  let id = req.query.id
  let allProducts = await Product.findById(id).exec();
  res.json(allProducts)
})
  
app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`Lesson 24 http://localhost:${port}`)
})