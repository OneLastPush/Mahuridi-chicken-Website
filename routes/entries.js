const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Batch = require('../models/Batch')
const Entry = require('../models/Entry')

//@desc     Process add form
//@route    POST /batches
router.post('/:id/addEntry', ensureAuth, async (req, res) => {
    try {
        req.body.batch = req.params.id
        await Entry.create(req.body)
        res.redirect(`/batches/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})


module.exports = router