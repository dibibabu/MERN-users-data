const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

require('../Db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send("i am the router")
})
//PROMISE METHOD
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(402).json({ error: "pls fill aqquirate data" })
//     }

//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(402).json({ error: "user allready exist" })
//         }

//         const user=new User({name, email, phone, work, password, cpassword})
//         user.save().then(()=>{
//             return res.status(201).json({ message: "user registered successfully" }).catch((err)=>{
//                 res.status(500).json({error:"registration failed"})
//             })
//         }).catch((err)=>{
//             console.log(err);
//         })

//     })

// })
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(402).json({ error: "pls fill aqquirate data" })
    }
    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "user allready exist" })
        }
        const user = new User({ name, email, phone, work, password, cpassword })
        await user.save()
        res.status(201).json({ message: "user registered successfully" })
    } catch (err) {

        console.log(err);



    }

})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ "message": "pls fill" })

        }
        const userLogin = await User.findOne({ email: email })
        console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token=await userLogin.generateAuthToken()
            console.log(token);
            res.cookie("jwttoken",token,{
               expires:new Date(Date.now()+2589200000),
               httpOnly:true 
            })

            if (!isMatch) {

                res.status(400).json({ error: "No user found" })

            } else {
                res.json({ "message": "Login success" })

            }
        } else {
            res.json({ "message": "user does not exist" })
        }


    } catch (error) {
        console.log(error);
    }

})



module.exports = router;