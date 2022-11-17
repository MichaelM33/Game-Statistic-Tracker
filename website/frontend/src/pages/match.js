import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Match({game}){


    let content = null;


    const history = useHistory();


    if(game){

        console.log(game);

        let winable = null;
        let coloured = null;

        if(game.players[0].win == true){
            winable = "Victory";
            coloured = "section1-victory";
            if(game.info.gameDuration < 300){
                console.log(game.info.gameDuration)
                winable = "Remake";
            }
        }else {
            winable = "Defeat";
            coloured = "section1-defeat";
            if(game.info.gameDuration < 300){
                console.log(game.info.gameDuration)
                winable = "Remake";
            }
        }

        var queueId
        console.log(game.info.queueId);

        if(game.info.queueId = 420){
            queueId = "Ranked Solo"
        }
        else {
            queueId = "Normal Game"
        } 



        if(game.players[1].part != 10){
            console.log(game.players[1].part)

            let wsize = 15;
            let hsize = 15;  

            let img = [];
            img[0] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[0].championName}.png`;
            img[1] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[1].championName}.png`;

            return (
                <>
                    <div className="match-warp">
            <div className={winable}>
              <div className="child">
                  <div className="section1-queuetype">{queueId}</div>
                  <div className="section1-queuetype">a day ago</div>
                  <div className="section1-bar"></div>
                  <div className={coloured}>{winable}</div>
                  <div className="section1-gameduration">{game.info.gameDuration}</div>
              </div>

              <div className="child">
                  <div className="championimg"><img src={img[0]} style={{height: 45, width: 45, borderRadius: 5}}></img></div>
                <p>{game.players[0].championName}</p>
              </div>

              <div className="child">
                  <div className="section3-kda">{game.players[0].kills}/{game.players[0].deaths}/{game.players[0].assits}</div>
                  <div className="section3-kdaratio">{game.players[0].kda} KDA</div>
              </div>

              <div className="child">
                  <div className="section4-level">Level: {game.players[0].champLevel}</div>
                  <div className="section4-cs">{game.players[0].cs} CS</div>
                  <div className="section4-kpa"></div>
              </div>
              <div className="child">
              </div>
              <div className="child">
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[1].summonerName}`}><img src={img[1]} style={{height: hsize, width: wsize}}/> {game.players[1].summonerName}</div>
              </div>

            </div>
          </div>
                </>  
            );  


        }
        

        let img = [];
        img[0] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[0].championName}.png`;
        img[1] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[1].championName}.png`;
        img[2] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[2].championName}.png`;
        img[3] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[3].championName}.png`;
        img[4] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[4].championName}.png`;
        img[5] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[5].championName}.png`;
        img[6] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[6].championName}.png`;
        img[7] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[7].championName}.png`;
        img[8] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[8].championName}.png`;
        img[9] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[9].championName}.png`;
        img[10] = `https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${game.players[10].championName}.png`;


        let wsize = 15;
        let hsize = 15;        

        content =  
          <div className="match-warp">
            <div className={winable}>
              <div className="child">
                  <div className="section1-queuetype">Ranked Solo</div>
                  <div className="section1-queuetype">a day ago</div>
                  <div className="section1-bar"></div>
                  <div className={coloured}>{winable}</div>
                  <div className="section1-gameduration">{game.info.gameDuration}</div>
              </div>

              <div className="child">
                  <div className="championimg"><img src={img[0]} style={{height: 45, width: 45, borderRadius: 5}}></img></div>
                <p>{game.players[0].championName}</p>
              </div>

              <div className="child">
                  <div className="section3-kda">{game.players[0].kills}/{game.players[0].deaths}/{game.players[0].assits}</div>
                  <div className="section3-kdaratio">{game.players[0].kda} KDA</div>
              </div>

              <div className="child">
                  <div className="section4-level">Level: {game.players[0].champLevel}</div>
                  <div className="section4-cs">{game.players[0].cs} CS</div>
                  <div className="section4-kpa"></div>
              </div>

              <div className="child">
              </div>


              <div className="child">
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[1].summonerName}`}><img src={img[1]} style={{height: hsize, width: wsize}}/> {game.players[1].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[2].summonerName}`}><img src={img[2]} style={{height: hsize, width: wsize}}/> {game.players[2].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[3].summonerName}`}><img src={img[3]} style={{height: hsize, width: wsize}}/> {game.players[3].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[4].summonerName}`}><img src={img[4]} style={{height: hsize, width: wsize}}/> {game.players[4].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[5].summonerName}`}><img src={img[5]} style={{height: hsize, width: wsize}}/> {game.players[5].summonerName}</div>
              </div>
              <div className="child">
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[6].summonerName}`}><img src={img[6]} style={{height: hsize, width: wsize}} />{game.players[6].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[7].summonerName}`} ><img src={img[7]} style={{height: hsize, width: wsize}}/> {game.players[7].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[8].summonerName}`}><img src={img[8]} style={{height: hsize, width: wsize}}/> {game.players[8].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[9].summonerName}`}><img src={img[9]} style={{height: hsize, width: wsize}}/> {game.players[9].summonerName}</div>
                <div className="section6-players" onClick={event =>  window.location.href=`${game.players[10].summonerName}`}><img src={img[10]} style={{height: hsize, width: wsize}}/> {game.players[10].summonerName}</div>
              </div>
            </div>
          </div>
    }
    else {
        content = 
        <div>
            <p>Loading..</p>
        </div>
    }

    return (
        <>
            {content}
        </>  
    );  
    
}


export default Match;