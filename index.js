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

app.get('/gdsc/bla-bla', (req, res) => {
  res.render(path.join(__dirname+'/pages/index'))
})

app.post('/wlcm', urlencodedParser, (req, res) => {
    const { name } = req.body
    if (!name) {
        res.render(path.join(__dirname+'/pages/index'), { noname: true })
    }
    const data = {
        name: name,
        time: new Date().toLocaleString()
    }
    datafile.data.push(data)
    fs.writeFileSync('./public/data.json', JSON.stringify(datafile))
    res.render(path.join(__dirname+'/pages/wlcm'), { name, noname: false })
})

app.get('/read',(req,res)=>{
    res.json(datafile)
})

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3000!')
})