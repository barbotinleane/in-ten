import styled from "styled-components";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Header({ isLight, handleToggleTheme }) {
    
    return (
        <Wrapper>
            <h1>
                <span className="colorBrand">in</span>
                <span>Ten</span>
            </h1>
            <nav>
                <Link to="/">
                    <MenuEl isCurrentPage={(window.location.pathname !== "/about")? true : false}>
                        Jouer
                    </MenuEl>
                </Link>
                <Link to="/about">
                    <MenuEl isCurrentPage={(window.location.pathname === "/about")? true : false}>
                        A Propos
                    </MenuEl>
                </Link>
            </nav>
            <div>
                <label className="switch">
                    <input type="checkbox" onChange={handleToggleTheme}/>
                    <span className="slider round">
                        {isLight? 
                        <FontAwesomeIcon icon={faMoon} className="icon-switch-right"/> : 
                        <FontAwesomeIcon icon={faMoon} className="icon-switch-left"/>}
                    </span>
                </label>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    height:90px;
    display:flex;
    justify-content:space-between;
    padding:0px 24px;
    align-items:center;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.textHColor};
    & a{
        text-decoration: none;
        color:inherit;
    }
    & a:first-child {
        margin-right: 20px;
    }
`;

const MenuEl = styled.div`
    font-weight: ${props=>props.isCurrentPage? "bold" : "normal"};
    text-decoration: ${props=>props.isCurrentPage? "underline" : "none"};

    &:hover {
        font-weight:bold;
        text-decoration:underline;
    }
`;