const express = require('express')
const { join } = require('path')
const path = require('path')
const bodyParser = require('body-parser')
const pug = require('pug')
const datafile = require('./public/data.json')
const fs = require('fs')

const app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'pug')
app.use(express.static('public'))

const code = 'cdfgo'

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./.env" });
}

app.get(`/gdsc/${code}`, (req, res) => {
  res.render(path.join(__dirname+'/pages/index'))
})

app.get(`/gdsc/ques`, (req, res) => {
  res.render(path.join(__dirname+'/pages/question'))
})

app.post('/wlcm', urlencodedParser, (req, res) => {
    const { name } = req.body
    const { sc_id } = req.body
    if (!name || !sc_id) {
        res.render(path.join(__dirname+'/pages/index'), { noname: true })
    }
    const data = {
        name: name,
        sc_id: sc_id,
        time: new Date().toLocaleString()
    }
    datafile.data.push(data)
    fs.writeFileSync('./public/data.json', JSON.stringify(datafile))
    res.render(path.join(__dirname+'/pages/wlcm'), { name, noname: false })
})

app.get('/read',(req,res)=>{
    res.json(datafile)
})

app.get('/clear',(req,res)=>{
    datafile.data = []
    fs.writeFileSync('./public/data.json', JSON.stringify(datafile))
    res.json(datafile)
})

app.get('/*',(req,res)=>{
    res.render(path.join(__dirname+'/pages/404'))
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})