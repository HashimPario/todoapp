import React, {useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import "../style/login.css"
import {showErrMsg, showSuccessMsg} from '../components/notification/Notification'
import axios from 'axios'


const initialState = {
    name: '',
    email: '',
    password: '',
    err:'',
    success:''
}

//validation
const isEmpty = value => {
    if (!value) return true
    return false
}

const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isLength = password => {
    if (password.length < 6) return true
    return false
}


const Register = () => {

    const [user,setUser] = useState(initialState)
    const history = useHistory();

    const {name, email, password, err, success} = user

    const handleChangeInput = e =>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
        
    }


    const handleSubmitReg =async e =>{
        e.preventDefault()
        if (isEmpty(name) || isEmpty(email) || isEmpty(password))
            return setUser({ ...user, err: "Please fill in all fields.", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid emails.", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be at least 6 characters.", success: '' })

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })
            alert("Registered Successfully")
            setUser({ ...user, err: '', success: res.data.msg })
            window.location.href = "/";
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return(
        <>
        {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        <div className="container">
      
        <div className="register">
            <h1>Register</h1>
            
            <form onSubmit={handleSubmitReg}>
            <label>Name: </label>
                <input type="text" placeholder="Enter Your Name" value={name} name="name" onChange={handleChangeInput}/><br/><br/>
                <label>Email: </label>
                <input type="text" placeholder="Enter Your Email" value={email} name="email" onChange={handleChangeInput}/><br/><br/>
               
                <label>Password: </label>
                <input type="password" placeholder="Enter Your Password" value={password} name="password" onChange={handleChangeInput}/><br/><br/>
                <button type='submit'>Register</button>
            </form>
        </div>
        </div>
        </>
    )

}

export default Register;