require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

let ItemRoutes = require('./controllers/ItemController')
let UserRoutes = require('./controllers/UserController')
let OrderRoutes = require('./controllers/OrderController')
let CartRoutes = require('./controllers/CartController')

let app = express()
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4200'}))
let sr = app.listen(4000,()=>console.log('Server start port : 4000'))

const io = require('socket.io')(sr, {
    cors: {
      origin: '*',
    }
  });

io.sockets.on('connection', (socket) => {
    socket.on('item', function(data){
        console.log(data)
        io.sockets.emit('item', data);
    });
})

app.use('/Order',OrderRoutes)
app.use('/Cart',CartRoutes)
app.use('/User',UserRoutes)
app.use('/Item',ItemRoutes)
app.use(express.static('public'))