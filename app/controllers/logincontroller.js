import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import app from "../config/app.js"
import connection from "../database/mysql.js"
import { ApiResponse } from "../library/apiresponse.js"

class LoginController {
    constructor() { }

    async login(req, res) {
        const { email, password } = req.body

        const [user] = await connection.execute('select * from users where email=?', [email])

        if (user.length == 0) {
            return res.json(ApiResponse.forbidden('Please enter your registered email.'))
        }
        const isPasswordMatched = bcrypt.compareSync(password, user['0'].password)
        console.log(isPasswordMatched);
        if (!isPasswordMatched) {
            return res.json(ApiResponse.forbidden('Wrong Password.'))
        }

        const payload = {
            name: user[0].name,
            email: user[0].email,
            mobile: user[0].mobile,
            id: user[0].id,
        }

        const token = jwt.sign(payload, app.jwt_secret, { expiresIn: '1hr' })

        return res.json(ApiResponse.success({ token: token }))
    }

    async register(req, res) {
        const { name, email, mobile, password } = req.body

        var [result] = await connection.execute('select * from users where email=?',[email])
        console.log(result);
        if (result.length > 0) {
            return res.json(ApiResponse.invalid('Invalid Data', { 'email': 'email is already in use.' }))
        }

        var [result] = await connection.execute('select * from users where mobile=?',
            [mobile])

        if (result.length > 0) {
            return res.json(ApiResponse.invalid('Invalid Data', { 'mobile': 'mobile is already in use.' }))
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        await connection.execute('insert into users set name=?,email=?,mobile=?,password=?',
            [name, email, mobile, hashPassword])

        return res.json(ApiResponse.success(null, 'Registration successfull'))
    }
}

export default LoginController