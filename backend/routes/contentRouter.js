const Router = require('express')
const contentController = require('../controller/contentController')

const router = new Router()

router.post('/add', contentController.addContent)
router.get('/all', contentController.getAllContent)
router.put('/update', contentController.updateContent)
router.delete('/remove/:id', contentController.deleteContent)

module.exports = router