const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/noteController')
const categoriesController = require('../app/controllers/categoryController')
const userController = require('../app/controllers/userController')
const { authenticatorUser } = require('../app/middlewares/authentication')

router.post('/register', userController.register)
router.get('/account', authenticatorUser, userController.account)
router.delete('/logout', authenticatorUser, userController.logout)
router.post('/login', userController.login)

router.get('/notes', authenticatorUser, notesController.list)
router.post('/notes', authenticatorUser, notesController.create)
router.get('/notes/:id', authenticatorUser, notesController.show)
router.put('/notes/:id', authenticatorUser, notesController.update)
router.delete('/notes/:id', authenticatorUser, notesController.destroy)

router.get('/categories', categoriesController.list)
router.post('/categories', categoriesController.create)



module.exports = router
