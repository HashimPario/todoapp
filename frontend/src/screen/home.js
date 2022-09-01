import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../style/login.css"
import { showErrMsg, showSuccessMsg } from '../components/notification/Notification'
import axios from 'axios'



const initialState = {
    todoData: '',
    err: '',
    success: ''

}


const Home = () => {

    const [todoVal, setTodoVal] = useState(initialState)
    const [todoState, setTodoState] = useState([]);
    const [testing, setTesting] = useState("")

    const email = localStorage.getItem("email")

    useEffect(() => {
        console.log("useEffect")
        getdata()


    }, []);



    const getdata = async () => { 
        
       
        const res = await fetch(`http://localhost:5000/user/getalldata/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        });

        const data = await res.json();
        console.log(data);
        setTodoState(data);

    }



    const { todoData } = todoVal

    const handleChangeInput = e => {
        const { name, value } = e.target
        setTodoVal({ ...todoVal, [name]: value })

    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            console.log(todoVal)
            const res = await axios.post('/user/home', { todoData,email })
            
            getdata();

        } catch (err) {
            // err.response.data.msg &&
            // setUser({...user, err: err.response.data.msg, success:''})
        }
    }

    const removeTodo = async (id) => {

        try {
            const res = await axios.delete(`/user/deletedata/${id}`)
            // res.json();
            setTodoVal({ ...todoVal, err: '', success: res.data.msg })
            getdata();

        } catch (err) {

        }
    }

    const logout = () => {
        localStorage.removeItem('email')
        window.location.href = "/"
    }


    return (
        <>
            {/* {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} */}
          
            <div className="container">
            
                   
              
                
                <div className="login">
                <button className='logout' type='button' onClick={logout}>Logout</button>
                    <h1>Todos</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Enter Your text Here: </label>
                        <input type="text" placeholder="Enter Your Text" value={todoData} name="todoData" onChange={handleChangeInput} /><br /><br />

                        <button type='submit'>Add</button>
                    </form>

                    <div>
                    {todoState.map((val, ind) => (

                        <div>
                            <h5>
                                <span style={{ marginRight: 20 }}>{ind + 1}</span>
                                {val.todoData}
                                <span style={{ marginRight: 10 }} onClick={() => removeTodo(val._id)}>
                                    X
                                </span>
                            </h5>


                        </div>
                    ))}
                </div>

                </div>

             

            </div>
        </>
    )

}

export default Home;