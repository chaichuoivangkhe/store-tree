import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import treeRouter from "./routes/treeRoute.js"
import userRouter from "./routes/usersRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())



// db connection
connectDB();

// api endpoints
app.use('/api/tree', treeRouter); 
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})