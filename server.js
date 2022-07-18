const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').load()
const port = process.env.PORT || 3000


// const db = require('./api/db') //connect db v
// db.connect();
const db = require('./api/model/ModelDb') //connect db v
db.connect();


app.use(bodyParser.urlencoded({ extended: true })) //body parser
app.use(bodyParser.json())



let route = require('./api/model/routes') //importing route
route(app);


app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log(req.query);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//------------------------------------//




