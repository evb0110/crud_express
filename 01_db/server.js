const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const crudRoutes = require('./routes/crud')
app.use(crudRoutes)

app.listen(port, 'localhost', () => {
  console.log(`Server is up on port ${port}`)
})
