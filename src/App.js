import React, { useState } from "react"
import Input from "./components/Input"
import Button from "./components/CheckoutButton"
import MyCheckout from "./components/checkoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import "./App.css"

const promise = loadStripe(
  "pk_test_51ICWPNGmEcEmaWVS0lJzvO7M8jrKAeHkSroAyzFNS1USzBtWxtFeGYKJC0GpIWXMmVVeBGNEfI0nAgCes30OcLav0004kbtrco"
)

const App = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setpass] = useState("")

  return (
    <div className="App">
      <div className="way1">
        <Input
          value={setUsername}
          type="text"
          label="Username"
          placeholder="Username"
        />
        <Input
          value={setEmail}
          type="email"
          label="Email"
          placeholder="Email"
        />
        <Input
          value={setpass}
          type="password"
          label="Password"
          placeholder="Password"
        />
        <Elements stripe={promise}>
          <MyCheckout username={username} email={email} pass={pass} />
        </Elements>
      </div>
      <div className="way2">
        <Button promise={promise} />
      </div>
    </div>
  )
}

export default App
