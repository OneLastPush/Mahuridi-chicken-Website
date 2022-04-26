const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc     Auth with Google
//@route    GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


//@desc     Auth with Twitch
//@route    GET /auth/twitch
router.get('/twitch', passport.authenticate("twitch"))

//@desc     Google auth callback
//@route    GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google',
    { failureRedirect: '/' }), (req, res) => {
        res.redirect('/dashboard')
    })

//@desc     Twitch auth callback
//@route    GET /auth/twitch/callback
router.get('/twitch/callback', passport.authenticate('twitch',
    { failureRedirect: '/' }), (req, res) => {
        res.redirect('/dashboard')
    })

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router