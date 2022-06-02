const knex = require("../db/knex");


class RatingService {
    async add (rating) {
        try {
            await knex('ratings').insert(rating)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(id, data) {
        try {
            return knex('ratings').where({id}).update(data)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAll () {
        try {
            return knex('ratings').avg('rating as rating')
                .leftJoin('contents', 'ratings.content_id', 'contents.id')
                .select('contents.*')
                .groupBy('contents.id')
                .orderBy('rating', 'desc')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('ratings').where(option).first()
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new RatingService()