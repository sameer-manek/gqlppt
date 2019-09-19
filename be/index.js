const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const schema = require('./schema/schema')
const root = {}

mongoose.connect('mongodb+srv://axiom:Password@tripelastic-1i8do.mongodb.net/test?retryWrites=true', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection has been eshtablished")
    })
    .catch((error) => {
        console.log("connection has been interrupted, check provided username and password")
    })

const User = require('./models/user')

const app = express()
app.use(cors());

app.use('/api', graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema: schema
}));



app.listen(4000, () => console.log("server working on port 4000"))