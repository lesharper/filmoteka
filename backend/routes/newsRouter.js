const Router = require('express')
const newsController = require('../controller/newsController')

const router = new Router()

router.post('/add', newsController.addNews)
router.get('/all', newsController.getAllNews)
router.put('/update', newsController.updateNews)
router.delete('/remove/:id', newsController.deleteNews)

module.exports = router