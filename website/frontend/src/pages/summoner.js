import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Match from './match';
import Info from './info';

import { useParams } from 'react-router-dom';

import { TailSpin } from 'react-loading-icons'

import Emblem_Iron from '../images/ranks/Emblem_Iron.png';
import Emblem_Bronze from '../images/ranks/Emblem_Bronze.png';
import Emblem_Silver from '../images/ranks/Emblem_Silver.png';
import Emblem_Gold from '../images/ranks/Emblem_Gold.png';
import Emblem_Platinum from '../images/ranks/Emblem_Platinum.png';
import Emblem_Diamond from '../images/ranks/Emblem_Diamond.png';
import Emblem_Master from '../images/ranks/Emblem_Master.png';
import Emblem_Grandmaster from '../images/ranks/Emblem_Grandmaster.png';
import Emblem_Challenger from '../images/ranks/Emblem_Challenger.png';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";

function Profile(){

    const [amount, setAmount] = useState(10);
    const [player, setPlayer] = useState(null);
    const URL = "http://127.0.0.1:8000/api/lol/profile";

    let { username } = useParams();

    useEffect(()=> {
        const OPTIONS =  {user: username};
        axios.post(URL, OPTIONS)
        .then(response => {setPlayer(response.data)})
    },[URL])



    const [match, setMatch] = useState(null);
    const URL2 = "http://127.0.0.1:8000/api/lol/match";
    useEffect(()=> {
        const OPTIONS2 =  {user: username, amount: amount};
        console.log(OPTIONS2)
        axios.post(URL2, OPTIONS2)
        .then(response => {setMatch(response.data)})
        console.log(amount)
   
    },[URL])

    let games = match

    let content = null;

    if(player && match){


        function callapi(){
            setAmount(amount + 5);
            const URL2 = "http://127.0.0.1:8000/api/lol/match";
            const OPTIONS2 =  {user: username, amount: amount};
            console.log(OPTIONS2)
            axios.post(URL2, OPTIONS2)
            .then(response => {setMatch(response.data)})
            
        }


        let filepath = Emblem_Iron;
        let filepathflex = Emblem_Iron;;

        switch(player.solo_rank){
            case "IRON":
                filepath = Emblem_Iron;
                break;

            case "BRONZE":
                filepath = Emblem_Bronze;
                break;

            case "SILVER":
                filepath = Emblem_Silver;
                break;

            case "GOLD":
                filepath = Emblem_Gold;
                break;

            case "PLATINUM":
                filepath = Emblem_Platinum;
                break;
            
            case "DIAMOND":
                filepath = Emblem_Diamond;
                break;

        }
        switch(player.flex_rank){
            case "IRON":
                filepathflex = Emblem_Iron;
                break;

            case "BRONZE":
                filepathflex = Emblem_Bronze;
                break;

            case "SILVER":
                filepathflex = Emblem_Silver;
                break;

            case "GOLD":
                filepathflex = Emblem_Iron;
                break;

            case "PLATINUM":
                filepathflex = Emblem_Platinum;
                break;

            case "DIAMOND":
                filepathflex = Emblem_Diamond;
                break;
        
            
        }

        content =  
        <>
            <div className="content-warp">
                <div className="header">I am a Header</div>

                    <div className="main-content">

                        <div className="sub-content">
                            <div className="spacer"></div>
                            <div className="main-header"></div>
                        </div>

                        <div className="match-rank-conainer">
                            <div className="rank-container">
                                
                                <div className="solo-rank-container">
                                    
                                    <div className="solo-ranking-img">
                                        <img src={filepath} style={{height: 90, width: 90}}/>
                                    </div>
                                    <div className="solo-ranking-info">
                                    <div className="solo-ranking-name">Ranked Solo</div>
                                    <div className="solo-ranking-rank">{player.solo_rank} {player.solo_division}</div>
                                    <div className="solo-ranking-wins">{player.solo_lp}LP / {player.solo_wins}W {player.solo_losses}L</div>
                                    </div>
                                </div>

                                <div className="flex-rank-container">
                                    <div className="flex-ranking-img">
                                        <img src={filepathflex} style={{height: 70, width: 70}}/>
                                    </div>
                                    <div className="flex-info">
                                    <div className="flex-ranking-name">Ranked Flex 5:5</div>
                                    <div className="flex-ranking-rank">{player.flex_rank} {player.flex_division}</div>
                                    <div className="flex-ranking-wins">{player.flex_lp}LP / {player.flex_wins}W {player.flex_losses}L</div>
                                    </div>

                                </div>

                            </div>

                            <div className="match-container">
                                {games.map((game) => <Match game={game}/>)}
                                <div className="load" onClick={callapi}><button>Load more</button></div>
                            </div>

                        </div>

                    </div>


            </div>
          
        </>
        
    }
    else{
        content = 
        <> 
           <div className="outer">
           <div className="inner">Loading...   </div>
           <div className="inner"><TailSpin/></div>
           </div>
        </>
    }
   
    return (
        <>
            {content}
        </>
        
    );  
    
}

export default Profile;
