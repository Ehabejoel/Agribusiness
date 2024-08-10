const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const dbConnector = require('./providers/conn')
const templatePath = path.join(__dirname , "../public/views/AuthView")
const pages = require('./appViews/app-pages')
const authRoute = require('./router/auth.route')

const PORT = process.env.PORT || 8000
const app = express()



dotenv.config()

//call db connector
 dbConnector.establishConnection()

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(cors({
  origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("../public"));
app.use('/api/auths', authRoute)

// getting all app Views
app.get('/', pages.RegistrationPage)
app.get('/auth/login', pages.LoginPage)



app.listen(PORT, (err) => {
   if(err) console.log("Error from server launch");
   console.log(`Server is running on port ${PORT}`);
})