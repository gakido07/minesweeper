import React from 'react';
import './App.css';
import styled from 'styled-components';
import GridView from './Views/Grid';


function App() {
  return (
    <StyledApp>
        <GridView />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  min-height: 100vh;
  height: fit-content;
  background-color: #252727;
`

export default App;
