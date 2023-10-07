import React, { useState, useRef, useEffect} from 'react'
import ShippingData from '../MyAccount/ShippingData';
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import "./index.css"
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useContext } from 'react';
import {EmailContext} from "./LoginAndRegister"
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const {email,returnToCart} = useContext(EmailContext);
  const formRef = useRef(null)
  const [errorText, setErrorText] = useState("")
  const [showShoppingData, setShowShoppingData] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    containerRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  },[])

  const addingAccout = async (dataToSend) => {
    const send = await axios.post("/addUser", dataToSend)
    return send
  }


  const submit = async () => {
    let {name, surename, password} = formRef.current.getData()
    console.log(name)
    if((name !== "" && surename !== "") && (/\d/.test(name) === false && /\d/.test(name) === false)){
        if(password.length > 5){
            let dataToSend = {...formRef.current.getData(), email : email, shoppingInfo : []}
            console.log(dataToSend)
            const addResponse = await addingAccout(dataToSend)
            const {success} = addResponse.data

            console.log(success)

            if(success === true){
              if(returnToCart.length > 0){
                navigate("/home/cart")
              }else
                navigate("/home/MyAccount")
            }
            
        }else
            setErrorText("Your password is too short")
    }else
        setErrorText("Your data: Name or Surename are invalid")
    
  }

    
  return (
    <>
    {!showShoppingData?
        <Container className='registerContainer' ref={containerRef}>
          <p style={{color:'red', paddingLeft:'2%', border:"1px solid black", textAlign:'center', fontSize:"25px"}}>{errorText? errorText: null}</p>
           <RegisterForm email = {email} ref={formRef}/>
           <Row md={6} xs={12}>
              <button class="btn-dark btn-block" style={{width: '100%', marginTop: "5%"}} onClick={submit}>
                            Submit
                </button>
            </Row>       
        </Container>:
        <ShippingData/>}
    </>
  )
}
