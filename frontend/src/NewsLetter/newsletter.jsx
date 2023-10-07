import React , { useState } from 'react'
import "./index.css"
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import RegexEmail from '../Validation/emailValidation';
import axios from 'axios';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState("")
    const [msg, setMsg] = useState("")
    

    const subscribe = async () => {
        if(RegexEmail(email) == true){
            setErr("")
            const emailNewsletterSub = await axios.post("/emailNewsletterSub",{params : {_email : email}})
            let {success} = emailNewsletterSub.data
            if(success == true){
                setMsg("Thank you for signing to newsletter")
                setEmail("")
                setTimeout(() => {
                    setMsg("")
                },3000)
            }else{
                let {msg} = emailNewsletterSub.data
                setErr(msg)
            }
        }else
            setErr("Your e-mail is invalid")
    }
 
    return (
        <Container>
            <Row className='newsletter'>
                <Col xs={12} md={6}>
                    <div className='newsletter_text'>
                        {msg ? <p className='top_text_newsletter'>{msg}</p> :
                        <p className='top_text_newsletter'>Subscribe to our newsletter! <br/>
                        <span className='bottom_text_newsletter'>want early access and sales info?</span></p>}
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="d-grid gap-2" >
                            <Form.Group className="mb-3 input-sm" controlId="formBasicEmail">
                                <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted" >
                                    {err? err : "We'll never share your email with anyone else"}
                                </Form.Text>
                            </Form.Group>

                            <Button onClick={subscribe}type="submit" className="primary" variant= "dark" size="lg" style={{width : '100%'}}>
                                Subscribe
                            </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
