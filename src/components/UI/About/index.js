
export default function About() {
    return (
        <section>
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
                Chacun son tour, un joueur appelé "lecteur" recevra une question.
            </p>
            <p className="italic">
                Exemple : Vous partez en expédition en forêt vierge. Quel objet emmenez-vous avec vous ? Du plus utile
                au plus ridicule.
            </p>
            <p>
                Les autres joueurs recevront une intensité (celle-ci dépendra du nombre
                de joueurs présents). Ils devront chacun inventer une réponse en fonction de
                 l'intensité reçue et des réponses des autres joueurs.
            </p>
            <p className="italic">
                Exemple : Marie a l'intensité 1 sur 6, elle répond : "un couteau suisse". Pierre a l'intensité 6 sur 6, il
                répond : "une bétonnière".
            </p>
            <p>
                Quand tous les joueurs ont donné leur réponse, le lecteur doit deviner l'ordre des réponses en fonction de
                leur intensité.
            </p>

            <h2>Le but du jeu</h2>
            <p>
                inTen est un jeu collaboratif. Le but du jeu est de donner des réponses qui
                permettront au lecteur de replacer chaque réponse dans le bon ordre en faisant
                un sans faute !
            </p>
            <p>
                Un compteur de fautes s'affiche. Si l'équipe réussi à enchainer 10 questions pour moins de 10 fautes, elle gagne... 
                Alors, prêts à relever le défi ?
            </p>
        </section>
    )
}