
const express = require('express')
const app = express()
require('./Db/conn')
const User=require('./model/userSchema')


//mongodb connection

//middleware

const middleware = (req, res, next) => {
    console.log("i am the middleware");

}

middleware();

app.get('/', (req, res) => {
    res.send("hello world")
})
app.get('/about', (req, res) => {
    res.send("about")
})

app.get('/contact', (req, res) => {
    res.send("contact")
})
app.get('/login', (req, res) => {
    res.send("Login")
})
app.get('/signup', (req, res) => {
    res.send("Signup")
})

app.listen(300, () => {
    console.log("server connected successfully");
})