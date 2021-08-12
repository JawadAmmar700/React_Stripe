import React from 'react'
import './Input.css'

const Input = ({ value, type, label, placeholder }) => {

    return (

        <div>
            <label id="label">{label}</label>
            <input type={type} onChange={e => value(e.target.value)} placeholder={placeholder} />
        </div>
    )
}

export default Input
