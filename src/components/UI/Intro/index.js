import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

export default function Intro({ createParty }) {

    return (
        <Wrapper>
            <div>
                <h2>
                    <Logo>
                        <span className="colorBrand">in</span>
                        <span>Ten</span>
                    </Logo>
                </h2>
                <p>Jeu multijoueurs en ligne</p>
                <button className="btn-secondary" onClick={ createParty }>
                    Jouer
                </button>
            </div>
            <div>
                <Icon>
                    <FontAwesomeIcon icon={ faUsers }/>
                </Icon>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: left;
`;

const Logo = styled.header`
    font-size: 5em;
`;

const Icon = styled.div`
    font-size: 5em;
    display:flex;
    justify-content: space-around;
    align-items: center;

    &:hover {
        font-weight:bold;
    }
`;