import React from 'react';
import styled from "styled-components";
import { useParams, useLocation, navigate } from "@reach/router";
import { doc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { getGame, getQuestion } from '../../../firestore';
import EndGame from '../EndGame';
import Player from '../Player';
import DragAndDrop from '../DragAndDrop';

const Play = () => {
  const params = useParams();
  const location = useLocation();

  const [pseudo, setPseudo] = useState(location.state.pseudo);
  const isCreator = location.state.isCreator;
  const [game, setGame] = useState({
    run:[]
  });
  const [question, setQuestion] = useState({
    question: "",
    intensity: ""
  });
  const [isReader, setIsReader] = useState(false);
  const [reader, setReader] = useState("");
  const [indexReader, setIndexReader] = useState(0);
  const [intensity, setIntensity] = useState();
  const [isEnded, setIsEnded] = useState(false);
  const [notReader, setNotReader] = useState([]);

  useEffect(() => {
    const getData = getGame(params.gameId,
        (querySnapshot) => {
            setGame(querySnapshot.data());
        },
        (error) => console.log('game-get-fail')
    );
    return getData;
  }, [params.gameId, setGame]);

  useEffect(() => {
    let numberOfRuns = game.run.length;
    if(numberOfRuns > 0) {
      setQuestion({
        question: game.run[numberOfRuns - 1].question, 
        intensity: game.run[numberOfRuns - 1].intensity
      });

      setNotReader([
        ...game.run[numberOfRuns - 1].otherPlayers
      ])

      setReader(game.run[numberOfRuns - 1].reader);
      
      if(pseudo === game.run[numberOfRuns - 1].reader) {
        setIsReader(true);
      }
      else {
        setIsReader(false);
      }
      for(let player of game.run[numberOfRuns - 1].otherPlayers) {
        if(player.pseudo === pseudo){
          setIntensity(player.intensity);
        }
      }
    }
    if(game.ended === true) {
      setIsEnded(true);
    }
  }, [game, pseudo, setQuestion, setIsReader]);

  const getRandomQuestion = async() => {
    const querySnapshot = await getQuestion([...game.questionsDone]);
    let listeDeQuestions = [];

    querySnapshot.forEach((doc) => {
      listeDeQuestions = [
        ...listeDeQuestions,
        {...doc.data()}
      ];
    });

    const numberQuestions = listeDeQuestions.length;
    const randomIndex = Math.floor(Math.random() * (numberQuestions - 0));

    return listeDeQuestions[randomIndex];
  }

  const runGame = async() => {
    const db = getFirestore();
    const gameRef = doc(db, "games", params.gameId);

    if(game.questionsDone.length >= 9) {
      let endGame = {
        id: game.id,
        players: [...game.players],
        questionsDone: [...game.questionsDone],
        run: [...game.run],
        started: game.started,
        ended: true
      };

      await updateDoc(gameRef, {...endGame});

      setIsEnded(true);
    }
    else {
      if(isCreator) {
        setPseudo(game.players[0]);
      }
      
      let numberPlayers = game.players.length;
      setIndexReader(indexReader + 1);
      if(indexReader > (numberPlayers - 1)) {
        setIndexReader(0);
      }
      let otherPlayers = [];
      let intensities = [];
      
      for(let i=1; i<=(numberPlayers-1); i++) {
        intensities.push(i);
      }

      for(const player of game.players) {
        if(game.players[indexReader] !== player){
          const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];

          intensities = intensities.filter(function(value){ 
              return value !== randomIntensity;
          });

          otherPlayers.push({
            pseudo: player, 
            intensity: randomIntensity
          });
        }
      }

      const q = await getRandomQuestion([...game.questionsDone]);
      
      const addRun = {
        id: game.id,
        players: [...game.players],
        questionsDone: [
          ...game.questionsDone,
          q.id
        ],
        run: [
          ...game.run, 
          {
            reader: game.players[indexReader],
            question: q.question,
            intensity: q.intensity,
            otherPlayers: [...otherPlayers]
          }
        ],
        started: game.started
      };

      // Add the player
      await updateDoc(gameRef, {...addRun});
    }
  }

  return (
  <>
    <Player>
      <div>
        {pseudo}
      </div>
      <div>
        {game.mistakes}
      </div>
    </Player>

    {(game.run.length === 0) ?
      <>
          {(isCreator)? 
          <button onClick={runGame}>Démarrer la manche</button>
          : 
          <p>En attente de démarrer la partie...</p>
          }
      </>
      :<>
        {(isEnded)? 
          <>
            <EndGame/>
          </>
          : 
          <>
            {(isReader)?
              <>
                <p>{pseudo}, lisez la question suivante aux autres joueurs : </p>
                <Question>
                  <p>{question.question}</p>
                  <p>{question.intensity}</p>
                </Question>
                <p>Attendez que chaque joueur donne sa réponse puis replacez les dans l'ordre de leur réponse...</p>
                <DragAndDrop itemsSended={notReader} game={game} gameId={params.gameId} runGame={runGame}/>
              </>
              :<>
                <p>Le lecteur est : {reader}</p>
                <h1>La question : </h1>
                <Question>
                  <p>{question.question}</p>
                  <p>{question.intensity}</p>
                </Question>
                <h2>Lorsque ce sera votre tour, vous donnerez une réponse avec l'intensité : </h2>
                <p className='intensity'>{intensity}</p>
              </>
            }
          </>
        }
      </>
    }
  </>)
};

export default Play;


const Question = styled.div`
    text-align: center;
    color: ${(props) => props.theme.brandColor};
    background-color: ${(props) => props.theme.secondaryColor};
    margin: auto;
    padding: 20px;
    width: 80%;
    border-radius: 30px;
    border-bottom: 1px solid lightgrey;
`;