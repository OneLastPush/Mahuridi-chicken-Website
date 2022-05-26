
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Batch = require('../models/Batch')
const Entry = require('../models/Entry')

//@desc     User batches
//@route    GET /batches/user/:userid
router.get('/:userId', ensureAuth, async (req, res) => {
    try {
        const batches = await Batch.find({
            user: req.params.userId
        })
            .populate('user')
            .lean()

        res.render('user/index', {
            batches
        })

    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }
})

module.exports = router