const newsService = require("../service/newsService");

class NewsController {

    async addNews (req, res) {
        const {title, body} = req.body

        const candidate = await newsService.findByOption({title})

        if (candidate) return res.json({error: 'Новость с таким названием уже существует'})

        await newsService.add({title, body})
        return res.json({message: 'Новость добавлена'})
    }

    async getAllNews (req, res) {
        const categories = await newsService.getAll()
        return res.json(categories)
    }

    async updateNews (req, res) {

    }

    async deleteNews (req, res) {
        const {id} = req.params

        const candidate = await newsService.findByOption({id})

        if (!candidate) return res.json({error: 'Новости не существует'})

        await newsService.delete({id})

        return res.json({message: 'Новость удалена'})
    }

}

module.exports = new NewsController()