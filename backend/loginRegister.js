const express = require("express")
const router = express.Router()
const klient = require("./mongodb")
var cookieParser = require('cookie-parser');
const { ObjectId } = require("mongodb");

router.use(cookieParser());

klient.connect(err => {
    if (!err) console.log("Connected")
    else console.log(err)
})

const db = klient.db("Shop")
const users = db.collection("Users")
const newsletter = db.collection("Newsletter")
var timeAll = (3600 * 60) * 24 * 365 * 50

router.post('/login', async(req, res) => {
    try{
        const {email, password, dontLogMeOut} = req.body
        const user = await users.find({email: email, password : password}).toArray((err,item) => {
            return item
        })
        
        if(user == false){
            res.json({requestBody: {
                success: false,
            }})
        }else{
        let userId = user[0]._id
        let adresses = user[0].shoppingInfo
        let time = (3600 * 60) * 24
        if(dontLogMeOut === true){
            time = timeAll
        }

        if(adresses.length > 0){
            res.cookie("AdressAdded", true, {maxAge: timeAll, httpOnly: true, secure: true})
        }

        let cookie = res.cookie('loggedUser', userId, {maxAge: time, httpOnly: true, secure: true})
        if (cookie !== undefined){
            res.json({requestBody: {
                success: true,
                user: userId
            }})
        }else{
            res.json({requestBody: {
                success: false,
            }})
        }
    }
    }catch(err){
        console.log(err)
    }
})


router.get("/getCookie", (req, res) => {
    const userCookie = req.cookies.loggedUser

    if(userCookie !== undefined){
        res.json({data : true})
    }else{
        res.json({data : false})
    }
})
router.get("/getCookieAdress",(req, res) => {
    const userCookie = req.cookies.AdressAdded

    if(userCookie !== undefined){
        res.json({data : true})
    }else{
        res.json({data : false})
    }
})


router.get("/clearCookie", (req, res) => {
    res.clearCookie('loggedUser')
    res.clearCookie("AdressAdded")
    const userCookie = req.cookies.loggedUser

    res.json({data: userCookie})
})

router.post("/addUser", async (req,res) => {
    const user = req.body
    const {email} = req.body
    console.log(user)
    try{
        const addUser = await users.insertOne(user)
        const userId = await users.find({email : email}).toArray((err, item) => {
            return item
        })
        let userid = userId[0]._id
        let newsletter = userId[0].newsletter

        if(newsletter == true){
            let addToNewsletter = await newsletter.insertOne({email: email})
            res.cookie("Newsletter", true, {maxAge: timeAll, httpOnly: true, secure: true})
        }

        let cookie = res.cookie('loggedUser', userid , {maxAge: timeAll, httpOnly: true, secure: true})
        res.json({success: true , userId: userId})
    }catch(err){
        console.log(err)
        res.json({success: false , error: err})
    }
    
})

router.get("/registerCheck/:email", async (req,res) => {
    const {email} = req.params
    const isUserInDb = await users.find({email: email}).toArray((err,item) => {
        return item
    })
    const isAlreadyInDb = isUserInDb[0]

    if(!isAlreadyInDb){
        res.json({success: true})
    }else{
        res.json({success: false, desc: "User is already singed up. Try login to it"})
    }

})

router.post("/Account/AddAdress", async (req, res) => {
   let objectToAdd = req.body.params
   const userId = req.cookies.loggedUser
   try{
        const addAdress = await users.updateOne({_id : new ObjectId(userId)}, {$push : {shoppingInfo : objectToAdd}})
        res.cookie("AdressAdded", true, {maxAge: timeAll, httpOnly: true, secure: true})
        res.json({success : true}) 
   }catch(err){
        console.log(err)
        res.json({success : false}) 
   }
})

router.get("/getAdresses", async (req, res) => {
    const userId = req.cookies.loggedUser
    if(userId !== undefined){
       const address = await users.find({_id : new ObjectId(userId)}).toArray((err,item) => {
        return item
        })
        const {shoppingInfo, _id, email} = address[0]
        if(shoppingInfo.length > 0){
            res.json({success: true, shoppingInfo : shoppingInfo, _id:_id, email: email})
        }else{
            res.json({success: false, noAddress : true})
        } 
    }else
        res.json({success : false})
    
})
router.post("/deleteAdress", async (req,res) => {
    let {id,address} = req.body.params
    console.log(address)
    try{

        const prevAdresses = await users.find({_id : new ObjectId(id)}).toArray((err,item) => {
            return item
        })

        let {shoppingInfo} = prevAdresses[0]

        let newAdresess = shoppingInfo.filter(item => {
            if(JSON.stringify(item) !== JSON.stringify(address)){
                return item
            }
        })
      const currentAdress = await users.updateOne({_id : new ObjectId(id)}, {$set : {shoppingInfo : newAdresess}})
      if(newAdresess.length === 0){
        res.clearCookie("AdressAdded")
      }
      res.json({success : true}) 
    }catch(err){
        res.json({success : false})
    }
    
   
})


router.post("/emailNewsletterSub", async(req,res) => {
    const {_email} = req.body.params

    const isEmailInDB = await users.find({email: _email}).toArray(item => {
        return item
    })

    if(isEmailInDB.length >0){
        const {newsletter, _id}  = isEmailInDB[0]
        if(newsletter == false){
            const changeNewsletter = await users.updateOne({_id: new ObjectId(_id)}, {$set : {newsletter : true}})
        }else{
            res.json({success: false, msg: "User is already in singed"})
        }   
    }
    let addToNewsletter = await newsletter.insertOne({email: _email})
    res.cookie("Newsletter", true, {maxAge: timeAll, httpOnly: true, secure: true})      
    res.json({success: true})
})

router.get("/getAccount", async (req,res) => {
    const userId = req.cookies.loggedUser
    const user = await users.find({_id : new ObjectId(userId)}).limit(1).toArray(item => {
        return item
    })

    res.json({user : user})
})

router.post("/updateUserData", async (req, res) => {
    const user = req.body.params
    const userId = req.cookies.loggedUser
    try{
        const upDateUser = await users.updateOne({_id : new ObjectId(userId)},{ $set: user })
        res.json({success : true})
    }catch(err){
        res.json({success : false})
    }
})

router.post("/Account/changeAddress", async (req, res) => {
    const {user, targetAddress} = req.body.params
    const userId = req.cookies.loggedUser

    try {
        const changeLocation = await users.findOne({ _id: new ObjectId(userId) });

        if (!changeLocation) {
            res.json({ success: false, message: "User not found" });
            return;
        }

        const { shoppingInfo } = changeLocation;

        let newUserShoppingInfo = shoppingInfo.map(item => {
            return JSON.stringify(item) === JSON.stringify(targetAddress) ? user : item;
        });

        const upDateUser = await users.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { shoppingInfo: newUserShoppingInfo } }
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
    
})

router.get("/getOrders", async (req, res) => {
    const userId = req.cookies.loggedUser
    const user = await users.find({_id : new ObjectId(userId)}).limit(1).toArray(item => {
        return item
    })

    const { orders } = user[0]
    
    if(orders != undefined){
        res.json({success: true, orders : orders})
    }else
        res.json({success: false, msg: "You haven't made any orders yet"})
})


module.exports = router