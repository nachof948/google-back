const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const connectDB = require('./db/conexion');
const passportSetup = require('./config/google');
const authRoute = require('./routes/auth')
require('dotenv').config()


app.use(cookieSession({
    keys:[process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(
    cors({
    origin: "http://localhost:3000",
    methods:"GET, POST, PUT, DELETE",
    credentials: true
}))

app.use("/auth", authRoute)

const iniciar = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(4500, ()=> console.log(`Servidor en el http://localhost:4500`))
    }
    catch(err){
        console.log(err);
    }
}
iniciar()