
import styled from 'styled-components';

export default function Question({ question }) {
  return (
    <Wrapper>
      <p>{question.question}</p>
      <p>{question.intensity}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.secondaryColor};
  margin: auto;
  padding: 20px;
  width: 80%;
  border-radius: 30px;
  border-bottom: 1px solid lightgrey;
`;