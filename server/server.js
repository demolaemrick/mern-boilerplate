require('dotenv').config() //for env file to load up

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(bodyparser.json()); //utilizes the body-parser package
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database...'))
    .catch(err => console.log(err))

// use Routes
app.use('/api/items', require('./routes/api/items'))


// Serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

let port = 8080 || process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}....`));