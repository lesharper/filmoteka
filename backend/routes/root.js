const Router = require('express')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const contentRouter = require('./contentRouter')
const ratingRouter = require('./ratingRouter')
const reviewRouter = require('./reviewRouter')
const newsRouter = require('./newsRouter')
const favoriteRouter = require('./favoriteRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/content', contentRouter)
router.use('/rating', ratingRouter)
router.use('/review', reviewRouter)
router.use('/news', newsRouter)
router.use('/favorite', favoriteRouter)



module.exports = router




