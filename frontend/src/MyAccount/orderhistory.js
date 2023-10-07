import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/navbar'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import Row from 'react-bootstrap/esm/Row'
import { Link } from 'react-router-dom'
import BackToAcc from './BackToAcc'


export default function Orderhistory() {
    const [notFound, setNotFound] = useState("")
    const [orders, setOrders] = useState("")

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await axios.get("/getOrders")
            const {success} = orders.data

            if(success == true){
                setOrders((orders.data.orders).reverse())
            }else
                setNotFound(orders.data.msg)
        }

        fetchOrders()
    },[])
  return (
    <div className='orderHistroyBackGround'>
        <Navbar/>
        <Container>
            <Row>
              <div style={{textAlign: "center"}}>
                    <h1>Your orders:</h1>
                    {
                        notFound ?
                            <>
                                <h3>{notFound}</h3>
                                <Link to={"/home/MyAccount"} className='paymentResultLink'>Come back to my account page</Link>
                            </>
                        : 
                            <>
                                <p style={{color: 'green'}}>if you have more than two orders you have to scroll right</p>
                                <p style={{color: 'green'}}>if you have more than two ordered products you have to scroll down</p>
                            </>
                    }
                </div>  
            </Row>
            <Row className='flex-nowrap overflow-scroll'>
                {orders.length > 0 ? orders.map(item => {
                    return (
                    <div className='MyAdressCol' style={{textAlign: 'center'}}>
                        <div>
                            <h1>Order id: {item._id}</h1>
                        </div>

                        <div style={{textAlign: 'center'}}>
                            <h2>Products: </h2>
                            <ul className="orderHistroyProductsList">
                                {item.products.map(item => {
                                    return (
                                        <h5> {item.title} , size : {item.sizes} , price {item.price} $ </h5>
                                    )
                                })}
                            </ul>
                        </div>

                        <div>
                            <p>Order date : {item.orderDate}</p>
                            <h2>Total Price: {item.totalPrice} $</h2>
                        </div>
                    </div>
                    )}) : null }
            </Row>
            <BackToAcc homePage={true}/>
        </Container>
    </div>  
  )
}
