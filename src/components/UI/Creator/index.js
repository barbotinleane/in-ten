import React from 'react';
import { useParams, useLocation } from "@reach/router"
import { useState, useEffect } from 'react';
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { navigate } from "@reach/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPlay } from '@fortawesome/free-solid-svg-icons'

const StartParty = () => {
  const params = useParams();
  const db = getFirestore();
  
  const [game, setGame] = useState({
    id:params.gameId,
    players:[],
    questionsDone: [],
    started:false
  });
  const [text, setText] = useState("Inviter");
  
  const location = useLocation();
  let isCreator = false;
  if(location.state !== null){
      if(location.state.creatorId === 890989){
          isCreator = true;
      }
  }

  //get and check the game saved in database
  useEffect(() => {
      async function getData() {
          await onSnapshot(doc(db, "games", params.gameId), (doc) => {
              setGame(doc.data());
          });
      }
      getData();
  }, []);

  //every seconds test if game is started
  setInterval(() => {
        if(game.started === true) {
            navigate(`/play-game/${game.id}`, { state: { 
                pseudo: location.state.pseudo,
                isCreator
            } });
        }
  }, 1000);
  clearInterval();

  //start game and update database  
  const startGame = async() => {
      await updateDoc(doc(db, "games", params.gameId), {
          started: true
      });

      const pseudo = game.players[0];
      navigate(`/play-game/${game.id}`, { state: { 
          pseudo,
          isCreator
      } });
  }

  //copy the link to join game to send it to other
  const handleClick = async() => {
      try {
          await navigator.clipboard.writeText(location.href);
      } catch (err) {
          console.error('Failed to copy: ', err);
      }
      setText("Lien copié !");
      setTimeout(() => { setText("Inviter"); }, 1000);
  }

  return (<>
      <h1>Ma partie</h1>
                      
      <h2>Les joueurs : </h2>
      <ul>
      {
          game.players.map((player, index) => {
              return(<li key={index}>{player}</li>);
          })
      }
      </ul>
      
      <div>
          <button className="btn-secondary" onClick={handleClick}>
              <FontAwesomeIcon icon={faLink}/>
              &nbsp;{text}
          </button>
          {(isCreator === true) ? 
          <button className="btn-primary" onClick={startGame}>
              <FontAwesomeIcon icon={faPlay}/>
              &nbsp;Démarrer la partie
          </button> 
          : <></>}
      </div>
  </>);
};

export default StartParty;
