const knex = require("../db/knex");


class ReviewService {
    async add (review) {
        try {
            await knex('reviews').insert(review)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('reviews').where(option).first()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getByOption (id) {
        try {
            return knex('reviews').where(id)
                .leftJoin('users', 'reviews.user_id', 'users.id')
                .select('users.login', 'reviews.*')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete (id) {
        try {
            return knex('reviews').where(id).del()
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new ReviewService()