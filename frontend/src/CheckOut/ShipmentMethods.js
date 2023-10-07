import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import Row from 'react-bootstrap/esm/Row'
import { Form } from 'react-router-dom'

const ShipmentMethods = forwardRef((props, _ref) =>{
  const [shoppingMethod, setShoppingMethod] = useState("")

  useImperativeHandle(_ref, () => ({
    getShippingMethod : () => {
        return shoppingMethod
    }
  }))

  const saveShipmentMethod = (e) => {
    setShoppingMethod(e.target.value)
  }

  return (
    <>
        <Row>
            <h1 style={{marginTop: "5%"}}>Shipping Methods</h1>
            <div>
                <p style={{margin: "1%"}}>Pick delivery method for this address: </p>
            </div>
        </Row>
        <Row>
            <div className="shipmentForm form-check" style={{width:"90%", margin:"0 auto"}}>
                <div className='shipmentFormDiv' >
                    <input class="form-check-input" type="radio" value="inpostCourier" onChange={(e) => saveShipmentMethod(e)}/>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/shipment1.jpg`} style={{height: "90%"}}/>
                    <div className='shipmentFormInfo'>
                        <p>InPost Courier</p>
                        <p>Shipment time : 1-3 days</p>
                    </div>
                </div>
                <div>
                    <h3>13$</h3>
                </div>
            </div>
        </Row>
    </>
  )
})

export default memo(ShipmentMethods)
