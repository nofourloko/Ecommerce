import React, { createContext, forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form';
import "./index.css"


const FastShoppingData = forwardRef((props, _ref) => {
    const [email, setEmail] = useState("")
    const [gender,setGender] = useState("")
    const [name, setName] = useState("")
    const [surename, setSurename] = useState("")
    const [birthday, setBirthday] = useState("")

    useImperativeHandle(_ref, () => ({
        getShoppingData : () => {
            return{
                gender : gender,
                name : name,
                surename : surename,
                email : email,
                birthday : birthday,
            }
        }
    }))

    return(

            <Col xs={12} md={6} className='formRegister' style={{paddingLeft: '3%', marginTop: "2%"}}>
                <Form >
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control className='inputFastShopping' type="email" placeholder="E-mail"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>

                        <div style={{display: "flex"}} key={`inline-radio`} className="mb-3">
                            <p style={{marginRight:"5%"}}>Contact name:</p>
                            <Form.Check
                                inline
                                name='group1'
                                label="Male"
                                value="male"
                                type="radio"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Check
                                inline
                                name='group1'
                                label="Female"
                                value ="female"
                                type="radio"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Check
                                inline
                                name='group1'
                                label="Agender"
                                value="agender"
                                type="radio"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Check
                                inline
                                name='group1'
                                label="Bigender"
                                value="bigender"
                                type="radio"
                                onChange={(e) => setGender(e.target.value)}
                            />                       
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control className='inputFastShopping' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Surename*</Form.Label>
                            <Form.Control className='inputFastShopping' type="text" placeholder="Surename" value={surename} onChange={(e) => setSurename(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Birth date</Form.Label>
                            <Form.Control className='inputFastShopping' type="date"  value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
                        </Form.Group> 
                </Form>
                </Col>
    )
})

export default FastShoppingData