const knex = require("../db/knex");


class NewsService {
    async add (news) {
        try {
            await knex('news').insert(news)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAll () {
        try {
            return knex('news')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('news').where(option).first()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(id) {
        try {
            return knex('news').where(id).del()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(id, data) {
        try {
            return knex('news').where(id).update(data)
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new NewsService()