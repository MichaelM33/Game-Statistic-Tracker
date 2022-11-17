import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Match from "./match";
let amount = 10

function Info({username}){

    const [match, setMatch] = useState(null);
    
    const URL = "http://127.0.0.1:8000/api/lol/match";
    
    useEffect(()=> {
        const OPTIONS =  {user: username, amount: amount};
        console.log(OPTIONS)
        axios.post(URL, OPTIONS)
        .then(response => {setMatch(response.data)})
        console.log(amount)
   
    },[URL])

    let content = null;

    function clicked(){
        amount = amount + 5
        const OPTIONS =  {user: username, amount: amount};

        console.log(OPTIONS)
        axios.post(URL, OPTIONS)
        .then(response => {setMatch(response.data)})
        console.log(amount)
    }
    

    if(match){
        let games = match
        return (
            <>
                
                {games.map((game) => <Match game={game}/>)}

                <button onClick={clicked}>Load more</button>
            </>  
        );  
  
    }
    else{
        return (
            <>
                {content}
            </>  
        );  
    }

    
    
}


export default Info;