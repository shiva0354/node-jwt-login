import * as dotenv from 'dotenv'
import express from "express";
import router from "./app/routes/api.js";
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

const port = process.env.APP_PORT || 3000
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});