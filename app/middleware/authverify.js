import * as jwt from "jsonwebtoken"
import app from "../config/app.js"
import { ApiResponse } from "../library/apiresponse.js"

class AuthVerify {
    constructor() { }

    static auth(req, res, next) {

        let token = req.headers['authorization']

        if (!token) {
            return res.json(ApiResponse.forbidden('Access denied'))
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]
        }

        try {
            const verified = jwt.verify(token, app.jwt_secret)
            req.user = verified
            next()
        } catch (error) {
            return res.json(ApiResponse.invalid(null, { token: 'Invalid token' }))
        }
    }

}

export default AuthVerify