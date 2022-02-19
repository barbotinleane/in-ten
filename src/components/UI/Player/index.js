import styled from "styled-components";

export default function Player({ children }) {
    return (
       <Wrapper>
            { children }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    color: ${(props) => props.theme.secondaryColor};
    margin: 15px;
    border-bottom: 1px solid lightgrey;
`;