import React, { useState } from 'react';
import { navigate, useParams } from "@reach/router";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, arrayUnion, get } from "firebase/firestore";
import { getGame } from 'firestore';

const Join = () => {
  const [pseudo, setPseudo] = useState('');
    const param = useParams();
  const gameId = param.gameId;
    
  //get game and update it by adding a new player
  const joinParty = async () => {
const db = getFirestore();
      const gameRef = doc(db, "games", gameId);

      await updateDoc(gameRef, {
        players: arrayUnion(pseudo)
      });

      navigate(`/start-game/${gameId}`, { state: {
        isRegistered: 890989,
        pseudo: pseudo
      } });
  }


  return (<div>
          <h1>Rejoindre la partie : </h1>
          <label>Votre pseudo : </label><br/>
          <input type="text" value={pseudo} onChange={(event) => {
            setPseudo(event.target.value);
          }}/>
          <br/>

          <button className="btn-primary" onClick={joinParty} disabled={(pseudo.length < 1)}>
              Rejoindre
          </button>
        </div>);
};

export default Join;
