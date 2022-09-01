import React, {useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import "../style/login.css"
import {showErrMsg, showSuccessMsg} from '../components/notification/Notification'
import axios from 'axios'


const initialState = {
    uname: '',
    email: '',
    password: '',
    userId: '',
    err:'',
    success:''
}


const Login = () => {

    const [user,setUser] = useState(initialState)
    const history = useHistory();

    const {uname, email, password,userId, err, success} = user

    const handleChangeInput = e =>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
        
    }

    const handleSubmit =async e =>{
        e.preventDefault()
        try{
            console.log(user)
            const res = await axios.post('/user/login', {email, password})
            console.log(res)
            setUser({...user, err: '', success: res.data.msg})
          

            localStorage.setItem('email',email)
            history.push('/home')
            window.location.href = "/home";
          
            


        }catch(err){
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success:''})
        }
    }


    return(
        <>
        {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        <div className="container">
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="text" placeholder="Enter Your Email" value={email} name="email" onChange={handleChangeInput} /><br/><br/>
                <label>Password: </label>
                <input type="password" placeholder="Enter Your Password" value={password} name="password" onChange={handleChangeInput}/><br/><br/>
                <button  type='submit'>Login</button>
            </form>
        </div>
      
        </div>
        </>
    )

}

export default Login;