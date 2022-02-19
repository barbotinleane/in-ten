import styled from "styled-components";
import { useState } from 'react';
import { navigate } from "@reach/router";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 



export default function Home() {
    const db = getFirestore();

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const [game, setGame] = useState(
        {
            id: getRandomString(20),
            players: [],
            questionsDone: [],
            ended: false,
            mistakes: 0
        }
    )

    const createParty = async () => {
        try {
            const docRef = await setDoc(doc(db, "games", game.id), game);
            navigate(`/my-game/${game.id}`, { state: { creatorId: 890989 } });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <Wrapper>
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

            <button onClick={createParty}>
                Créer une nouvelle partie
            </button>
        </Wrapper>
    )
}

const Wrapper = styled.div``;
