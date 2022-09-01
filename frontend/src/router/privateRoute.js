import React from "react";
import { Route,Redirect } from "react-router-dom";


const PrivateRoute = ({ children, ...rest }) => {
    const data = localStorage.getItem("email");
    return(
        <Route 
        {...rest}
        render={()=>
            data ?(children) 
            :
            (
                <Redirect to="/" />
             
                )
        }
        />
    ) 
}

export default PrivateRoute;