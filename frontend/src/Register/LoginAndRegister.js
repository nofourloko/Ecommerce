import React, { createContext, useState } from 'react'
import Navbar from "../Navbar/navbar"
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Login from './Login'
import Register from './Register'
import "./index.css"
import Newsletter from '../NewsLetter/newsletter'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const EmailContext = createContext(null)

export default function LoginAndRegister() {
    const [emailCreateAccout, setEmailCreateAccount] = useState("")
    const [registerPage, setRegisterPage] = useState(false)
    const [errorRegister, setErrorRegister] = useState("")
    const {state} = useLocation()
    console.log(state)

    const showRegisterPage = async () => {
        if(emailCreateAccout !== "" && emailCreateAccout.includes("@")){
            const checkIfAlreadyIn = await axios.get(`/registerCheck/${emailCreateAccout}`)
            const {success} = checkIfAlreadyIn.data

            if(success === true){
                setErrorRegister("")
                setRegisterPage(true)

                // idziemy dalej
            }else{
                const {desc} = checkIfAlreadyIn.data
                setErrorRegister(desc)
            }
        }else{
            setErrorRegister("Your email is invalid")
        }
    }

  return (
    <>
     <Navbar />
     {!registerPage?
     <Container className='loginAndRegisterContainer'>
        <Row >
            <Col xs={12} md={6} className='loginAndRegisterCol'>
                <div>
                    <h1>Already registered</h1>
                </div>
                <Login />
            </Col>
            <Col xs={12} md={6} className='loginAndRegisterCol'>
                <div>
                    <h1>Create Account</h1>
                    <p>Insert your email to create account</p>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Enter email" value={emailCreateAccout} style={{width:'300px'}} onChange={(e) => setEmailCreateAccount(e.target.value)}/>
                </div>
                <button onClick={showRegisterPage} className='btn btn-outline-dark'>Create Account</button>
                <p style={{color: 'red'}}>{errorRegister}</p>
            </Col>
        </Row>
     </Container>: 
     <EmailContext.Provider value={{email : emailCreateAccout, returnToCart : state ? state.returnToCart : ""}}>
        <Register />
     </EmailContext.Provider>
     }
     <Newsletter />
    </>
  )
}
