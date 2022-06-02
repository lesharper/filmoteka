const categoryService = require('../service/categoryService')

class CategoryController {

    async addCategory (req, res) {
        const {category} = req.body

        const candidate = await categoryService.findByOption({category})

        if (candidate) return res.json({error: 'Категория уже существует'})

        await categoryService.add({category: category.toLowerCase()})
        return res.json({message: 'Категория добавлена'})
    }

    async getAllCategory (req, res) {
        const categories = await categoryService.getAll()
        return res.json(categories)
    }

    async deleteCategory (req, res) {
        const {id} = req.params

        const candidate = await categoryService.findByOption({id})

        if (!candidate) return res.json({error: 'Категории не существует'})

        await categoryService.delete({id})

        return res.json({message: 'Категория удалена'})
    }
}

module.exports = new CategoryController()