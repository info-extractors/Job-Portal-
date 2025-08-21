const User = require('../models/User.js');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job.js');


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async(res,req) => {
    try{

        const {name,email,password,role} = req.body;

        if (!name || !email || !password || !role){
            return res.status(400).json({msg : "All field required"});
        }

        //see if the user already exists 
        const existing = User.findOne({email});
        if (existing) return res.status(401).json({mesage : "User already exist"});

        const hashPassword = await bycrypt.hash(password,10);
        const newUser = User.create({
            name : name,
            email : email,
            password : hashPassword,
            role : role
        });

        return res.status(400).json({message : "Registration done successfully"});

    } catch(error){

     console.error("Server Error:",error);
     return res.status(500).json({message : "Server Issue"});

    }
}


const login = async(req,res) => {
    try{

        const {email,password} = req.body;

        const user = await User.findOne({email : email});
        if (!user) return res.status(400).json({message : 'Invalid email or password'});

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({message : 'Invalid password'});

        const token = jwt.sign(
            {
                id : user._id,
                role : user.role
            },
            JWT_SECRET,
            {
                expiresIn : '2h'
            }
        );

        res.status(200).json({
            token,
            user : {
                id : user._id,
                name : user.name,
                role : user.role
            }
        });

    }catch(err){
        console.error("Error in server:",err);
        return res.status(500).json({
            message : "Server Issue"
        })
    }
};


module.exports = {register,login};
