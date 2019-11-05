const Note = require('../models/note')
//list
module.exports.list = (req, res) => {
    Note.find({ userId: req.user._id })
        .then(notes => {
            res.send(notes)
        })

}

//show
module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({ userId: req.user._id, _id: id })
        .then((note) => {
            if (note) {// check if note is present in db if not found it gives null
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

//destroy
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findOneAndDelete({ userId: req.user._id, _id: id })
        .then((note) => {
            if (note) {
                res.json(note)
            }
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//update
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body

    Note.findOneAndUpdate({ userId: req.user._id, _id: id }, body, { new: true, runValidators: true /*it will allow to run validators in put */ })
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

//create
module.exports.create = (req, res) => {
    const body = req.body
    const note = new Note(body)
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })

}
