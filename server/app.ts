require("dotenv").config()
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { ErrorMiddleware } from "./middleware/error"
import userRouter from "./routes/user.route"

const app = express()

// body parser
app.use(express.json({ limit: "50mb" }))

//cookie parser
app.use(cookieParser())

// cors => cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

// routes
app.use("/api/v1", userRouter)

// testing api
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  })
})

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
})

app.use(ErrorMiddleware)

export { app }
