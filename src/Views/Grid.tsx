import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GridContext } from "../context/GridContext";
import GridModel from '../Models/Grid';
import Row from "./Row";

const gameGrid = new GridModel(16, 16).populateCellsWithMineNumber();

export default function Grid() {

    const Grid = useContext(GridContext);


    const toggleCell = (rowIndex: number, columnIndex: number, setStateFunction: Function) => {
        // console.log(grid.toggleCell(rowIndex, columnIndex));
        // setGrid(state => state.toggleCell(rowIndex, columnIndex));
        // setStateFunction();
    }

    useEffect(() => {
        console.log("use effect fired")
        // setGrid(gameGrid)
    }, [gameGrid]);

    return (
        <StyledGrid>
            {
                Grid.rows.map((row, index) => (
                    <Row key={index} toggleCell = {toggleCell} cells={row.cells}/>
                ))
            }
        </StyledGrid>
    )
}

const StyledGrid = styled.div`
    background-color: #1473c7;
    display: flex;
    flex-direction: column;
    min-width: 55%;
    width: fit-content;
    min-height: 40em;
    height: fit-content;
    text-align: center;
    padding: 1em;
    justify-content: space-between;
`

const StyledCell = styled.div`
    border: 0.2em beige solid;
    height: 3em;
    width: 5%;
    text-align: center;
    justify-content: center;
    align-items: center;
`