const express = require("express");
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (request, response) => {
  response.json({message:"hello"})
})

app.listen(3000, () => {
  console.log("Ca fonctionne")
})
