import React, { useState } from 'react';
import { navigate } from "@reach/router";
import { getFirestore } from "firebase/firestore";
// Create a reference to the cities collection
import { doc, updateDoc, arrayUnion } from "firebase/firestore";



const Join = ({param}) => {
  const [pseudo, setPseudo] = useState('');
  
  const joinParty = async () => {
      console.log(pseudo);
      const db = getFirestore();
      const gameRef = doc(db, "games", param);

      // Add the player
      await updateDoc(gameRef, {
        players: arrayUnion(pseudo)
      });

      navigate(`/my-game/${param}`, { state: { 
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

    <button onClick={joinParty}>
        Rejoindre
    </button>
  </div>);
};

export default Join;
