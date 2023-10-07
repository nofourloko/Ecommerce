import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import "./index.css"

export default function PaymentSuccesful() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orderId, setOrderId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if(searchParams.get('session_id') !== null){
            const addToOrders = async () => {
                const add = await axios.post("/payment/paymentSuccess", {params : {
                    id : searchParams.get('session_id')
                }})  

                const {orderid} = add.data
                setOrderId(orderid)
                
            }
            addToOrders()
        }else
            navigate("/home")
    })
  return (
    <Container className='paymentResultContainer' fluid>
        <Row >
            <div className='paymentResultDiv'>
               <h1>Your payment was successful</h1>
                {orderId ? <h3>Order : {orderId}</h3> : null }
               <Link to={"/home"} className='paymentResultLink'>Browse other items</Link>
            </div>
            
        </Row>
    </Container>
  )
}
