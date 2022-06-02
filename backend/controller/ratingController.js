const ratingService = require('../service/ratingService')

class CategoryController {

    async setRating (req, res) {
        const user_id = req.session.user.id
        const {content_id, rating} = req.body

        const candidate = await ratingService.findByOption({user_id, content_id})

        if (candidate) {
            await ratingService.update(candidate.id, {user_id, content_id, rating})
            return res.json({message: 'Рейтинг обновлен'})
        }

        await ratingService.add({user_id, content_id, rating})
        return res.json({message: 'Рейтинг установлен'})
    }

    async getAllRating (req, res) {
        const ratings = await ratingService.getAll()
        return res.json(ratings)
    }

    async getRatingByContent (req, res) {
        const user_id = req.session.user.id
        const {content_id} = req.params
        const rating = await ratingService.findByOption({user_id, content_id})
        return res.json(rating)
    }
}

module.exports = new CategoryController()