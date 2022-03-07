const express = require('express')
const PORT = 3000
const app = express()
const api = require('./routes/api')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended:true }))
//Specifing the bodyParser so it can handle json data.
//Adding a middleware layer to the express middleware stack.
app.use(express.json())
app.use('/api', api)
app.get('/', function(req, res){
    res.send('HEllO')
})
app.listen(PORT, function(){
    console.log(`Server runing on PORT: ${PORT}`)
})