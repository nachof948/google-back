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
    res.redirect("http://localhost:3000/")
})

router.get("/google", passport.authenticate("google", { scope:["profile"]}))

router.get("/google/redirect", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/usuario",
    failureRedirect:"/error"
}))

module.exports = router