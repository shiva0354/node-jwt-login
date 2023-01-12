import Validator from "validatorjs"
import { ApiResponse } from "../library/apiresponse.js"

class UserRequest {
    constructor() { }

    static changePassword(req, res, next) {
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

    static update(req, res, next) {
        const rules = {
            'name': 'required|string|min:5|max:250',
            'email': 'required|string|email',
            'mobile': 'required|numeric'
        }

        let validator = new Validator(req.body, rules)

        if (!validator.passes()) {
            return res.json(ApiResponse.invalid(validator.errors.errors))
        }

        next()
    }
}

export default UserRequest