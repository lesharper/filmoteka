const knex = require("../db/knex");


class CategoryService {
    async add (category) {
        try {
            await knex('categories').insert(category)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAll () {
        try {
            return knex('categories')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('categories').where(option).first()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(id) {
        try {
            return knex('categories').where(id).del()
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new CategoryService()