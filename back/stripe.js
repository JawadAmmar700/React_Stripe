const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51ICWPNGmEcEmaWVSFdgi4JgqcN3s0YOZRB0QBdvgsGPpfveFdV9VFnK7xdfg6clhE2zV8om1W8pWdA8Cvi2sAXUG00sCUdE9sb'
)

app.use(express.json())
app.use(cors({ origin: true }))

app.get('/', (req, res) => {
  res.send('dehf')
})

app.post('/', async (req, res) => {
  const price = req.query.price
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'usd',
  })
  res.status(201).send({
    client_secret: paymentIntent.client_secret,
  })
})

app.post('/checkout', async (req, res) => {
  const { productName, amount, quantity } = req.body
  console.log('product', productName, amount, quantity)
  try {
    if (productName && amount) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1IxATBGmEcEmaWVSFA2HVIV2'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: productName,
                images: [
                  'https://mrmad.com.tw/wp-content/uploads/2021/01/2021-macbook-pro-upgrade.jpg',
                ],
              },
              unit_amount: amount,
            },
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
      })
      res.json({ id: session.id })
    }
  } catch (err) {
    console.log(err)
  }
})

app.listen(5000, () => console.log('connected'))
