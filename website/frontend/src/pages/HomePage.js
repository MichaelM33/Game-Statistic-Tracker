
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Home from './home';
import Profile from './summoner';


function HomePage(){
    

    return (
        <Router>
            <Switch>
               <Route exact path='/' component={Home}></Route>
                <Route path='/create'></Route> 
                <Route path='/summoner/:username' component={Profile}></Route> 
            </Switch>
            
        </Router>
        
    );
    }

export default HomePage;




    