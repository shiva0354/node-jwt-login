import Validator from "validatorjs"
import { ApiResponse } from "../library/apiresponse.js"

class LoginRequest {
    constructor() { }

    static login(req, res, next) {
        const rules = {
            'email': 'required|string|email',
            'password': 'required|string|min:6'
        }

        let validator = new Validator(req.body, rules)

        if (!validator.passes()) {
            return res.json(ApiResponse.invalid(validator.errors.errors))
        }

        next()
    }

    static register(req, res, next) {
        const rules = {
            'email': 'required|string|email',
            'password': 'required|string|min:6',
            'name': 'required|string|min:5|max:250',
            'mobile': 'required|numeric'
        }

        let validator = new Validator(req.body, rules)

        if (!validator.passes()) {
            return res.json(ApiResponse.invalid(validator.errors.errors))
        }

        next()
    }
}

export default LoginRequest