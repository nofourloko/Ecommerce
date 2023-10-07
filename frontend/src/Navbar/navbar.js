/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useRef, useState} from "react"
import React  from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import  "./navbar.css"
import { redirect, useNavigate } from "react-router-dom";
import routersToRedirect from "./routersToRedirect"

export default function navbar() {
  const [refresh, setRefresh] = useState(0)
  const [items, setItems] = useState([])
  const [formInput, setFormInput] = useState("")
  const [showMyAccount, setShowMyAccount] = useState("")
  const [isLogged, setIsLogged] = useState("Log in")
  const closeButtonRef = useRef(null)
  const navigate = useNavigate();


  useEffect(() => {
    const fetch = async () => {
        const fetchProducts = await axios.get("/api/products")
        const products = fetchProducts.data.map(item => {
          return item.title
        })
        setItems(products)

        const isLogged = await axios.get("/getCookie")
        let {data} = isLogged.data
        if(data === true){
          setIsLogged("Log out")
          setShowMyAccount(true)
        }
      }
      
    fetch()
  },[refresh])

  const search = () => {
    if(formInput != ""){
        let item = formInput.charAt(0).toUpperCase() + formInput.slice(1).toLowerCase();
        let foundItems = items.filter((el) => {
          if(el.includes(item)){
            return el
          }
        })

        if (foundItems.length <= 0){
          item = formInput.toLowerCase()
          foundItems = items.filter((el) => {
            if(el.includes(item)){
              return el
            }
          })
        }
        
        setFormInput("")
        if(foundItems.length > 0){
          navigate(`/home/search/${foundItems}`)
        }else {
          navigate("/home/search/noResult")
        }
        closeButtonRef.current.click()
      }
      
  }
  
  const redirect = async () => {
    if(isLogged === "Log in"){
      window.location = "/home/login";
    }else{
      let removeCookie = await axios.get("/clearCookie")
      setIsLogged("Log in")
      setShowMyAccount(false)
      console.log(routersToRedirect)
      routersToRedirect.forEach(item => {
        if(window.location.href == `http://localhost:3000/home/${item}`){
          navigate("/home/login")
        }
      })
      if(window.location.href == `http://localhost:3000/home/cart`){
        window.location.reload(false)
      }
    }
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar bg= "light"key={expand} expand={expand} className="navbar" sticky="top">
          <Container fluid >
            <Navbar.Brand href="/home" className='Brand'>PetalWardrobe</Navbar.Brand>
            <Navbar.Toggle className="toggler" aria-controls={`offcanvasNavbar-expand-${expand}`} onClick ={() => setRefresh(prev => prev + 1)} ref={closeButtonRef}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
                <Offcanvas.Header closeButton >
                  <Offcanvas.Title style={{color: 'black', fontSize: '30px'}} id={`offcanvasNavbarLabel-expand-${expand}`}>
                    PetalWardrobe
                  </Offcanvas.Title>
                </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" >
                  <Nav.Link style={{color: 'black', fontSize: '25px'}} href="/home">Home</Nav.Link>
                  <Nav.Link style={{color: 'black', fontSize: '25px'}}>Sale</Nav.Link>
                  <NavDropdown
                    className="black-dropdown"
                    title="Shop"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/home/products/t-shirt" className='navbar_dropdown_item' >
                      T-shirt
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/home/products/hoodie" className='navbar_dropdown_item'>
                      Hoodie
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/home/products/sweatpants" className='navbar_dropdown_item'>
                      Sweatpants
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/home" className='navbar_dropdown_item'>
                      View all
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link style={{color: 'black', fontSize: '25px'}} onClick={redirect}>{isLogged}</Nav.Link>
                  {showMyAccount? <Nav.Link style={{color: 'black', fontSize: '25px'}} href="/home/MyAccount">My Account</Nav.Link> : null}
                  <Nav.Link style={{color: 'black', fontSize: '25px'}} href="/home/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/> 
                    </svg>
                  </Nav.Link>
                </Nav>
                <Form className="d-flex" style={{marginTop: '5px'}}>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setFormInput(e.target.value)}
                    value={formInput}
                    required
                  />
                  <Button variant="dark" onClick={search}>Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>  
      ))}
    </>
    
  )
}
