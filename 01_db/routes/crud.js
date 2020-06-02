const express = require('express')
const router = express.Router()
const crudController = require('../controllers/crud')

router.get('/', crudController.getAll)
router.get('/:id', crudController.getById)
router.post('/', crudController.post)
router.patch('/', crudController.patch)
router.delete('/:id', crudController.delete)

module.exports = router
