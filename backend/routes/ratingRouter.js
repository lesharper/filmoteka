const Router = require('express')
const ratingController = require('../controller/ratingController')

const router = new Router()

router.post('/set', ratingController.setRating)
router.get('/all', ratingController.getAllRating)
router.get('/:content_id', ratingController.getRatingByContent)

module.exports = router