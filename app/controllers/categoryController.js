const Category = require('../models/category')


//list
module.exports.list = (req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            res.json(err)
        })
}

//create
module.exports.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then((cat) => {
            res.json(cat)
        })
        .catch((err) => {
            res.json(err)
        })
}
