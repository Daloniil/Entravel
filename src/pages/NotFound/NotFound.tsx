import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 4em;
  color: #e74c3c;
  margin-bottom: 20px;
`;

const NotFoundText = styled.p`
  font-size: 1.2em;
  color: #333;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Page Not Found</NotFoundText>
      <NotFoundText>The page you are looking for does not exist.</NotFoundText>
    </NotFoundContainer>
  );
}

export default NotFound;
