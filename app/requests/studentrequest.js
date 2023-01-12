import Validator from "validatorjs"
import { ApiResponse } from "../library/apiresponse.js"

class StudentRequest {
    constructor() { }

    static register(req, res, next) {
        const rules = {
            'email': 'required|string|email',
            'name': 'required|string|min:5|max:250',
            'mobile': 'required|numeric',
            'age': 'required|numeric',
            'college': 'required|string|max:250'
        }

        let validator = new Validator(req.body, rules)

        if (!validator.passes()) {
            return res.json(ApiResponse.invalid(validator.errors.errors))
        }

        next()
    }
}

export default StudentRequest