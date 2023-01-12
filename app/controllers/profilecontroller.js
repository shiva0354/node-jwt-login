import * as bcrypt from "bcrypt"
import connection from "../database/mysql.js"
import { ApiResponse } from "../library/apiresponse.js"

class ProfileController {
    constructor() { }

    async show(req, res) {
        const [result] = await connection.execute('select * from users where id=?', [req.user.id])

        return res.json(ApiResponse.success(result['0']))
    }

    async update(req, res) {
        const { name, email, mobile } = req.body

        var [result] = await connection.execute('select * from users where email=?, and id !=?',
            [email, req.user.id])

        if (result.length > 0) {
            return res.json(ApiResponse.invalid('Invalid Data', { 'email': 'email is already in use.' }))
        }

        var [result] = await connection.execute('select * from users where mobile=?, and id !=?',
            [mobile, req.user.id])

        if (result.length > 0) {
            return res.json(ApiResponse.invalid('Invalid Data', { 'mobile': 'mobile is already in use.' }))
        }

        await connection.execute('update users set name=?,email=?,mobile=?',
            [name, email, mobile])

        return res.json(ApiResponse.success(null, 'Profile upadted successfully'))
    }

    async changePassword(req, res) {
        const { email, password } = req.body

        var [result] = await connection.execute('select * from users where email=?, and id =?',
            [email, req.user.id])

        if (result.length > 0) {
            return res.json(ApiResponse.invalid('Invalid Data', { 'email': 'Please enter your registered email.' }))
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        await connection.execute('update users set password=? email=? and where id=?',
            [hashPassword, email, req.user.id])

        return res.json(ApiResponse.success(null, 'Password updated successfully.'))
    }
}

export default ProfileController