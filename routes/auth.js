const express = require('express');
const router = express.Router()
const passport = require('passport');

router.get("/exito", (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            user: req.user
        })
    }
})

router.get("/error", (req, res) => {
    res.send("Error al registrarse")
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("https://google-front.vercel.app/")
})

router.get("/google", passport.authenticate("google", { scope:["profile"]}))

router.get("/google/callback", passport.authenticate("google",{
    successRedirect:"https://google-front.vercel.app/usuario",
    failureRedirect:"https://google-back.vercel.app/auth/error"
}))

module.exports = router