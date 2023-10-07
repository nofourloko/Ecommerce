import React, {useEffect,useRef, useState} from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Newsletter from '../NewsLetter/newsletter'
import "./index.css"
import { Link } from 'react-router-dom'

export default function NoResultMainPage() {
    const ref = useRef(null)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        const showNewsLetter = () => {
            ref.current.style.display = "block"
        }
        ref.current.style.display = "none"
        window.addEventListener("scroll", showNewsLetter)

        return () => {
            window.removeEventListener('scroll', showNewsLetter);
          };
    },[])
  return (
    <Container fluid className="noResultContainer" onScroll={() => console.log(1)}>
        <Row xs={12} >
            <div className='noResultTextDiv'>
                <p>We could find any prodcut matching your search</p>
                <Link to="/home" path="relative" className='linkNoResult'>
                    <p>Show all products</p>
                </Link>
            </div>
        </Row>
        <Row xs={12} ref={ref}>
            <Newsletter />
        </Row>
    </Container>
  )
}
