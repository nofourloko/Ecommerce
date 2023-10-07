import React, { forwardRef, memo , useImperativeHandle, useRef, useState} from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form';
import CountriesList from '../../MyAccount/CountriesList';
import "./index.css"

const FastShoppingAddress = forwardRef((props, _ref) => {
    const [postCode, setPostCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState(null)

    useImperativeHandle(_ref, () => ({
        getShoppingAddress : () => {
            return {
                postCode : postCode,
                city : city,
                country: country,
                phone: phone,
            }
        }
    }))

    return(
        <Col  xs={12} md={6} className='formRegister' style={{paddingLeft: '3%', marginTop: "2%"}}>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Post Code*</Form.Label>
                    <Form.Control className='inputFastShopping' type="text" placeholder='Post Code' value={postCode} onChange={(e) => setPostCode(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>City * </Form.Label>
                    <Form.Control className='inputFastShopping' type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Country *</Form.Label>
                    <Form.Select className='inputFastShopping' type="text" value ={country} onChange={(e) => setCountry(e.target.value)}>
                        <CountriesList/>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control className='inputFastShopping' type="number" placeholder='Phone Number' value={phone} onChange={(e) => setPhone(parseInt(e.target.value))}/>
                </Form.Group>
            </Form>
        </Col>
    )
})

export default FastShoppingAddress
