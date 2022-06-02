const reviewService = require('../service/reviewService')
const newsService = require("../service/newsService");

class ReviewController {

    async addReview (req, res) {
        const user_id = req.session.user.id
        const {content_id, review} = req.body

        await reviewService.add({user_id, content_id, review })
        return res.json({message: 'Отзыв добавлен'})
    }

    async getAllReviewByContent (req, res) {
        const { content_id } = req.params
        const ratings = await reviewService.getByOption({content_id})
        return res.json(ratings)
    }

    async deleteReview (req, res) {
        const { id } = req.params

        console.log(id)
        const candidate = await reviewService.findByOption({id})

        if (!candidate) return res.json({error: 'Отзыва не существует'})

        await reviewService.delete({id})

        return res.json({message: `Отзыв ${id} удален`})
    }
}

module.exports = new ReviewController()