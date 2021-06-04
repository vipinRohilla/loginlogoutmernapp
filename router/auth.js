const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')

require('../db/conn');
const User = require('../model/userSchema');

router.get('/',(req, res)=>{
    res.send(`Hello world from the server(router)`);
})


// <--------------------------using promises------------------------->
// router.post('/register', (req, res)=>{

//     const {name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return res.status(422).json({error: "error error"});
//     }

//     User.findOne({email: email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user
//         .save()
//         .then(() => {
//             res.status(201).json({message: "user registered"});
//         })
//         .catch((err) => {
//             res.status(500).json({error: "failed"});
//         });
//     }).catch((err)=>{
//         console.log(err);
//     });
// });

// <--------------------------------using async method-------------------------------->

router.post('/register', async (req, res)=>{

        const {name, email, phone, work, password, cpassword} = req.body;
    
        if(!name || !email || !phone || !work || !password || !cpassword)
        {
            return res.status(422).json({error: "error error"});
        }
        try{
            const userExist = await User.findOne({email: email});

            if(userExist){
                return res.status(422).json({error: "Email already exist"});
            }else if(password != cpassword)
            {
                return res.status(422).json({error: "password error"});
            }
            else{
                const user = new User({name, email, phone, work, password, cpassword});
                await user.save();
                res.status(201).json({message: "user registered"});
            }
            
        }
        catch(err)
        {
            console.log(err);
        }
    });

    router.post('/signin', async (req, res) => {
        let token;
        try{
            const { email, password } = req.body;
            if(!email || !password)
            {
                return res.status(400).json({error: "Fill the data"})
            }
            const userLogin = await User.findOne({email: email});
            if(userLogin)
            {
                const isMatch = await bcrypt.compare(password, userLogin.password);

                token = await userLogin.generateAuthToken();

                res.cookie("jwtoken", token,{
                    expires: new Date(Date.now() + 2592000000),  //2592000000 millisecond = (30 days)
                    httpOnly: true
                })
                if(!isMatch)
                {
                    res.status(400).json({error: "Invalid Credientials"})
                }else{
                    res.json({message: "User Sign in Successfully"})
                }
            }else{
                res.status(400).json({message: "Invalid Credientials"})
            }
        }
        catch(err){
            console.log(err);
        }
    });


    router.get('/about', authenticate, (req, res) => {
        // console.log(`about page`)
        res.send(req.rootUser)
    })



    router.get('/getdata', authenticate, (req, res) =>{
        console.log(`getdata page`)
        res.send(req.rootUser)
    })

    router.post('/contact', authenticate, async (req, res)=>{
        try{
            const {name, email, message} = req.body

            if(!name || !email || !message)
            {
                console.log("error message")
                return res.json({error:"plz filled the contact form"})
            }

            const userContact = await User.findOne({_id:req.userID})
            if(userContact)
            {
                const userMessage = await userContact.addMessage(name, email, message)
                await userContact.save();
                res.status(201).json({message: "user contact successfully"});
            }
        }catch(err)
        {
            console.log(err);
        }
        })


        router.get('/logout', (req, res) => {
            console.log(`logout page`)
            res.clearCookie('jwtoken', {path:'/'})
            res.status(200).send('user logout')
        })
module.exports = router;