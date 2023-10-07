import {useEffect, useState, useRef, useContext} from "react"
import React  from "react";
import axios from "axios"
import "./index.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom" ;
import Navbar from "../Navbar/navbar.js"
import Newsletter from "../NewsLetter/newsletter";
import Col from "react-bootstrap/esm/Col";
import NoResultMainPage from "../NoResultMainPage/NoResultMainPage";
import {SortingAsc, SortingDesc} from "./sorting.js";

function MainPage() {
  let {kind, productTitles} = useParams();
  const [items, setItems] = useState([])
  const [sort,setSort] = useState("")
  const [noResult, setNoResult] = useState(false)
  const [sortedItems, setSortedItems] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
      const fetch = async () => {
        if(kind == undefined && productTitles == undefined){
          const fetchProducts = await axios.get("/api/products")
          let products = fetchProducts.data.map(item => {
            return item
          })
          setItems(products)
          setNoResult(false)
        }else if(kind != undefined){
          const fetchProducts = await axios.get(`/api/products/kind/${kind}`)
          const products = fetchProducts.data.map(item => {
            return item
          })
          setItems(products)
          setNoResult(false)
        }else{
            if (productTitles != "noResult"){
              productTitles = productTitles.split(',')
              const fetchProducts = await axios.get(`/api/products/search/${productTitles}`)
              const products = fetchProducts.data.map(item => {
              return item
              })
              setItems(products)
              setNoResult(false)
            }else{
              setNoResult(true)
            }
        }
        
      }
      fetch()
  },[kind, productTitles, sort])

  useEffect(() => {
      if(sort === "desc"){  
        let products = SortingDesc(items)
        console.log(products)
        setSortedItems(products)
      }else if (sort === "asc"){
        console.log(sort)
        let products = SortingAsc(items)
        console.log(products)
        setSortedItems(products)
      }
  },[items,sort])

  return (
    <>
      {!items ? 
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> :
      <>
        <Navbar />
        { !noResult?
        <>
          <Row style={{border: '1px solid black'}}>
            <Col xs={6} >
            <div class="dropdown">
              <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"  aria-expanded="false" style={{border: 'none'}}>
                Sort by: 
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" onClick={() =>  setSort(prev => prev = "asc")}>Price: from highest</a></li>
                <li><a className="dropdown-item" onClick={() =>  setSort(prev => prev = "desc")}>Price: from lowest</a></li>
                <li><a className="dropdown-item"></a></li>
              </ul>
            </div>
            </Col>
            <Col xs={6} className="numberOfProducts">
                <p>We found {items.length} product/s</p>
            </Col>
          </Row>
          <Container className="MainPageContainer" fluid ref={containerRef}>
            <Row xs={1}  md={2} xl={3}  className="MainPageRow">
                  {sortedItems !== "" ? items.map((item) => {
                    return (
                      <Link className="link" to={`/home/${item._id}`} relative="path" key={item._id}>
                          <Card className="card">
                          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${item.img}`} height={500} />
                          <Card.Title className="sex_field">{item.sex}</Card.Title>
                          <Card.Title style={{marginBottom: '5px'}}>{item.price} $</Card.Title>
                          <Card.Title className= "cardTitle" style={{margin: '0'}}>{item.title}</Card.Title>
                        </Card>
                      </Link>
                  )}): sortedItems.map((item) => {
                    return (
                      <Link className="link" to={`/home/${item._id}`} relative="path" key={item._id}>
                          <Card className="card">
                          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/images/${item.img}`} height={500} />
                          <Card.Title className="sex_field">{item.sex}</Card.Title>
                          <Card.Title style={{marginBottom: '5px'}}>{item.price} $</Card.Title>
                          <Card.Title className= "cardTitle" style={{margin: '0'}}>{item.title}</Card.Title>
                        </Card>
                      </Link>
                  )})}
            </Row>
            <Row xs={12}>
                <Col>
                   <Newsletter />
                </Col>
            </Row>
            <button
              className="scrollTop"
              onClick={() => {
                containerRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
              </svg>
            </button> 
          </Container></>: 
          <NoResultMainPage/>}
        </>}
    </>

  );
}

export default MainPage;
