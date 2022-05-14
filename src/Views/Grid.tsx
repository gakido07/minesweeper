import { useEffect, useState } from "react";
import styled from "styled-components";
import GridModel, { toggleCells } from '../Models/Grid';
import Row from "./Row";

const gameGrid = new GridModel(16, 16).populateCellsWithMineNumber();

export default function Grid() {

    //TODO Refactor code to use context and reducer

    const [rows, setRows] = useState(gameGrid.rows);

    const toggleCell = (rowIndex: number, columnIndex: number, action: string) => {
        setRows(state => toggleCells(state, rowIndex, columnIndex, action));
    }

    return (
        <StyledGrid>
            {
                rows.map((row, index) => (
                    <Row key={index} toggleCell = {toggleCell} cells={row.cells} />
                ))
            }
        </StyledGrid>
    );
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
`;
