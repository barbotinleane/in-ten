import { onSnapshot, getFirestore, doc, query, where, getDocs, collection } from "firebase/firestore";

export const getGame = (gameId, snapshot, error) => {
    const db = getFirestore();
    const gameRef = doc(db, 'games', gameId)
    return onSnapshot(gameRef, snapshot, error);
};

export const getQuestion = ([...questionsDone]) => {
    const db = getFirestore();
    const questionsRef = collection(db, 'questions');

    if(questionsDone.length > 0) {
        return getDocs(query(questionsRef, where('id', 'not-in', [...questionsDone])));
    }
    else {
        return getDocs(questionsRef);
    }
};