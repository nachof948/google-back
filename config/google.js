const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GoogleUser = require('../models/GoogleUser')
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/auth/google/redirect"
},
    async (accessToken, refreshToken, profile, done) => {
        try{
            const usuarioRegistrado = await GoogleUser.findOne({googleId: profile.id})
            if(usuarioRegistrado){
                done(null, usuarioRegistrado)
            }
            else{
                const usuario = await new GoogleUser({
                    googleId: profile.id,
                    username: profile.displayName,
                    image:profile.photos[0].value
                }).save()
                done(null, usuario)
            }
        } catch(error){
            cd(null, error)
        }
    }
))

passport.serializeUser((usuario, done) =>{
    done(null, usuario)
})
passport.deserializeUser((usuario, done) =>{
    done(null, usuario)
})