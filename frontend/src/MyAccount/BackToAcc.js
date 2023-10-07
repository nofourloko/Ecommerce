import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { Link } from 'react-router-dom'


export default function BackToAcc({homePage, color}) {
  return (
        <Row  className='returnToAccountPage'> 
            <Col xs={6} className='returnToAccountPageColLeft'>
            {!homePage ?
                <Link to={"/home/MyAccount/ShippingData"} style= {{width: "80%"}}className='btn btn-outline-dark btn-lg'>
                    Add new address
                </Link>               
                :
                <Link to={"/home"} className='LinkReturnPage'>
                <p>
                    <span style={{margin: "0 10px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </span>
                    home Page
                </p>
            </Link>
            }
            </Col>

            <Col xs={6} className='returnToAccountPageColLeft'>
                <Link to={"/home/MyAccount"} className='LinkReturnPage' style={{color : color ? color : "black"}}>
                    <p>
                        <span style={{margin: "0 10px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </span>
                        Account Page
                    </p>
                </Link>
            </Col>
        </Row>
  )
}
