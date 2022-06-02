const knex = require("../db/knex");


class FavoriteService {

    async add(category) {
        try {
            await knex('favorites').insert(category)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getByOption(option) {
        try {
            return knex('favorites').where(option)
                .leftJoin('contents', 'favorites.content_id', 'contents.id')
                .select('contents.poster', 'favorites.*')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('favorites').where(option).first()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(id) {
        try {
            return knex('favorites').where(id).del()
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new FavoriteService()