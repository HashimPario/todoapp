import React from "react";
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from "../screen/login"
import Home from "../screen/home"
import PrivateRoute from "./privateRoute";
import Register from "../screen/register";



function AppRoute(){
    return(
        <>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Login/>
                </Route>

                <Route path="/register" exact>
                    <Register/>
                </Route>
              

                <PrivateRoute path="/home" exact>
                    <Home/>
                </PrivateRoute>
            </Switch>
        </Router>
        
        </>
    )

}

export default AppRoute;