import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import GridModel from './Models/Grid';
import GridView from './Views/Grid';
import { GridContext } from './context/GridContext';


function App() {
  return (
    <StyledApp>
      <GridContext.Provider value={new GridModel(16, 16)}>
        <GridView />
      </GridContext.Provider>
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
