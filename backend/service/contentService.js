const knex = require("../db/knex");


class ContentService {
    async add (content) {
        try {
            await knex('contents').insert(content)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAll () {
        try {
            return knex('contents')
                .leftJoin('categories', 'contents.category_id', 'categories.id')
                .select('categories.*', 'contents.*')

        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('contents').where(option).first()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete (id) {
        try {
            return knex('contents').where(id).del()
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new ContentService()