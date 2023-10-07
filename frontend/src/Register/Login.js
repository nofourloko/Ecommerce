import React, {useRef, useState} from 'react'
// import './index.css'
import axios from 'axios'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [dontSingMeOut, setDontSingMeOut] = useState(false)

    const authLogin = async() => {
        if(password === "" && email === ""){
            setErrorText("Please write your password and email")
        }else if (password === ""){
            setErrorText("Please write your password")
        }else if(email === ""){
            setErrorText("Please write your password")
        }else{
            setErrorText("")
            const check = async () => {
                try{
                    let val = await axios.post("/login", {
                        email: email,
                        password: password,
                        dontLogMeOut : dontSingMeOut
                      })
                      
                    let {success, user} = val.data.requestBody
                    return success
                }catch(err){
                    console.log(err)
                    return false
                }
            }
            if (await check() === true){
                setEmail("")
                setPassword("")
                if(window.location.href === "http://localhost:3000/home/login"){
                    window.location = "/home/MyAccount"
                }else
                    window.location.reload(false);
            }else{
                setErrorText('We cannot log in to your account, your data is incorrect')
                setEmail("")
                setPassword("")
                
            }
        }
    }

  return (
    <>
        {errorText? <p style={{color:'red'}}>{errorText}</p>:null}
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} style={{width:'300px'}} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" value={password} style={{width:'300px'}} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={() => setDontSingMeOut(prev => !prev)} style={{backgroundColor: 'black'}} />
            <label  class="form-check-label" for="exampleCheck1" >Don't sign me out</label>
        </div>
        <button onClick={authLogin} class="btn btn-outline-dark">Submit</button>
    </>
  )
}
