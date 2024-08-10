const validatePasword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d)(.{8,})$/
    return passwordRegex.test(password)
}

const validateData = async (req, res, next) => {
    const {
       username, email, phonenumber, password, rememberMe
    } = req.body

    if(!username){
        return res.status(400).json({status: 'error', message: "Username is required"})
    }
    if(!email){
        return res.status(400).json({status: 'error', message: "Email is required"})
    }
    if(!phonenumber){
        return res.status(400).json({status: 'error', message: "Phone Nunber is required"})
    }
    if(!password){
        return res.status(400).json({status: 'error', message: "Password is required"})
    }
    if(!validatePasword(password)){
        return res.status(400).json({status: 'error', message: `
            Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 3 digits, and 1 symbol
        `})
    }

    next()
}


module.exports = {
    validateData
}