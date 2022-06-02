const favoriteService = require('../service/favoriteService')
const categoryService = require("../service/categoryService");
const reviewService = require("../service/reviewService");

class FavoriteController {

    async addFavorite (req, res) {
        const user_id = req.session.user.id
        const {content_id} = req.body

        const candidate = await favoriteService.findByOption({content_id})

        if (candidate) return res.json({error: 'Избранное уже добавлено'})

        await favoriteService.add({user_id, content_id})

        return res.json({message: 'Избранное добавлено'})
    }

    async getAllReviewByUser (req, res) {
        const user_id = req.session.user.id
        const favorites = await favoriteService.getByOption({user_id})
        return res.json(favorites)
    }

    async deleteFavorite (req, res) {
        const {content_id} = req.params
        const user_id = req.session.user.id

        const candidate = await favoriteService.findByOption({user_id, content_id})

        if (!candidate) return res.json({error: 'Избранного не существует'})

        await favoriteService.delete({id: candidate.id})

        return res.json({message: 'Избранное удалено'})
    }
}

module.exports = new FavoriteController()