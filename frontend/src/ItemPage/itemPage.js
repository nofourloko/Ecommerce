
import React from "react";
import {useNavigate, useParams} from "react-router-dom" ;
import axios from "axios";
import { useEffect, useState} from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./index.css"
import Col from "react-bootstrap/esm/Col";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/esm/Button";
import Image from 'react-bootstrap/Image';
import Newsletter from "../NewsLetter/newsletter";
import Navbar from "../Navbar/navbar.js"
import { createContext } from 'react';





export default function ItemPage() {
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState({})
  const {item_id} = useParams();
  const [clickedSize, setClickedSize] = useState("")
  const [selectSize, setSelectSize] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetch(){
        const item = await axios.get(`/api/products/${item_id}`)
        setProduct(item.data[0])
        setSizes({...product.sizes})
    }
    fetch()
  })

  const selectedProduct = async() => {
    if(clickedSize != ""){
        setSelectSize(false)
        const itemsInCart = await axios.get("/api/cart")
        
        let alreadyInCart = itemsInCart.data.userCart
        let selectedProduct = {...product, sizes : clickedSize}
        let response


        if(alreadyInCart){
            let setItem = await axios.post("/api/cart", {params : {productsArray : selectedProduct, emptyArray : false}})
            response = setItem.data.success
        }else{
            let setItem = await axios.post("/api/cart", {params : {productsArray : selectedProduct, emptyArray : true}})
            response = setItem.data.success
        }

        if(response === true){
            navigate("/home/cart")
        }
    }else{
        setSelectSize(true)
    }
  }

  return (
    <>
        <Navbar/>
        <Container fluid className="productContainer">
        {!product ?
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner> :
            <Row className="row_product" >
                    <Col  className="row_product_left" md={12} lg={6}>
                        <Card className="card_image_product">
                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${product.img}`} />
                        </Card>
                    </Col>
                    <Col className="row_product_right" md={12} lg={6}>
                        <div className="card_product_div">
                            <Card className="card_product">
                                <Card.Body>
                                    <Card.Title style={{fontSize: '80px'}} >{product.title}</Card.Title>
                                    <Card.Title style={{fontSize: '40px'}} >{product.price} $</Card.Title>
                                    <Card.Title style={{fontSize: '40px'}} >Sizes</Card.Title>
                                    <div className="prodcut_sizes"> 
                                        {Object.keys(sizes).map((value, index) =>{
                                            if(parseInt(sizes[value]) > 0){
                                                return <Button 
                                                        className="sizes_button" 
                                                        variant="dark" 
                                                        style={{fontSize: '20px'}}
                                                        onClick={() => setClickedSize(value)}
                                                        value={value}
                                                    >
                                                        {value}
                                                    </Button>
                                            }else{
                                                return <Button 
                                                        className="sizes_button" 
                                                        variant="dark" 
                                                        disabled
                                                        style={{fontSize: '20px'}}
                           
                                                    >
                                                        {value}
                                                    </Button>
                                            }
                                        })}
                                    </div>
                                    <Button variant="dark" className="add_to_cart" onClick={selectedProduct}>Add to cart</Button>
                                    {selectSize? <p>Please select size</p> : null}
                                    <div className="divSizing">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header >Show sizing</Accordion.Header>
                                                <Accordion.Body >
                                                    <Image src={`${process.env.PUBLIC_URL}/assets/images/sizeChart.png`} alt="sizingChart" className="sizingImg" fluid />                                      
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
            </Row>}
            <Row xs={12}>
                <Col>
                   <Newsletter />
                </Col>
            </Row>
        </Container>
    </>
  )
}