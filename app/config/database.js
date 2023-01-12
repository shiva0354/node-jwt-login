import * as dotenv from 'dotenv'
dotenv.config()

const database = {
    'port': process.env.DB_PORT || 3306,
    'host': process.env.DB_HOST || 'localhost',
    'database': process.env.DB_DATABASE || 'node',
    'username': process.env.DB_USERNAME || 'root',
    'password': process.env.DB_PASSWORD || 'root'

}

export default database