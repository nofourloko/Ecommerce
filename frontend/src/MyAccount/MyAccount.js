import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/navbar'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import "./index.css"
import Col from 'react-bootstrap/esm/Col'
import jsonLinks from './AccountLinks'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function MyAccount() {
  const accountLinks = jsonLinks 
  const [showAdress, setShowAdress] = useState("")

  useEffect(() => {
    const getInfo = async () => {
      const info = await axios.get("/getCookieAdress")
      console.log(info.data.data)
      setShowAdress(info.data.data)
    }
    getInfo()
  },[])


  return (
    <div className='accountDiv' style={{height: "110vh"}}>
        <Navbar/>
        <Container className='myAccountContainer'>
            <Row >
                <h1>My Account</h1>
                <p>Your account. Here you can manage your personal data and glance through your orders</p>
            </Row>
            <Row className='RowAccount'>
              {accountLinks ? accountLinks.map((item) => {
                if(item.title === "Add your first address" && showAdress === true){
                  return null
                }
                return (
                  <Col md={6} xs={12}>
                    <Link to={item.link || null} style={{outline :'none', textDecoration: 'none'}}>
                    <button className='btn btn-outline-dark buttonAccountRow'>
                      <span style={{ borderRight: "1px solid black" , marginRight: '2%', paddingRight: '2%'}}>{item.img}</span>
                      {item.title}
                      </button>
                    </Link>
              </Col>
                )
              }):null}
            </Row>
        </Container>
    </div>
  )
}