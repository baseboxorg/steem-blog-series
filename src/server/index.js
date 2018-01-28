import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

app.get('/api', (req, res) => {
  res.json({ 'user': 'user' })
})
app.listen(5000, () => {
  console.log('Listening on port 5000.')
})
