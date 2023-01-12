import connection from "../database/mysql.js"
import { ApiResponse } from "../library/apiresponse.js"

class StudenController {
    constructor() { }

    async index(req, res) {
        const [result] = await connection.execute('select * from students where user_id=?', [req.user.id])

        return res.json(ApiResponse.success(result))
    }

    async store(req, res) {
        const { name, email, mobile, age, college } = req.body

        let [student] = await connection.execute('select * from students where email=?', [email])

        if (student.length > 0) {
            return res.json(ApiResponse.failed('Email is already in use.'))
        }

        [student] = await connection.execute('select * from students where mobile=?', [mobile])

        if (student.length > 0) {
            return res.json(ApiResponse.failed('Mobile is already in use.'))
        }

        try {
            await connection.execute('insert into students set name=?, email=?, mobile=?, age=?, college=?',
                [name, email, mobile, age, college])
        } catch (error) {
            return res.json(ApiResponse.exception(error))
        }

        return res.json(ApiResponse.success(null, 'Student added successfully'))

    }

    async update(req, res) {
        const { studentId } = req.params
        const { name, email, mobile, age, college } = req.body

        let [student] = await connection.execute('select * from students where id=? and user_id=?', [studentId, req.user.id])

        if (student.length == 0 || (student.length > 0 && student['0'].user_id != req.user.id)) {
            return res.json(ApiResponse.notfound('No student found with the given studentId.'))
        }

        [student] = await connection.execute('select * from students where email=? and where id !=?', [email, studentId])

        if (student.length > 0) {
            return res.json(ApiResponse.failed('Email is already in use.'))
        }

        [student] = await connection.execute('select * from students where mobile=? and where id !=?', [mobile, studentId])

        if (student.length > 0) {
            return res.json(ApiResponse.failed('Mobile is already in use.'))
        }

        await connection.execute('update students set name=?, email=?,mobile=?,age=?,college=? where id=? and user_id=?',
            [name, email, mobile, age, college, studentId, req.user.id])

        return res.json(ApiResponse.success(null, 'Student updated successfully'))
    }

    async show(req, res) {
        const { studentId } = req.params

        const [student] = await connection.execute('select * from students where id=? and user_id=?', [studentId, req.user.id])

        if (student.length == 0 || (student.length > 0 && student['0'].user_id != req.user.id)) {
            return res.json(ApiResponse.notfound('No student found with the given studentId.'))
        }

        return res.json(ApiResponse.success(student['0']))
    }

    async destroy(req, res) {
        const { studentId } = req.params
        const [student] = await connection.execute('select * from students where id=? and user_id=?', [studentId, req.user.id])

        if (student.length == 0 || (student.length > 0 && student['0'].user_id != req.user.id)) {
            return res.json(ApiResponse.notfound('No student found with the given studentId.'))
        }

        await connection.execute('delete from students where id=? and user_id=?', [studentId, req.user.id])

        return res.json(ApiResponse.success(null, 'Student deleted successfully.'))
    }
}

export default StudenController