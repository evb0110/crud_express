const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const fs = require('fs')
const port = 3000
const db = './db.json'

const read = () => new Promise((res, rej) => (
  fs.readFile(db, (err, data) => {
    if (err) return console.warn(err)
    res(JSON.parse(data.toString()))
  })))

const write = (objects) => new Promise((res, rej) => (
  fs.writeFile(db, JSON.stringify(objects, null, 2), (err) => {
    if (err) return console.warn(err)
    res('ok')
  })
))

app.get('/', (req, res) => {
  read().then(d => res.send(d))
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  read().then(objects => objects.find(o => o.id === id))
    .then(d => res.send(d))
})

app.post('/', (req, res) => {
  const obj = req.body
  const id = Math.random().toString().slice(2, 12)
  const newObj = {...obj, id}
  read().then(objects => [newObj, ...objects])
    .then(write)
    .then(() => res.send(newObj))
})

app.patch('/', (req, res) => {
  const obj = req.body
  const id = obj.id
  read().then(objects => objects.map(o => o.id === id ? obj : o))
    .then(write)
    .then(() => res.status(200).json({status: "ok"}))
})

app.delete('/:id', (req, res) => {
  const id = req.params.id
  read().then(objects => objects.filter(o => o.id !== id))
    .then(write)
    .then(() => res.status(200).json({status: "ok"}))
})


app.listen(port, '127.0.0.1', () => {
  console.log(`Server is up on port ${port}`)
})