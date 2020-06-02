const Item = require('../models/item')

exports.getAll = (req, res) => {
  Item.fetchAll().then(d => res.send(d))
}

exports.getById = (req, res) => {
  const id = req.params.id
  Item.fetchById(id).then(d => res.send(d))
}

exports.post = (req, res) => {
  const {name, price} = req.body
  const newItem = new Item(name, price)
  newItem.save().then(() => res.send('ok'))
}

exports.patch = (req, res) => {
  const {name, price, id} = req.body
  const item = new Item(name, price, id)
  item.save().then(() => res.send('ok'))
}

exports.delete = (req, res) => {
  const id = req.params.id
  Item.deleteById(id).then(() => res.send('ok'))
}
