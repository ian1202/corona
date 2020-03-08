var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.Promise = Promise

var dbUrl = 'mongodb+srv://ian:@cluster0-plk9l.mongodb.net/test?retryWrites=true&w=majority


var Message = mongoose.model('Message', {
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async (req, res) => {
    var message = new Message(req.body)

    var savedMessage = await message.save()

    console.log('saved')

    var censored = await Message.findOne({ message: 'badword' })


    res.sendStatus(200)


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