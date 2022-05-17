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

//@desc     Delete entry
//@route    Delete /:batchId/entries/:entryId
router.delete('/:batchId/entries/:entryId', ensureAuth, async (req, res) => {
    try {
        let entry = await Entry.findById(req.params.entryId).populate('batch').lean()

        if (!entry || !entry?.batch) {
            return res.render('error/404')
        }

        if (entry.batch.user._id != req.user.id) {
            res.redirect('/batches')
        } else {
            entry = await Entry.deleteOne({ _id: req.params.entryId })

            res.redirect('/dashboard')
        }

    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }
})


module.exports = router