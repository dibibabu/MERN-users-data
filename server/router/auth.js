const express = require('express')
const router = express.Router()

require('../Db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send("i am the router")
})

router.post('/register', (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(402).json({ error: "pls fill aqquirate data" })
    }

    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.status(402).json({ error: "user allready exist" })
        }

        const user=new User({name, email, phone, work, password, cpassword})
        user.save().then(()=>{
            return res.status(201).json({ message: "user registered successfully" }).catch((err)=>{
                res.status(500).json({error:"registration failed"})
            })
        }).catch((err)=>{
            console.log(err);
        })

    })

})

module.exports = router;