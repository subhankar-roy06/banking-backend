const mongoose = require('mongoose')

function ConnectToDB() {
    return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("server is connected to DB")
    })
    .catch((error) => {
        console.error("error connecting to DB:", error)
        process.exit(1)
    })
}

module.exports = ConnectToDB