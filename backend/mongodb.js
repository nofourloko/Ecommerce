const mongo = require("mongodb")
const url = "mongodb://localhost:27017"
const klient = new mongo.MongoClient(url)

module.exports = klient