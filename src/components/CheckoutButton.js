import React from 'react'
import axios from 'axios'

const checkout = {
    display: 'flex',
    flexDirection: 'column'
}

const CheckoutButton = ({ promise }) => {
    const [quan, setQuan] = React.useState(1)

    const handleClick = async () => {
        const response = await axios.post('http://localhost:5000/checkout', {
            productName: 'Macbook 2021',
            amount: 2000 * 100,
            quantity: quan
        })
        const stripe = await promise;
        console.log(response.data.id)
        const result = await stripe.redirectToCheckout({
            sessionId: response.data.id,
        });
        if (result.error) {
            console.log(result.error)
        }
    };
    return (

        <div className="checkout" style={checkout}>
            <img style={{ width: '200px', height: '200px' }} src="https://mrmad.com.tw/wp-content/uploads/2021/01/2021-macbook-pro-upgrade.jpg" alt="" />
            <p>Price more this mac is 2000$</p>
            <input type="number" name="number" onChange={e => setQuan(e.target.value)} value={quan} step="1" />
            <button onClick={handleClick}>Go to Checkout</button>
        </div>
    )
}

export default CheckoutButton
