const express = require("express")
const mongo = require("mongodb")
const router = express.Router()
const klient = require("./mongodb")
var cookieParser = require('cookie-parser');

router.use(cookieParser());


klient.connect(err => {
    if (!err) console.log("Connected")
    else console.log(err)
})

const db = klient.db("Shop")
const products = db.collection("Products")
var timeAll = (3600 * 60) * 24 * 365 * 50

router.get("/products", async (req,res) => {
    try{
        const db = await products.find({}).toArray((err, product) => {
            return product
        })
        res.status(201).json(db)
    }catch(err){
        console.log(err)
    }
})

router.get("/products/:item", async (req, res) => {
    try{
        const item = req.params.item
        const product = await products.find({_id: new mongo.ObjectId(`${item}`)}).toArray((err, product) => {
            return product
        })
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(404).send("No item")
    }
})

router.get("/products/kind/:kind", async (req, res) => {
    try{
        const item = req.params.kind
        const product = await products.find({"kind" : item}).toArray((err, product) => {
            return product
        })
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(404).send("No item")
    }
})

router.get("/products/search/:id" , async (req, res) => {
    try{
        let items = req.params.id
        items = items.split(",")

        console.log(items)
        const db = await products.find({"title" : { $in : items}}).toArray((err, product) => {
            return product
        })
        res.status(201).json(db)
    }catch(err){
        console.log(err)
        res.status(404).send("No item")
    }
})

router.post("/cart", async (req, res) => {
    let cartCookie = req.cookies.cart
    const { productsArray, emptyArray } = req.body.params
    
    if(emptyArray === true){
        try{
            res.cookie("cart", [productsArray], {maxAge: timeAll, httpOnly: true, secure: true})
            res.json({success : true})
        }catch(err){
            res.json({success : false})
        }

    }else {
        console.log(1)
        let newCartCookie = cartCookie.concat(productsArray)
        res.cookie("cart", newCartCookie, {maxAge: timeAll, httpOnly: true, secure: true})
        res.json({success : true})
    }
})

router.get("/cart", async (req, res) =>{
    try{
        const userCart = req.cookies.cart
        res.json({userCart : userCart})       
    }catch(err){
        res.json({userCart : []})
    }
})

router.post("/updateCart", async (req,res) => {
    const {productsCart} = req.body.params


    try{
        res.cookie("cart", productsCart, {maxAge: timeAll, httpOnly: true, secure: true})
        res.json({success : true})
    }catch(err){
        res.json({success : false})
    }
   
})


module.exports = router