import { useRouteError } from "react-router-dom";
import styled from 'styled-components'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Error>
      <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>Oops!</h1>
      <p style={{marginBottom: '10px'}}>Sorry, an unexpected error has occurred.</p>
      <p style={{opacity: '.7'}}>
        <i>{error.statusText || error.message}</i>
      </p>
    </Error>
  );
}

const Error = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

`