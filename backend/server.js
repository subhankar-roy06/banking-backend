require("dotenv").config({ path: require("path").join(__dirname, ".env") })

const app = require("./src/app")
const connectDB = require("./src/config/db")

async function startServer() {
    await connectDB()

    app.listen(3000, () => {
        console.log("server is running on port 3000")
    })
}

startServer().catch((err) => {
    const message = err instanceof Error ? err.message : String(err)
    console.error("Server startup failed:", message.replace(/mongodb(?:\+srv)?:\/\/\S+/gi, "[MongoDB URI]"))
    process.exitCode = 1
})
