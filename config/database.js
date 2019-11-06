const mongoose = require('mongoose')

// db configuration - establishing connection to db
const configureDB = () => {
    mongoose.Promise = global.Promise
    const CONNECTION_URI= process.env.MONGODB_URI || 'mongodb://localhost:27017/june-weekday-notesapp'
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('successfully connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })
}

    
module.exports = configureDB