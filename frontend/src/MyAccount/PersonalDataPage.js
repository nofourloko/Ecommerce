import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/navbar'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
import BackToAcc from './BackToAcc'
import Row from 'react-bootstrap/esm/Row'
import RegisterForm from '../Register/RegisterForm'
import {useLocation} from 'react-router-dom';

export default function PersonalDataPage() {
    
    const formRef = useRef(null)
    const [errorText, setErrorText] = useState("")
    const [resolved, setResolved] = useState(false)


    const response = (res) => {
        console.log(res)
        if(res === true){
            setResolved(true)
            setErrorText("")
        }else{
            setErrorText("Something went wrong, try again")
        }
    }

    const saveNewData = async () => {
        const {
            gender, 
            name,
            surename,
            birthday,
            currentEmail,
            newsletter,
            newsletter2,
            currentPassword,
            password,
            newPassword,
            checkNewPassword
        } = formRef.current.getNewData()

        let dataToUpdate = {
            gender : gender,
            name : name,
            surename: surename,
            birthday: birthday,
            email : currentEmail,
            newsletter : newsletter,
            newsletter2: newsletter2,
            password: password,
        }
        
        if(currentPassword === password){
            const {newPassword, checkNewPassword} = formRef.current.getNewData()
            if(newPassword !== ""){
                if(newPassword.length > 5){
                    if(newPassword === checkNewPassword){
                        dataToUpdate["password"] = newPassword

                        const update = await axios.post("/updateUserData", {params : dataToUpdate})
                        response(update.data.success)
                        
                    }else
                        setErrorText("Your passwords new passord is diffrent than repeated password")
                }else
                    setErrorText("Your new password is too short")
            }else{
                const update = await axios.post("/updateUserData", {params : dataToUpdate})
                console.log(update)
                response(update.data.success)
            }  
        }else
            setErrorText("Your password is wrong")
    }

    return (
        <div className='accountDiv'>
            <Navbar />
            <Container > 
            {errorText? <p style={{color:'red', paddingLeft:'2%', border:"1px solid black", textAlign:'center', fontSize:"25px"}}> {errorText}</p> : null}
                {!resolved ?
                <>
                    <RegisterForm ref={formRef}/>
                    <Row  xs={12} style={{marginTop: "3%"}}>
                        <button class="btn-dark btn-block" onClick={saveNewData}>
                            Save
                        </button>
                    </Row>
                </>
                : 
                <Row xs={12} style={{border : "1px solid black", textAlign: 'center'}}>
                    <p style={{fontSize: '32px'}}>Your data was successfully updated</p>
                </Row>
                }         
            </Container>
        </div>
)
}
