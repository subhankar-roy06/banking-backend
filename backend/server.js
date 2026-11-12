require('dotenv').config()
const app = require("./src/app")
const connectDB = require("./src/config/db")
const cookieParser = require('cookie-parser')

async function startServer() {
    await connectDB()

    app.listen(3000, () => {
        console.log("server is running on port 3000")
    })
}

startServer().catch((error) => {
    console.error("Failed to start server:", error)
    process.exit(1)
})
