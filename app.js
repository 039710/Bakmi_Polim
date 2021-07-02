const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))
app.use(router)
app.use(express.static(__dirname + '/public')); // serve static files to public directory

app.listen(port, ()=>{
    console.log('server running at port :',port)
})