const mongoose = require('mongoose')
const DB = "mongodb://localhost:27017"
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
}).then(() => {
    console.log("mongoose connected");
}).catch((err) => {
    console.log("error occured");
})