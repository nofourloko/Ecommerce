import React, { useEffect, useState, useRef, createContext} from 'react'
import AccountCheckOut from './AccountCheckOut'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from "react-bootstrap/esm/Col"
import Navbar from '../Navbar/navbar'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import "./index.css"
import axios from 'axios'
import ShipmentMethods from './ShipmentMethods'
import Newsletter from "../NewsLetter/newsletter"
import Payment from './PaymentMethods/PaymentMethods'

let price = 0

export default function CheckOut() {
    const [productsCart, setProductsCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [deliveryPrice, setDeliveryPrice] = useState(13)
    const [refresh, setRefresh] = useState(0)
    const accountAndShip = useRef()
    const shipmentMethodRef = useRef()


    useEffect(() => {
        getData()
    },[refresh])

    const getData = async () => {
        const itemsInCart = await axios.get("/api/cart")

        if(itemsInCart.data.userCart !== undefined){
            let data = itemsInCart.data.userCart

            console.log(data)
        
            let dict = {}
            data = data.filter(item => {
                if(`${item._id},${item.sizes}` in dict === false){
                    if(item.quantity){
                        dict[`${item._id},${item.sizes}`] = {...item}
                        return item
                    }else{
                        dict[`${item._id},${item.sizes}`] = {...item, quantity: 1}
                        return item
                    }
                    
                }else{
                    let quantity_new = dict[`${item._id},${item.sizes}`].quantity + 1;
                    dict[`${item._id},${item.sizes}`] = {...item, quantity:quantity_new }
                }
            },[])
            data = []
            price = 0
            Object.values(dict).forEach(val => {
                let new_price = val.quantity * val.price
                price += new_price
                data.push({...val, final_price: new_price})
            });
            console.log(data)
            setProductsCart(data)
            setTotalPrice(prevValue => Math.floor(price))
        }else{
            setProductsCart("")
        }
    }

    const removeItem = async (e) => {
        let id_size = (e.target.id).split(",")
        let id = id_size[0]
        let size = id_size[1]
        console.log(id_size)
        const filtredItem = productsCart.filter(item => {
            if(item._id === id && item.sizes === size){
                return item
            }
        })  
        const newProductsCart = productsCart.filter(item => item !== filtredItem[0])
        setProductsCart(productsCart.filter(item => item !== filtredItem[0]))
        const updateCart = await axios.post("/api/updateCart", {params : {productsCart : newProductsCart}})
        setRefresh(prev => prev + 1)
    }

    const addQuantity = async (e) => {
        let id_size = (e.target.id).split(",")
        let id = id_size[0]
        let size = id_size[1]
        let minus_or_plus = e.target.value
        if(minus_or_plus === '+'){
            let filtredItem = productsCart.filter(item => {
                if(item._id === id && item.sizes === size){
                    return {...item, quantity : item.quantity++}
                }else
                    return item
            })
            setProductsCart(filtredItem)
        }else{
            let filtredItem = productsCart.filter(item => {
                if(item._id === id && item.sizes === size){
                    return {...item, quantity : item.quantity--}
                }else
                    return item
            })
            setProductsCart(filtredItem)
        }
        const updateCart = await axios.post("/api/updateCart", {params : {productsCart : productsCart}})
        // localStorage.setItem("product", JSON.stringify(productsCart))
        setRefresh(prev => prev + 1)
    }

    const checkAddresAndShip = () => {
       const {accountAddress, fastShoppingAddress} = accountAndShip.current.getShippingData()
       let errorRespone = {
            success: false,
            msg: "Please select your shipment"
        }

        let successRespone = {
            success: true,
            totalPrice : deliveryPrice + totalPrice,
            address : accountAddress,
        }
       

       const checkIfShipMethodSelected = () => {
        const shipMetod = shipmentMethodRef.current.getShippingMethod()

        if(shipMetod !== ""){
            return  true
        }else
            return false
   }

       if(accountAddress.email != undefined){
            if(checkIfShipMethodSelected() === true){
                return successRespone
            }else
                return errorRespone
       }else{
            if(fastShoppingAddress != undefined){
                if(checkIfShipMethodSelected() === true){
                    successRespone["address"] = fastShoppingAddress
                    return successRespone
                }else
                    return errorRespone
            }else
                errorRespone["msg"] = "Please add your shipment address, then click pay again"
                return errorRespone
       }
    }

  return (
    <div className='backGroundCartContainer'>
        <Navbar />
        {productsCart?
            <Container fluid className='cartContainer'>
                <Row xs={12} style={{borderTop : "1px solid black"}}>
                    <div>
                        <h1>Summary</h1>
                    </div>
                </Row>
                {productsCart? 
                    productsCart.map(item => {
                        return(
                            <Row className='productRow'>
                                <Col xs={12} lg={6}>
                                    <div className='leftProductItem'>
                                        <Image src={`${process.env.PUBLIC_URL}/assets/images/${item.img}`} rounded width={100}/>
                                        <div className='leftProductItem_div'>
                                            <p className='productTitle'>{item.title}</p>
                                            <p className='productSize'>size: {item.sizes}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs= {12} lg={6} >
                                    <div className='rightProductItem'  >
                                        <div>
                                            <div className='quantity_update_div'>
                                                <div>
                                                    <Form.Control className = "quantity" size="sm" type="number" disabled id={`${item._id},${item.sizes}`} value={item.quantity} onChange={addQuantity}/>
                                                </div>
                                                <div className='quantity_update_div_buttons'>
                                                    <button className='quantityButton' value={'+'} id={`${item._id},${item.sizes}`} onClick={addQuantity}>+</button>
                                                    <button  className='quantityButton'value={'-'} id={`${item._id},${item.sizes}`} onClick={addQuantity}>-</button>
                                                </div>
                                            </div>                                   
                                        </div>            
                                        <svg id={`${item._id},${item.sizes}`} onClick={removeItem}  xmlns="http://www.w3.org/2000/svg" width="32" height="3 2" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" style={{paddingBottom: '4%'}}>
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                            </svg>                 
                                        <p>{parseInt(item.final_price)}$</p>
                                    </div>
                                </Col>
                            </Row> 
                        )
                    })
                    :
                    <Row>
                        <Spinner animation="border" role="status" style={{margin: "0 auto"}}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> 
                    </Row>
                    
                }
                <Row className='priceRow'>
                    <Col xs={12} md={6}>
                            <form class="card p-2 formDiscount">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Promo code"/>
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-dark">Redeem</button>
                                    </div>
                                </div>
                            </form>
                    </Col >
                    <Col xs={12} md={6}>
                        <div className='divPriceInfos'>
                            <div>
                                <div>
                                    <p>Products total:</p>
                                </div>
                                <div>
                                    <p>Delivery:</p>
                                </div>
                                <div>
                                    <p className='totalPrice'>Total</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>{totalPrice > 0? totalPrice + " $": null} </p>
                                </div>
                                <div>
                                    <p>{totalPrice > 200 ? "free" : deliveryPrice + " $"}</p>
                                </div>
                                <div>
                                    <p className='totalPrice'>{totalPrice > 200 ? totalPrice + " $" : !totalPrice? null :deliveryPrice + totalPrice + " $"} </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='backLink'>
                    <Col xs={12}>
                        <Link to={"/home"} className='goBackLink'>
                            <div className='goBackLinkDiv'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16" style={{paddingBottom: '2%'}}>
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                                <p>Still shopping?</p>
                            </div>
                        </Link>
                    </Col>
                </Row>
                <AccountCheckOut ref={accountAndShip}/>
                <ShipmentMethods ref={shipmentMethodRef}/>
                <Payment checkAddresAndShip={checkAddresAndShip} />
            </Container>:
        <>
            <Row style={{height: "40vh"}}>
                <div style={{ width: "80%", margin: "0 auto", textAlign:"center"}}>
                    <h1 style={{border : "1px solid black", margin: "10%"}}>Your cart is empty</h1>
                </div>
            </Row>
            <Newsletter />
        </>
        }
    </div>
  )
}
