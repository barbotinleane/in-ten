import styled from "styled-components";
import Join from "../Join";
import { useParams, useLocation } from "@reach/router"
import { useState, useEffect } from 'react';
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { navigate } from "@reach/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPlay } from '@fortawesome/free-solid-svg-icons'


export default function MyGame() {
    const params = useParams();
    const location = useLocation();
    let isCreator = false;
    let isPlayer = false;
    
    if(location.state !== null){
        if(location.state.creatorId === 890989){
            isCreator = true;
        }
        if(location.state.isRegistered === 890989){
            isPlayer = true;
        }
    }
    
    const [game, setGame] = useState({
        id:params.gameId,
        players:[],
        questionsDone: [],
        started:false
    });

    const [text, setText] = useState("Inviter");
    
    const db = getFirestore();

    useEffect(() => {
        // Create an scoped async function in the hook
        async function getData() {
            await onSnapshot(doc(db, "games", params.gameId), (doc) => {
                setGame(doc.data());
            });
        }    // Execute the created function directly
        getData();
    }, []);

    setInterval(() => {
        if(game.started === true) {
            navigate(`/play-game/${game.id}`, { state: { 
                pseudo: location.state.pseudo,
                isCreator
            } });
        }
    }, 1000);

    clearInterval();
    
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

    const handleClick = async() => {
        try {
            await navigator.clipboard.writeText(location.href);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        setText("Lien copié !");
        setTimeout(() => { setText("Inviter"); }, 1000);
      }

    return (
        <>
            {(isCreator || isPlayer)? 
                <Wrapper>
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
                        <button className="clip" onClick={handleClick}>
                            <FontAwesomeIcon icon={faLink}/>
                            &nbsp;{text}
                        </button>
                        {(isCreator === true) ? 
                        <button onClick={startGame}>
                            <FontAwesomeIcon icon={faPlay}/>
                            &nbsp;Démarrer la partie
                        </button> 
                        : <></>}
                    </div>
                </Wrapper>
                :
                <Join param={params.gameId}/>
            }
        </>
    )
}

const Wrapper = styled.div``;