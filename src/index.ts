import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import connectDB from "../config/db"
import router from './Router/index'

connectDB()
const app=express()


app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/',router())




const server=http.createServer(app)

server.listen(5000,()=>{

    console.log(`server running on port 5000`)
})

