import { response as res } from "express";
export class ApiResponse {
    constructor() { }

    /*
     * Send success response to the client with the given data
     */
    static success(data, message = 'OK', debug = null) {
        return this.response(200, 'success', message, debug, data);
    }

    /*
     * We failed to perform the requested action due to issues with the request (eg. invalid otp).
     */
    static failed(message, errors = null, debug = null) {
        return this.response(400, 'failed', message, debug, null, errors);
    }

    /*
     * Some part of the request is invalid. list of errors as (key => array of ) pair is sent in response
     */
    static invalid(message, errors = null, debug = null) {
        return this.response(422, 'invalid', message, debug, null, errors);
    }

    /*
     * Request is Unauthenticated. Auth token is missing or invalid.
     */
    static unauthenticated(message = 'Unauthenticated', debug = null) {
        return this.response(401, 'unauthenticated', message, debug);
    }

    /*
     * The request is forbidden for the current user due to permissions
     */
    static forbidden(message = 'Forbidden', debug = null) {
        return this.response(403, 'forbidden', message, debug);
    }

    /*
     * The requested resource was not found on the server
     */
    static notfound(message = 'Not Found', debug = null) {
        return this.response(404, 'notfound', message, debug);
    }

    /*
     * The request method is not allowed
     */
    static methodNotAllowed(message = 'Method Not Allowed', debug = null) {
        return this.response(405, 'disallowed', message, debug);
    }

    /*
     * The client is using an older version of app and must upgrade
     */
    static upgrade(message = 'Upgrade Required', debug = null) {
        return this.response(426, 'upgrade', message, debug);
    }

    /*
     * The client is hitting our server too many times
     */
    static tooManyRequest(message = 'Too Many Request', debug = null) {
        return this.response(429, 'too many request', message, debug);
    }

    /*
     * An exception occurred while processing the request.
     */
    static exception(err, debug = null) {
        return this.response(500, 'error', 'Server Error: ' + err, debug);
    }

    static response(code, status, message, debug = null, data = null, errors = null) {
        let result = { 'code': code, 'status': status, 'message': message };
        if (data) result.data = data

        if (debug) result.debug = debug

        if (errors) result.errors = errors

        res.status(code)
        return result;
    }

}
