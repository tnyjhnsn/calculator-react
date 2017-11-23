const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, '../client/build')))

const server = app.listen(3006, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Express app listening at http://%s:%s', host, port)
})
