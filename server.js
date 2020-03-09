var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var dbUrl = 'mongodb+srv://ian:Ianhang1202@cluster0-plk9l.mongodb.net/test?retryWrites=true&w=majority'

var Position = mongoose.model('Position', {
    position: String
})

app.get('/positions', (req, res) => {
    Message.find({}, (err, positions) =>{
        res.send(positions)
    })
})

app.post('/positions', (req, res) => {
    var position = new Position(req.body)

    position.save((err) => {
        if (err)
            sendStatus(500)

        io.emit('position', req.body)
        res.sendStatus(200)
    })

})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})