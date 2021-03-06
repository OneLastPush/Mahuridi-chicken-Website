const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const i18n = require('i18n')

const Batch = require('../models/Batch')

//@desc     Login/Landing page
//@route    GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

//@desc     Dashboard
//@route    GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const batches = await Batch.find({ user: req.user.id, isDeleted: false }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            batches
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }


})

module.exports = router