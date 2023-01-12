import * as dotenv from 'dotenv'
dotenv.config()

const app = {
    'jwt_secret': process.env.JWT_SECRET

}

export default app