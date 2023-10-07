const Stripe = require('stripe')
const express = require("express")
const router = express.Router()
const klient = require("./mongodb")
const { ObjectId } = require('mongodb')
require("dotenv").config()

const stripe = Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

klient.connect(err => {
  if (!err) console.log("Connected")
  else console.log(err)
})

const db = klient.db("Shop")
const Orders = db.collection("Orders")
const Users = db.collection("Users")

let new_order = new Object()

router.post('/create-checkout-session', async (req, res) => {
    const {totalPrice, address} = req.body.params
    const cart = req.cookies.cart
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: { 
            currency: "usd" ,
          product_data: {
            name: "Petal Wardrobe Clothing"
          },
          unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-resolved?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/home/cart`,
    });

    try {
      res.json({success: true, url: session.url});

      new_order.id = session.id
      new_order.address = address
      new_order.totalPrice = totalPrice
      new_order.products = cart

    }catch(err){
      res.json({success: false})
    }

  });
  
  router.post("/paymentSuccess", async (req, res) => {
    const {id} = req.body.params
    const userCookie = req.cookies.loggedUser
    const orderDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

    if(new_order.id == id){
      delete new_order.id

      new_order.orderDate = orderDate
      const addOrder = await Orders.insertOne(new_order)
      const orderid = addOrder.insertedId

      if(userCookie !== undefined){
        const order = await Orders.find({_id : orderid}).toArray(item => {
          return item
        })

        const updateAccountData = await Users.updateOne(
          {_id : new ObjectId(userCookie)},
          { $push: { orders : { $each: order } } },
          { upsert: true })
      }
      res.clearCookie('cart')
      res.json({success: true, orderid : orderid})
    }
  })
  


module.exports = router