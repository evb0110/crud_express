const express = require('express')
const cors = require('cors')
const Item = require('./models/item')

const app = express()
app.use(express.json())
app.use(cors())

const fs = require('fs')
const port = 3000
const db = './db.json'

app.get('/', (req, res) => {
  Item.fetchAll().then(d => res.send(d))
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  Item.fetchById(id).then(d => res.send(d))
})

app.post('/', (req, res) => {
  const {name, price} = req.body
  const newItem = new Item(name, price)
  newItem.save().then(() => res.send('ok'))
})

app.patch('/', (req, res) => {
  const {name, price, id} = req.body
  const item = new Item(name, price, id)
  item.save().then(() => res.send('ok'))
})

app.delete('/:id', (req, res) => {
  const id = req.params.id
  Item.deleteById(id).then(() => res.send('ok'))
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is up on port ${port}`)
})