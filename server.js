const express = require('express')
let app = express()
app.use(express.json())

const port = 3000
let objects = []

app.get('/', (req, res) => {
  res.send(objects);
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  const obj = objects.find(o => o.id === id)
  res.send(obj)
})

app.post('/', (req, res) => {
  const obj = req.body
  const id = Math.random().toString().slice(2, 12)
  const newObj = {...obj, id}
  objects = [...objects, newObj]
  res.send(newObj)
})

app.patch('/', (req, res) => {
  const obj = req.body
  const id = obj.id
  objects = objects.map(o => o.id === id ? obj : o)
  res.status(200).json({status:"ok"})
})

app.delete('/:id', (req, res) => {
  const id = req.params.id
  objects = objects.filter(o => o.id !== id)
  res.status(200).json({status:"ok"})
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})