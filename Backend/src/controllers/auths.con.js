const {UserModel} = require('../models/user-model')
const hash = require('bcrypt')

async function RegisterUser(req, res){
    let {
        username, email, phonenumber, password, rememberMe
     } = req.body

     try {
         const isOldUser = await UserModel.findOne({email: email})
         if(isOldUser){
             return res.status(400).json({status: 'error', message: "Account Already in Use. Please create another one"})
         }else{
            const saltRound = 10
             let passwordHash = await hash.hash(password, saltRound)
             await new UserModel({
                 username: username,
                 email: email,
                 password: passwordHash,
                 phoneNumber: phonenumber,
                 remenberMe: !rememberMe ? false : rememberMe
             })
                .save()
                .then(() => {
                    return res.status(201).json({status: "success", message: "Account created successfully"})
                })
         }
     } catch (error) {
        console.log(error);
        return res.status(500).send();
     }
}


async function Login (req, res){
    const {
        email, password
    } = req.body

    if(!email){
        return res.status(400).json({status: 'error', message: "Email is required"})
    }
    if(!password){
        return res.status(400).json({status: 'error', message: "Password is required"})
    }

    try {
        const isValidAccount = await UserModel.findOne({email: email})
        if(isValidAccount){
            const correctPassword = await hash.compare(password, isValidAccount.password)
            if(correctPassword){
                return res.status(200).json({status: "OK", message: 'Login successfull'})
            }else{
                return res.status(400).json({status: 'error', message: "Invalid email or password"})
            }
        }else{
            return res.status(404).json({status: 'error', message: "Account not found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}



module.exports = {
    RegisterUser,
    Login
}