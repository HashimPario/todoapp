const Users = require('../models/userModel')
const Todos = require('../models/todoModel')
const req = require('express/lib/request')
const bcrypt = require('bcrypt')





const userCtrl = {

    register: async (req, res) => {
        try {
            const { name, email, password,userId } = req.body
            
            if(!name || !email || !password)
            return res.status(400).json({msg: "Please fill all the fields"})
            
            // regex for validate email
            if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid email"})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exist"})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must be atleast 6 characters"})

            const passwordHash = await bcrypt.hash(password,12)

            const addUser = new Users({
                name, email, password: passwordHash, userId
            })
            await addUser.save();
            res.json({msg: "Registered Successfully"})

           
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })

            if (!user) return res.status(400).json({ msg: "Email Not Exist" })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" })

            res.json({ msg: "Login Successfull" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    home: async (req, res) => {
        try {
            const { todoData,email} = req.body
            
            if(!todoData)
            return res.status(400).json({msg: "Please fill the field"})
           

            const addData = new Todos({
                todoData, email
            })
            await addData.save();
            res.json({msg: "Data Saved"})

           
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getalldata: async(req,res) => {
        const {email} = req.params;
        const allpost = await Todos.find({email:email});
        res.json(allpost);
      
        // const userPost = await Todos({ email })
        // res.json(userPost.todoData);
     },

     
     deletedata: async(req,res)=>{
        try {
           
            const del = await Todos.findByIdAndDelete(req.params._id)
            res.json({msg: "Data deleted"})
    
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
     },

     editdata: async(req,res) => {
        try {
            const {todoData} = req.body
            await Todos.findByIdAndUpdate(req.params._id,{
                todoData
            })
            res.json({msg: "Update succuss!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

        

}

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


module.exports = userCtrl