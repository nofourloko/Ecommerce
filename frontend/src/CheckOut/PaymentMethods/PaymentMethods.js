import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row'
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function PaymentMethods({checkAddresAndShip}) {
  const [error, setError] = useState()
  const navigate = useNavigate()

  const paymentSessionConnection = async (price, address) => {
    const paymentResponse = await axios.post("/payment/create-checkout-session", {params : {
      totalPrice : price,
      address : address
    }})

    if(paymentResponse.data.success == true){
      window.location.href = paymentResponse.data.url
    }
  }

  const handle = async () => {
    const check = checkAddresAndShip()

    if(check.success === true){
      const {address, totalPrice} = check
      
      paymentSessionConnection(totalPrice, address)

    }else{
      setError(check.msg)
    }
  }

  return (
    <Row style={{marginTop: "5%"}}>
        {error? <p className='btn- btn-outline-danger'>{error}</p> : null}
        <button onClick={handle}className='btn btn-dark' style={{fontSize: "150%"}}>Pay</button>
    </Row>
  )
}
