const contentService = require("../service/contentService");
const uuid = require('uuid')
const path = require("path");

class ContentController {

    async addContent (req, res) {
        const {title, director, timing, release, description, country, genre, age_rating, category_id, trailer} = req.body
        const {poster} = req.files
        let fileName = uuid.v4() + ".jpg"

        poster.mv(path.resolve(__dirname, '..', 'static', fileName))

        const candidate = await contentService.findByOption({title, director})

        if (candidate) return res.json({error: 'Контент уже существует'})

        await contentService.add({title, director, timing, release, description, country, genre, age_rating, category_id, trailer, poster: fileName})

        return res.json({message: 'Контент создан'})
    }

    async getAllContent (req, res) {
        const contents = await contentService.getAll()
        return res.json(contents)
    }

    async updateContent (req, res) {

    }

    async deleteContent (req, res) {
        const {id} = req.params

        const candidate = await contentService.findByOption({id})

        if (!candidate) return res.json({error: 'Контента не существует'})

        await contentService.delete({id})

        res.json({message: 'Контент удален'})
    }

}

module.exports = new ContentController()