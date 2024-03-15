import express from "express"
import cors from "cors"

import 'dotenv/config'
import { dbConnection } from "./database/db.js"


import router from "./routes/router.js"

const app = express()
app.use(cors)

app.use(express.json())


const PORT = process.env.PORT || 4001

app.get('/api/healthy', (req, res) => {
    res.status(202).json({
        success: true,
        message: "Server is healthy"
    })
})

//AUTH
app.use('/api',router)

dbConnection()
    .then(() => {
        console.log("Database connected")

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error)
    })

