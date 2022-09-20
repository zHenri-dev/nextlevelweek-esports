import 'dotenv/config'
import 'express-async-errors'

import express from 'express'
import cors from 'cors'
import routes from './routes'

import { errorMiddleware } from './middlewares/error'

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
app.use(routes)

app.use(errorMiddleware)

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Server listening on port ${port}`))