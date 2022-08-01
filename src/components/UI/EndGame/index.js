import React from 'react';
import { navigate } from "@reach/router";
import { Link } from "@reach/router";

const EndGame = () => {
  const returnHome = async() => {
    await navigate("/", { replace: true });
  }

  return (
    <>
        <p>La partie est terminée !</p>
        <a className="btn-primary" href="/">
            Retour à l'accueil
        </a>
    </>);
};

export default EndGame;
