const Note = require('../models/note')

// list
module.exports.list = (req, res) => {
    Note.find({userId: req.user._id}).populate('categoryId')
        .then((notes) => {
            res.json(notes)
        })
}

// create
module.exports.create = (req, res) => {
    const body = req.body
    const note = new Note(body)
    note.userId = req.user._id
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

// show
module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({userId: req.user._id, _id: id}).populate('categoryId')
        .then((note) => {
            // note will be either object or null
            if (note) { // check to see if the note is present in db
                res.json(note) // send note
            } else {
                res.json({}) // send empty obj
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

// destroy 
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findOneAndDelete({userId: req.user._id, _id: id})
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

// update
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({userId: req.user._id, _id:id}, body, { new: true, runValidators: true })
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}