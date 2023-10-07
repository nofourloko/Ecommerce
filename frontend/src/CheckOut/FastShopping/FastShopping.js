import React, { useRef, useState , memo, forwardRef, createContext, useContext} from 'react'
import FastShoppingData from './FastShoppingData'
import FastShoppingAddress from './FastShoppingAddress'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import { useImperativeHandle } from 'react'

function FastShopping({saveFastShopping}){
  const shoppingData = useRef(null)
  const ShoppingAddress = useRef(null)
  const [result, setResult] = useState("")
  const [showNextSteps,setShowNextSteps] = useState(false)
  const resultRef = useRef()

  
  const saveData = () => {
    const shoppingDataInputs = shoppingData.current.getShoppingData()
    const shoppingAddressInputs = ShoppingAddress.current.getShoppingAddress()

    let isFieldsEmpty = false

    Object.keys(shoppingDataInputs).forEach((key, value) => {
      if(key != "gender" && key != "birthday"){
        if(shoppingDataInputs[key] == "" || shoppingDataInputs[key] == undefined){
          isFieldsEmpty = true
        }
      }
    })

    Object.keys(shoppingAddressInputs).forEach((key, value) => {
      if(shoppingAddressInputs[key] == "" || shoppingAddressInputs[key] == undefined){
        isFieldsEmpty = true
      }
      
  })

    if(isFieldsEmpty == false){
      setResult("We saved your data!")
      resultRef.current.style.color = 'green';
      setShowNextSteps(true)
      const userDataObject = {
        ...shoppingDataInputs, 
        shoppingInfo: {
          ...shoppingAddressInputs
        }
      }
      saveFastShopping(userDataObject)

    }else{
      setResult("You can't leave required fields empty")
      resultRef.current.style.color = "red"
      setShowNextSteps(false)
    }
  }

  return (
    <>  
        <Row xs={12}>
          <h1>Fast Shopping</h1>
          <p style={{color: "red", margin:"0% 2%"}}>*- required field</p>
        </Row>
        <Row >
          <FastShoppingData ref={shoppingData}/>
          <FastShoppingAddress ref={ShoppingAddress}/>
        </Row>
        <Row>
          <Button variant="outline-dark" style={{width: '50%', margin:"1% auto"}} onClick={saveData}>Save</Button>
          <p style= {{textAlign: 'center'}}ref={resultRef}>{result}</p>
        </Row>
    </>
  )
}

export default memo(FastShopping)