import React from 'react';

const EndGame = ({ game }) => {
  return (
    <>
        {game.mistakes >= 10 ?
          <>
            <p>
              Dommage... Vous avez perdu toutes vos vies !
            </p>
            <a className="btn-primary" href="/">
              Faire une revanche
            </a>
          </>
          :
          <>
            <p>
              Félicitations ! Vous avez fait moins de 10 erreurs sur 10 questions !!
            </p>
            <p>
              Prêts pour une autre partie ?
            </p>
            <a className="btn-primary" href="/">
                Rejouer
            </a>
          </>
        }
    </>);
};

export default EndGame;
