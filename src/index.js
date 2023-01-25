const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const router = require('./router')

const port = 8080
const messages= []


const app = express()

app.use(express.json())
app.use(express.static(__dirname +'/public'))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

router(app)

const httpserver = app.listen(port, () =>{
    console.log(`Server running at port ${port}`)
})

const io = new Server(httpserver)

io.on('connection', socket =>{
    console.log(`New Client with id ${socket.id}`)

    socket.on('message', data =>{
        messages.push(data)
        io.emit("messageLogs", messages)
    })

    
    
})

