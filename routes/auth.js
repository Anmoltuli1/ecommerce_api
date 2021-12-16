const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//REGISTER

router.post("/register", async(req, res) => {

    const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err){
        res.status.json(err);
    }
});

//LOGIN

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("wrong credentials!");


        const accessToken = jwt.sign(
            {
            id: user._id,
            isAdmin: user.isAdmin,
            },
            process.env.JWT_KEY,
            {expiresIn:"3d"},
            )
   
        const { password, ...others} = user._doc;

        res.status(200).json({others, accessToken});
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;