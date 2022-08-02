import React from 'react';
import { navigate } from "@reach/router";

const EndGame = () => {
  const returnHome = async() => {
    await navigate("/", { replace: true });
  }

  return (
    <>
        <p>
            Dommage... Vous avez perdu toutes vos vies !
        </p>
        <a className="btn-primary" href="/">
            Retour à l'accueil
        </a>
    </>);
};

export default EndGame;
