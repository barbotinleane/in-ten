import styled from "styled-components";

export default function About() {
    return (
        <Wrapper>
            <h2>A propos</h2>
            <p>
                inTen est un jeu de divertissement entre amis en ligne. 
                Vous pouvez créer une partie, et inviter d'autres joueurs en leur
                envoyant le lien. Il est conseillé de pouvoir échanger avec les joueurs
                par visioconférence ou en présentiel. Pour une meilleure expérience de 
                jeu, un minimum de 8 joueurs est nécessaire.
            </p>

            <h2>Les règles du jeu</h2>
            <p>
                Chacun son tour, un joueur recevra une carte avec une question. Il sera 
                appelé le "lecteur". Celui-ci lira la question aux autres joueurs. 
            </p>
            <p>
                Les autres joueurs recevront une intensité (celle-ci dépendra du nombre
                de joueurs présents). Ils devront chacun donner une réponse en fonction de
                 l'intensité reçue et des réponses des autres joueurs.
            </p>
            <p>
                Quand tous les joueurs ont donné leur réponse, le lecteur s'efforcera de replacer
                chacune des réponses en fonction de son intensité.
            </p>

            <h2>Le but du jeu</h2>
            <p>
                inTen est un jeu collaboratif. Le but du jeu est de donner des réponses qui
                permettront au lecteur de replacer chaque réponse dans le bon ordre en faisant
                un sans faute !
            </p>

            <h3 className="colorBrand">
                Et voilà, vous savez tout ! 
            </h3>
            
            <h2 className="colorSecondary">
                Et maintenant... Place à votre imagination !
            </h2>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    
`;