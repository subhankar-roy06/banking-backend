const mongoose = require('mongoose')

function ConnectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("server is connected to DB")
    }).catch(()=>{
        console.log("error conneting to DB")
        process.exit(1)
    })
}

module.exports = ConnectToDB