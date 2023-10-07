import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Login from '../Register/Login'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import "./index.css"
import axios from 'axios'
import ShowAccountAddresses from './showAccountAddresses'
import FastShopping from './FastShopping/FastShopping'
import { useNavigate } from 'react-router-dom'


const AccountCheckOut = forwardRef((props, _ref) => {
    const [showLogin, setShowLogin] = useState(false)
    const [userLogged, setUserLogged] = useState()
    const [address, setAddreses] = useState()
    const [selectedAddress, setSelectedAddress] = useState()
    const [noAddress, setNoAddress] = useState()
    const [fastShopping, setFastShopping] = useState(false)
    const [fastShoppingAddress, setFastShoppingAddress] = useState()
    const [loggedEmail, setLoggedEmail] = useState()
    const fastShoppingRef = useRef()
    const navigate = useNavigate()

    useImperativeHandle(_ref, () => ({
        getShippingData : () => {
            return {
                accountAddress : {...selectedAddress, email : loggedEmail},
                fastShoppingAddress : fastShoppingAddress
            }
        }
    }))

    
    useEffect(() => {
        const isUserLogged = async () => {
            const check = await axios.get("/getAdresses")

            if(check.data.success == true){
                setUserLogged(true)
                const {shoppingInfo, email} = check.data
                setAddreses(shoppingInfo)
                setLoggedEmail(email)
                setSelectedAddress(shoppingInfo[0])
            }else{
                if(check.data.noAddress == true){
                    setUserLogged(true)
                    setAddreses(false)
                }else
                    setUserLogged(false)
            }
                
        }

        isUserLogged()
    },[showLogin])

    const saveFastShopping = (userDataObject) => {
        setFastShoppingAddress(userDataObject)
    }

    const selecetdAddressSet = (pickedAddress) => {
        setSelectedAddress(pickedAddress)
    }
    
  return (
    <>
        {!userLogged ?
        <>
            <Row>
                <Col xs={12} style={{marginTop: '10%'}}>
                    <h1>Account</h1>
                </Col>
            </Row>

            <Row className='accountRowSingedIn'>
                <Col>
                    {!showLogin ?
                        <>
                            <h1>Already singed in ?</h1>
                            <p onClick={() => setShowLogin(true)} className='showLoginButton'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-fast-forward" viewBox="0 0 16 16">
                                    <path d="M6.804 8 1 4.633v6.734L6.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
                                    <path d="M14.804 8 9 4.633v6.734L14.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
                                </svg>
                                Click there!
                            </p>
                        </>:
                    <div>
                        <Login />
                    </div>}
                    
                </Col>
            </Row>
            {!fastShopping?
            <Row className='accountRowNew'>
                <Col md={6} xs={12} className='accountRowNewColRegister'>
                    <h1>New Client</h1>
                    <div>
                        <p>Create account right now and enjoy benefits</p>
                        <ul>
                            <li>Fast and easy shopping</li>
                            <li>Personalized and secured access</li>
                            <li>Be first to know about our sales</li>
                        </ul>
                    </div>
                    <button 
                        className="btn btn-outline-dark btn-lg" 
                        onClick={() => navigate("/home/login",{state:{returnToCart: "/home/login"}})}
                    >Create Account</button>
                </Col>
                <Col md={6} xs={12}className='fastshoppingRow'>
                    <div>
                        <p>Fast shopping</p>
                        <button type="button" className="btn btn-outline-dark btn-lg" onClick={() => setFastShopping(true)}>Buy without registration</button>
                    </div>
                    
                </Col>
            </Row>:
            <>
                <FastShopping saveFastShopping={saveFastShopping}/>
            </>
            }
        </>:
        <ShowAccountAddresses addresses={address} selecetdAddressSet={selecetdAddressSet} />}
    </>
  )
})


export default memo(AccountCheckOut)