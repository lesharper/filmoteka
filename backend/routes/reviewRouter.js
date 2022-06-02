const Router = require('express')
const reviewController = require('../controller/reviewController')

const router = new Router()

router.post('/add', reviewController.addReview)
router.get('/:content_id', reviewController.getAllReviewByContent)
router.delete('/remove/:id', reviewController.deleteReview)

// router.put('/update', categoryController.check)


module.exports = router