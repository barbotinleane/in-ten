import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { doc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

//order players by intensities and convert the names to an array
const sortPlayersByIntensityInArray = (players) => {
    let arrayPlayers = [];
    for (const player of players) {
        arrayPlayers[player.intensity-1] = player.pseudo;
    }

    return arrayPlayers;
}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const DragAndDrop = ({ itemsSended, game, gameId, runGame }) => {
    const [items, setItems] = useState([...itemsSended]);
    const [mistakes, setMistakes] = useState(0);
    const [isValidated, setIsValidated] = useState(false);
    const playersByIntensity = sortPlayersByIntensityInArray(itemsSended);


    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
        return;
        }

        const newArrayItems = reorder(
        [...items],
        result.source.index,
        result.destination.index
        );

        setItems([
        ...newArrayItems
        ]);
    }

  const validate = async() => {
    let endGame = {
        id: game.id,
        players: [...game.players],
        questionsDone: [...game.questionsDone],
        run: [...game.run],
        started: game.started,
        ended: game.ended,
        mistakes: game.mistakes
    };

    let mistakesCounter = 0;
    for(let i=1; i<items.length; i++) {
        if(items[i].intensity < items[i-1].intensity){
            endGame.mistakes = endGame.mistakes - 1;
            mistakesCounter++;
        }
    }
    setMistakes(mistakesCounter);
    
    const db = getFirestore();
    const gameRef = doc(db, "games", gameId);

    await updateDoc(gameRef, {...endGame});
    
    setIsValidated(true);
  }

  return (
      <>
        {(isValidated) ? 
          <>
            <p>Vous avez perdu {mistakes} vies.</p>
            <div>
                Le bon ordre des réponses était :
                <div className="row">
                    {playersByIntensity.map((item) => (
                        <div className="box-grey">{item}</div>
                    ))
                    }
                </div>
            </div>
            <button className="btn-primary" onClick={runGame}>Passer à la manche suivante</button>
          </>
          :
          <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    >
                    {items.map((item, index) => (
                        <Draggable key={item.pseudo} draggableId={item.pseudo} index={index}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            >
                            {item.pseudo}
                            </div>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>

            <button className="btn-primary" onClick={validate}>Valider</button>
          </>
        }
      </>
    );
}

export default DragAndDrop;