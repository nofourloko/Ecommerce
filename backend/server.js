const express = require("express")
const path = require("path")
const app = express()
const port = process.env.PORT || 5000
const products = require("./products")
const loginRegister = require("./loginRegister")
const bodyParser = require('body-parser');
const payment = require("./payment")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.use("/api", products)
app.use(express.static(path.resolve(__dirname, '../frontend/public')))
app.use(express.urlencoded({extended : false}))
app.use("/", loginRegister)
app.use("/payment", payment)


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})