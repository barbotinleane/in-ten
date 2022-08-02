import Intro from "../Intro";
import { useState } from 'react';
import { navigate } from "@reach/router";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
    //get database
    const db = getFirestore();

    //create a random id for the game
    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    };

    //set initial values for the game
    const [game, setGame] = useState({
        id: getRandomString(20),
        players: [],
        questionsDone: [],
        ended: false,
        mistakes: 10
    });

    //create the party and add it to database
    const createParty = async () => {
        try {
            const docRef = await setDoc(doc(db, "games", game.id), game);
            navigate(`/ma-partie/${game.id}`, { state: { creatorId: 890989 } });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (<>
        <Intro/>

        <div id="play" className="box-rounded">
            <h2>Commencer une partie</h2>

            <label>Votre pseudo : </label><br/>
            <input type="text" value={game.players[0]} onChange={(event) => {
                let pseudoArr = [];
                pseudoArr[0] = event.target.value;
                setGame({
                    ...game,
                    players:[...pseudoArr],
                    run: []
                })
            }}/>
            <br/>

            <button className="btn-secondary" onClick={createParty}>
                Créer une nouvelle partie
            </button>
        </div>
    </>);
}
