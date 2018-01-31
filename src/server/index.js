import express from 'express'
import steem from 'steem'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'

steem.api.setOptions({ url: 'https://api.steemit.com' })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api', (req, res) => {
  res.json({ msg: 'Welcome' })
})

app.listen(5000, () => {
  console.log('Listening on port 5000.')
})

app.post('/api/login', async (req, res) => {
  try {

  const accounts = await steem.api.getAccountsAsync([req.body.username])
  const privateWif = req.body.password
  const publicWif = accounts[0].posting.key_auths[0][0]
  const isValid = steem.auth.wifIsValid(privateWif, publicWif)
  res.json({ isValid })
  } catch (error) {
    res.sendStatus(403)
  }
  // const pw = 'P5JLtzWZBWSrGmrGfH1UbQ48VqEYJvfpBNa8SwyizEUV6ihMp6nf'
  // const postwif = 'STM6vNnS2y4MjVZpbm2fnsPYaZ5jK1oXTSYdbEteGfa3YqPZ8nW23'
  // const priv = '5KLfJcyv1yxEpc6f42UBdseuLdeFv8HbmdEpvE75q1xsyGmiuLX'
  // const r = steem.auth.verify('xenetics', priv, 'posting')
  // res.json({ r })
})
