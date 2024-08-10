const RegistrationPage = (req, res) => {
    return res.render('Signup.hbs')
}

const LoginPage = (req, res) => {
    return res.render('login.hbs')
}

module.exports = {
    RegistrationPage,
    LoginPage
}