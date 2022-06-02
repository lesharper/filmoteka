const Router = require('express')
const favoriteController = require('../controller/favoriteController')

const router = new Router()

router.get('/', favoriteController.getAllReviewByUser)
router.post('/add', favoriteController.addFavorite)
router.delete('/remove/:content_id', favoriteController.deleteFavorite)

module.exports = router