const express = require('express')
const app = express()
const PORT = 2090
const bearerToken = require('express-bearer-token')
const { db } = require('./config')
const { pegawaiRouter, jobtaskRouter } = require('./router')

// konfig
app.use(express.json())
app.use(bearerToken())
db.getConnection((err, connection) =>{
    if(err){
        return console.log("error mysql",  err.message)
    }
    console.log(`Connected to MySQL server: ${connection.threadId}`)
})

// selamat adatang
app.get('/', (req, res)=>{
    res.status(200).send("selamat datang di pegawai api")
})

// routing
app.use('/pegawai', pegawaiRouter)
app.use('/jobtask', jobtaskRouter)

// handling error
app.use((error, req, res, next) =>{
    console.log("Handling error: ", error)
    res.status(500).send({status: 'Error', messages: error})
})

app.listen(PORT, () => console.log(`server running at ${PORT}`))
