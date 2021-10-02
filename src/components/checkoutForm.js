import React, { useState as State, useEffect as Effect } from "react"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe as Stripe,
  useElements as Elements,
} from "@stripe/react-stripe-js"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./checkout.css"

const checkoutForm = ({ username, email, pass }) => {
  const stripe = Stripe()
  const elements = Elements()
  const [paymentConf, setPaymentcon] = State("")
  const [disable, setDisable] = State(false)
  const [loading, setLoading] = State(false)
  const [thank, setThank] = State(false)
  const [numError, setNumError] = State("")
  const [dateError, setDateError] = State("")

  Effect(() => {
    const getPermition = async () => {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER}/?price=${22 * 100}`,
      })
        .then(res => {
          setPaymentcon(res.data.client_secret)
        })
        .catch(err => {
          console.log(err)
        })
    }
    getPermition()
  }, [])

  const Submit = async e => {
    e.preventDefault()
    setLoading(true)
    setDisable(true)

    await stripe
      .confirmCardPayment(paymentConf, {
        payment_method: {
          card: elements.getElement(
            CardNumberElement,
            CardCvcElement,
            CardExpiryElement
          ),
        },
      })
      .then(({ paymentIntent }) => {
        if (paymentIntent) {
          console.log(paymentIntent.amount, username, email, pass)
          toast("your order is placed")
          setThank(true)
          setLoading(false)
          setDisable(false)
        }
      })
  }

  return (
    <>
      <form onSubmit={Submit} id="form" className="form">
        <div className="div">
          <label htmlFor="">card number</label>
          <CardNumberElement
            onChange={e => setNumError(e.error?.message)}
            className="CardNumber"
          />
          <p>{numError}</p>
        </div>
        <div className="div">
          <label htmlFor="">CVC</label>
          <CardCvcElement className="CardCvc" />
        </div>
        <div className="div">
          <label htmlFor="">Expiry date</label>
          <CardExpiryElement
            onChange={e => setDateError(e.error?.message)}
            className="CardExp"
          />
          <p>{dateError}</p>
        </div>
        <button type="submit" disabled={disable || loading}>
          {loading ? (
            <span>
              <img
                id="img"
                src="https://image.flaticon.com/icons/png/128/39/39979.png"
                alt=""
              />{" "}
              processing{" "}
            </span>
          ) : (
            "Pay 22$"
          )}
        </button>
      </form>
      <ToastContainer className="toast" />
      {/* {
                thank && toast('your order is placed')

            } */}
    </>
  )
}

export default checkoutForm
