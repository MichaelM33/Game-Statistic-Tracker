import React from "react";
import { useState } from "react";
import Profile from "./summoner";

import { Link } from "react-router-dom";


const Home = () =>{


    const [user, setTitle] = useState('');
    const [name, setName] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = user;
        setName(true);
        
      
        
    }

    if(name == false){
    return (
        <div className="landing">
            <div className="home">
                <form onSubmit={handleSubmit}>
                    <div className="child">
                        <input 
                            type="text" 
                            placeholder="Userrname"
                            required 
                            onChange={(e) => setTitle(e.target.value)}>

                        </input>
                    </div>
                    <div className="child">
                        <Link to={`/summoner/${user}`}>
                        <button>GG</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        
    );
    }else {
        const data = user;
        return (<Profile/>);
    }

}

export default Home;