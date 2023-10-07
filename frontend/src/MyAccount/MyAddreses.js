import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Navbar from '../Navbar/navbar'
import Row from 'react-bootstrap/esm/Row'
import axios from 'axios'
import Col from 'react-bootstrap/esm/Col'
import "./index.css"
import { Link, useNavigate} from 'react-router-dom'
import BackToAcc from './BackToAcc'

export default function MyAddreses() {
    const navigate = useNavigate();
    const [myAddresses, setMyAddresses] = useState("")
    const [refreshPage, setRefreshPage] = useState(0)
    const [userId, setUserId] = useState("")
    const [notFound, setNotFound] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchAddress = async () => {
            const fetch = await axios.get("/getAdresses")
            let {success, shoppingInfo, _id} = fetch.data

            if(success === true){
                setMyAddresses(shoppingInfo)
                setUserId(_id)
            }else{
                setNotFound("You don't have addresses pined to this account")
            }
        }

        fetchAddress()
    },[refreshPage])


    const updateAddress = (item) => {
        navigate("/home/MyAccount/ShippingData/Update", {state : {...item}})
    }

    const deleteAddress = async (item) => {
        const deleteAddress = await axios.post("/deleteAdress", {params : {id : userId, address : item}})
        const {success} = deleteAddress.data
        console.log(success)
        if(success === true){
            setRefreshPage(prev => prev++)
            setMyAddresses(myAddresses.filter(el => el !== item))
        }else{
            setError("Problem have accured, try again")
        }
    }

  return (
    <div className='accountDiv'>
        <Navbar />
        <Container>
        <Row xs={12}>
            <h1>Your address</h1>
            <div style={{paddingLeft : "2%"}}>
                <p style={{color : "gray"}}>
                    Please set up your default billing and shipping addresses for placing orders. You can also add other addresses, which can be useful for sending gifts or 
                    receiving orders at your workplace
                </p>
                <p>Below you can find address saved on this account</p>
                <p style={{color : "gray"}}>Make sure that the have not chaged</p>
                <p style={{color : "green"}}>To see more address, hover on adress and  scroll right</p>
            </div>
        </Row>
        <Row className='flex-nowrap overflow-scroll'>
                {myAddresses.length > 0 ? myAddresses.map(item => {
                    return (
                    <div className='MyAdressCol'>
                        <div>
                            <h1>{item.shortCut}</h1>
                        </div>

                        <ul style={{listStyle: 'none'}}>
                            <li>Name and Surename - {item.name} {item.surename}</li>
                            <li>Phone number - {item.phone}</li>
                            <li>Post Code - {item.postCode}</li>
                            <li>City - {item.city}</li>
                            <li>Country - {item.country}</li>
                        </ul>
                        <div className='MyAdressColButtons'>
                            <button className='btn btn-outline-dark' onClick={() => updateAddress(item)}>Update</button>
                            <button className='btn btn-outline-danger' onClick={() => deleteAddress(item)}>Delete</button>
                        </div>
                        {error?<p>{error}</p> : null}
                    </div>
                    )
                }):
                <Row xs= {12}>
                    <Col>
                        <p>You don't have an address</p>
                        <a className='btn btn-outline-danger' href= "/home/MyAccount/ShippingData">Add one here</a>
                    </Col>
                </Row>
                }
            </Row>
            <BackToAcc color ={"white"}/>
        </Container>
    </div>
  )
}

