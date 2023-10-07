import React, { forwardRef , useImperativeHandle, useState, memo, useEffect} from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form';
import "./index.css"
import axios from 'axios';

const RegisterForm = forwardRef((props, _ref) => {
  const [gender,setGender] = useState("")
  const [name, setName] = useState("")
  const [surename, setSurename] = useState("")
  const [password, setPassword] = useState("")
  const [birthday, setBirthday] = useState(null)
  const [newsletter, setNewsletter] = useState("")
  const [newsletter2, setNewsletter2] = useState("")
  const [changeUserData, setChangeUserData] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [checkNewPassword, setCheckNewPassword] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [shoppingInfo, setShoppingInfo] = useState("")

  useEffect(() => {
    if(window.location.href == "http://localhost:3000/home/MyAccount/PersonalData"){
        const fetchUserData = async () => {
            const user = await axios.get("/getAccount")
            setChangeUserData(true)
            console.log(user.data.user[0])
            let {gender,email, name, surename, password, birthday, newsletter, newsletter2,shoppingInfo} = user.data.user[0]
            
            setGender(gender)
            setName(name)
            setSurename(surename)
            setBirthday(birthday)
            setNewsletter(newsletter)
            setNewsletter2(newsletter2)
            setCurrentEmail(email)
            setCurrentPassword(password)
            setShoppingInfo(shoppingInfo)
        }

        fetchUserData()
    }
  },[])

  useImperativeHandle(_ref, () => ({
    getData : () => {
        return {
            gender : gender,
            name : name,
            surename : surename,
            password : password,
            birthday : birthday,
            newsletter : newsletter,
            newsletter2 : newsletter2
        }
    }, 

    getNewData : () => {
        return {
            gender : gender,
            name : name,
            surename : surename,
            birthday : birthday,
            currentEmail : currentEmail,
            newsletter : newsletter,
            newsletter2 : newsletter2,
            currentPassword : currentPassword,
            password : password,
            newPassword: newPassword,
            checkNewPassword : checkNewPassword,
            shoppingInfo : shoppingInfo
        }
    }, 

  }))
  return (
            <Row>
                <h1>Your personal data</h1>
                <Col xs={12} md={6} className='formRegister' style={{paddingLeft: '2%'}}>
                    <p style={{color: 'red'}}>*- required field</p>
                    <div key={`inline-radio`} className="mb-3">
                        <p>Gender</p>
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
                        <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Surename*</Form.Label>
                        <Form.Control type="text" placeholder="Surename" value={surename} onChange={(e) => setSurename(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email*</Form.Label>
                        {!changeUserData ?
                        <Form.Control type="email" placeholder="E-mail"  value={props.email} disabled/>:
                        <Form.Control type="email" placeholder="E-mail"  value={currentEmail} />}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>{!changeUserData ? "Password*" : "Current Password" }</Form.Label>
                        <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {!changeUserData ? <Form.Label>(minimum 5 letters)</Form.Label> : null}
                    </Form.Group>
                    {changeUserData ? 
                    <>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            {!changeUserData ? <Form.Label>(minimum 5 letters)</Form.Label> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Repeat new password</Form.Label>
                            <Form.Control type="password"  value={checkNewPassword} onChange={(e) => setCheckNewPassword(e.target.value)}/>
                            {!changeUserData ? <Form.Label>(minimum 5 letters)</Form.Label> : null}
                        </Form.Group> 
                    </> : null}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Birth date</Form.Label>
                        <Form.Control type="date"  value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
                    </Form.Group> 
                    
                    <Form.Group>
                        <Form.Check
                            inline
                            label="Sing in to our newsletter"
                            name="group1"
                            type="checkbox"
                            onChange={() => setNewsletter(prev => !prev)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check
                            inline
                            label="I want to get notifiactions from our sponsors"
                            name="group1"
                            type="checkbox"
                            onChange={() => setNewsletter2(prev => !prev)}
                        />
                    </Form.Group>
                </Col>
            </Row>
  )
})


export default memo(RegisterForm)