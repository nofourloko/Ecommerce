import React from 'react'
import "./welcome.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function welcome() {
  return (
    <Container fluid className='welcome-container' >
        <Row>
            <Col className='welcome-text'>Welcome</Col>
        </Row>
        <Row style={{padding: 13}}>
            <Col>
                <Link to="/home" relative="path">
                    <Button 
                        className="welcome-button text-pop-up-top" 
                        variant="outline-dark" 
                        size='lg'
                    >Let's shop </Button>
                </Link>
            </Col>
        </Row >
    </Container>
  )
}
