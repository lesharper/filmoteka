const userService = require('../service/userService')
const bcrypt = require("bcrypt");

class UserController {


    async registration (req, res) {
        const {firstname, surname, middlename, login, password} = req.body

        if (!login || !password) return res.json({error: 'Некорректные данные'})

        const candidate = await userService.findByOption({login})

        if (candidate) return res.json({error: 'Пользователь уже существует'})

        const hashPassword = await bcrypt.hash(password, 5)
        await userService.create({firstname, surname, middlename, login, password: hashPassword})
        return res.json({message: 'Успех!'})
    }

    async login (req, res) {
        const {login, password} = req.body
        const user = await userService.findByOption({login})

        if (!user) return res.json({error: 'Пользователя не существует'})

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) return res.json({error: 'Не верный пароль'})

        req.session.user = {...user, password: ''};
        return res.json({...user, password: ''})
    }

    async check (req, res) {
        if (req.session.user)
            return res.json(req.session.user);
        else
            return res.json({error: 'Пользователь не авторизован'});
    }

    async logout (req, res) {
        if (req.session.user) {
            res.clearCookie("user");
            res.status(200).json({isAuth: false});
        }
    }

    async updateUser (req, res) {
        const {firstname, surname, middlename, login, password} = req.body
        const user_id = req.session.user.id
        if (!login || !password) return res.json({error: 'Некорректные данные'})

        const candidate = await userService.findByOption({login})

        if (candidate) return res.json({error: 'Пользователь уже существует'})

        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await userService.update(user_id, {firstname, surname, middlename, login, password: hashPassword})
        req.session.user = {...newUser[0], password: ''};
        return res.json({...newUser[0], password: ''})
    }

    async updateBalance (req, res) {
        const {balance} = req.body
        const user_id = req.session.user.id

        const user = await userService.findByOption({id: user_id})
        const newBalance = Number(user.balance) + Number(balance)
        const newUser = await userService.update(user_id, {...user, balance: newBalance})
        req.session.user = {...newUser[0], password: ''};
        return res.json({...newUser[0], password: ''})
    }
}

module.exports = new UserController()