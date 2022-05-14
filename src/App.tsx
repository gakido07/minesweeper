import React, { useReducer } from 'react';
import styled from 'styled-components';

import { GridContext } from './context/grid.context';
import { GridReducer } from './context/reducers/GridReducer';
import GridModel, { GridFactory } from './Models/Grid';
import GridView from './Views/Grid';

function App() {

  const [ grid, dispatch ] = useReducer(GridReducer, {
    ... new GridFactory(16, 16).build()
  })

  return (
    <StyledApp>
        <GridContext.Provider value={{
          grid: grid,
          control: dispatch
        }}>
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
`;

export default App;
