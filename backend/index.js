const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./db/dbconnect')
const {userRouter} = require('./routes/user.routes')
const {courseRouter} = require('./routes/course.routes')
const {adminRouter} = require('./routes/admin.routes')
const cors = require('cors')
dotenv.config()
app.use(express.json())
connectDB();

app.use(
    cors({
      origin: '*', // Allow all origins, or specify a list of allowed origins for better security
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

const PORT = process.env.PORT || 3000

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})