import styled from "styled-components";

export default function Footer() {
    return (
        <Wrapper>
            <p>inTen</p>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    height:90px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.textHColor};
`;