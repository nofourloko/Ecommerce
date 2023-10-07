import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row'
import "./index.css"
import Col from 'react-bootstrap/esm/Col'
import { useNavigate } from 'react-router-dom'
import ShipmentMethods from './ShipmentMethods'

export default function ShowAccountAddresses({addresses,selecetdAddressSet}) {
  const [pickedAddress, setPickedAddress] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(addresses)
    if(addresses === false){
      setPickedAddress(false)
    }else{
      setPickedAddress(addresses[0])
    }
  },[])

  const changeAddress = (changeItem) => {
    let changePickedAddress = addresses.filter(item => item.shortCut === changeItem)
    setPickedAddress(changePickedAddress[0])
    selecetdAddressSet(changePickedAddress)
  }

  return (
    <>
    {pickedAddress?
      <>
        <Row md={3} style={{marginTop: '3%', display:'flex', flexDirection:'column'}}>
          <h1>Addresses</h1>
          <h5>Pick your delivery address:</h5>
          <select class="addressSelect form-select" onChange={(e)=> changeAddress(e.target.value)}>
          {addresses.map(item => {
              return <option value={item.shortCut}>{item.shortCut}</option>
            })}
          </select>
        </Row>
        <Row>
          <Col xs={12} md={6} >
            <div className='MyAdressColCheckout'>
              <div>
                <h1>Your Shipping address</h1>
              </div>

              <ul style={{listStyle: 'none'}}>
                <li>Name and Surename - {pickedAddress.name} {pickedAddress.surename}</li>
                <li>Phone number - {pickedAddress.phone}</li>
                <li>Post Code - {pickedAddress.postCode}</li>
                <li>City - {pickedAddress.city}</li>
                <li>Country - {pickedAddress.country}</li>
              </ul>
            
              <div className='MyAdressColButtons'>
                  <button className='btn btn-outline-dark'onClick={() => navigate("/home/MyAccount/ShippingData/redirectCart", {state : {...pickedAddress}})} >Update</button>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} >
              <div className='MyAdressColCheckout' style={{ textShadow: "1px 1px 60px black"}}>
                <div>
                  <h1>Your Billing address</h1>
                </div>

                <ul style={{listStyle: 'none'}}>
                  <li>Name and Surename - {pickedAddress.name} {pickedAddress.surename}</li>
                  <li>Phone number - {pickedAddress.phone}</li>
                  <li>Post Code - {pickedAddress.postCode}</li>
                  <li>City - {pickedAddress.city}</li>
                  <li>Country - {pickedAddress.country}</li>
                </ul>
              
              
                <div className='MyAdressColButtons'>
                    <button style={{boxShadow: "1px 1px 10px black"}} className='btn btn-outline-dark'onClick={() => navigate("/home/MyAccount/ShippingData/redirectCart", {state : {...pickedAddress,}})} >Update</button>
                </div>

              </div>
          </Col>
        </Row>
        <Row>
          <div style={{marginTop: "2%"}}>
            <p 
              style={{width: "80%"}}
              className='btn btn-outline-dark' 
              onClick={() => navigate("/home/MyAccount/ShippingData/newAddRedirectCart" ,{state:{returnToCart: true}})}>Add address</p>
          </div>
        </Row>
    </>:
      <Row>
        <div >
              <div style={{textAlign:"center"}}>
                <h1>Your Shipping address</h1>
                <p>You don't have an address</p>
                <p className='btn btn-outline-danger' onClick={() => navigate("/home/MyAccount/ShippingData/newAddRedirectCart" ,{state:{returnToCart: true}})}>Add one here</p>
              </div>
        </div>
      </Row>}
  </>
  )
}
