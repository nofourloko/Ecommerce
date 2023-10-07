import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Navbar from '../Navbar/navbar'
import Row from 'react-bootstrap/esm/Row'
import CountriesList from './CountriesList'

import "./index.css"
import Col from 'react-bootstrap/esm/Col'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function ShippingData() {

  const [name, setImie] = useState("")
  const [sureName, setSureName] = useState("")
  const [postCode, setPostCode] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [phone, setPhone] = useState(null)
  const [shortCut, setShortCut] = useState("")
  const [error, setError] = useState("")
  const {state} = useLocation()
  const location1 = "http://localhost:3000/home/MyAccount/ShippingData/Update"
  const location2 = "http://localhost:3000/home/MyAccount/ShippingData/redirectCart"
  const {cartRedirect} = useParams()
  const navigate = useNavigate()
  

  useEffect(() => {
    console.log(cartRedirect)
    if((window.location.href === location1) || (window.location.href === location2)){
      setImie(state.name)
      setSureName(state.surename)
      setPostCode(state.postCode)
      setCity(state.city)
      setCountry(state.country)
      setPhone(state.phone)
      setShortCut(state.shortCut)
    }
  },[])
  


  const AddAdressButton_Clicked = async () => {
      let add = {
          shortCut : shortCut,
          name : name,
          surename: sureName,
          postCode: postCode,
          city : city,
          country : country,
          phone : phone
      }


      let AllFieldsNotEmpty = true

      Object.keys(add).forEach((key) => {
        if(add[key] === ""){
          AllFieldsNotEmpty = false
        } 
      })

      if(AllFieldsNotEmpty === true){
        let req
        if(window.location.href !== location1 && window.location.href !== location2){
          req = await axios.post("/Account/AddAdress",{params : add})
          console.log(req)
        }else{
          req = await axios.post("/Account/changeAddress",{params : {user: add, targetAddress : state}})
          console.log(req.data)
        }
        if(req.data.success=== true){
          setError("")
          if(cartRedirect === "redirectCart" || cartRedirect === "newAddRedirectCart"){
            navigate("/home/cart")
          }else
            navigate("/home/MyAccount/Addresess")
        }else{
          setError("Problem with adding your data. Try again")
        }
      }else{
        setError("Please fill your fileds")
      }
  }

  return (
    <>
      <Navbar />
      <Container className='ShippingDataContainer'>
        <Row xs={12} md={6}>
          <div>
            <h1>Your address</h1>
            <p>Add your address data, fill up the form</p>
            <p style={{color: 'red'}}>*-required fields</p>
            <p style={{color: 'red'}}>{error ? error : null}</p>
          </div>
        </Row>
        <Row xs = {12}>
          <Col md={6}>
           <div class="form-group">
              <label>Name *</label>
              <input type="text" value = {name} className="form-control" placeholder="Enter name" onChange={(e) => setImie(e.target.value)}/>
            </div>
          </Col>
           
          <Col md={6}>
            <div class="form-group">
              <label >Surename *</label>
              <input type="text" className="form-control" value={sureName} placeholder="Enter surename" onChange={(e) => setSureName(e.target.value)}/>
            </div>
          </Col>

          <Col md={6}>
            <div class="form-group">
              <label for="exampleInputPassword1">Post Code *</label>
              <input type='text' className="form-control" value={postCode} onChange={(e) => setPostCode(e.target.value)}/>
            </div>
          </Col>

          <Col md={6}>
            <div class="form-group">
              <label for="exampleInputPassword1">City * </label>
              <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
          </Col>


          <Col md={6}>
            <div className='form-group'>
              <label for="exampleInputEmail1">Country *</label>
                <select name="country" className="form-control"  value ={country} onChange={(e) => setCountry(e.target.value)}>
                    <CountriesList/>
                </select>
            </div>
          </Col>

          <Col md={6}>
            <div class="form-group">
              <label for="exampleInputPassword1">Phone Number *</label>
              <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(parseInt(e.target.value))}/>
            </div>
          </Col>

          <Col md={6}>
            <div class="form-group">
              <label for="exampleInputPassword1">Shortcut for this Adress *</label>
              <input type="text" className="form-control" value={shortCut}  onChange={(e) => setShortCut(e.target.value)}/>
            </div>
          </Col>
          <Col xs={12} style={{textAlign: "center", margin: " 2% auto"}}>
            <button type="submit" className="btn-shopping-data btn btn-outline-dark" onClick={AddAdressButton_Clicked}>Save</button>
          </Col>
        </Row>
      </Container>
    </>
  )
}
