const Router = require('express')
const categoryController = require('../controller/categoryController')

const router = new Router()

router.post('/add', categoryController.addCategory)
router.get('/all', categoryController.getAllCategory)
router.delete('/remove/:id', categoryController.deleteCategory)
// router.put('/update', categoryController.check)


module.exports = router