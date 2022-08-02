import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

export default function Intro() {
    return (
        <section className="row-space-around">
            <div>
                <h2>
                    <div className="size-5">
                        <span className="colorBrand">in</span>
                        <span>Ten</span>
                    </div>
                </h2>
                <p>Jeu multijoueurs en ligne</p>
            </div>
            <div>
                <div className="size-5">
                    <FontAwesomeIcon icon={ faUsers }/>
                </div>
            </div>
        </section>
    )
}