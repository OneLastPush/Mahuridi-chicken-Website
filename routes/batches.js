const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Batch = require('../models/Batch')

//@desc     Show add page
//@route    GET /batches/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('batches/add')
})

//@desc     Process add form
//@route    POST /batches
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Batch.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

//@desc     Show single batch
//@route    GET /batches/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let batch = await Batch.findById(req.params.id)
            .populate('user')
            .lean()

        if (!batch) {
            return res.render('error/404')
        }

        res.render('batches/show', {
            batch
        })

    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }
})

//@desc     User batches
//@route    GET /batches/user/:userid
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const batches = await Batch.find({
            user: req.params.userId
        })
            .populate('user')
            .lean()

        res.render('batches/index', {
            batches
        })
    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }
})

//@desc     Show edit page
//@route    GET /batches/edit/id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const batch = await Batch.findOne({
            _id: req.params.id
        }).lean()

        if (!batch) {
            return res.render('error/404')
        }

        if (batch.user != req.user.id) {
            res.redirect('/batches')
        } else {
            res.render('batches/edit', {
                batch,
            })
        }
    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }

})

//@desc     Update batch
//@route    PUT /batches/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let batch = await Batch.findById(req.params.id).lean()

        if (!batch) {
            return res.render('error/404')
        }

        if (batch.user != req.user.id) {
            res.redirect('/batches')
        } else {
            batch.updatedAt = Date.now()
            if (batch.stage === "Ended") {
                batch.active = false
            } else {
                batch.active = true
            }

            batch = await Batch.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            res.redirect('/dashboard')
        }
    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }
})

//@desc     Delete batch
//@route    Delete /batches/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        let batch = await Batch.findById(req.params.id).lean()

        if (!batch) {
            return res.render('error/404')
        }

        if (batch.user != req.user.id) {
            res.redirect('/batches')
        } else {
            batch = await Batch.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            res.redirect('/dashboard')
        }

    } catch (err) {
        console.log(err)
        return res.render('error/500')
    }
})

module.exports = router