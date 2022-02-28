import { useEffect, useState } from "react";
import styled from "styled-components";
import GridModel from '../Models/Grid';
import Row from "./Row";

const gameGrid = new GridModel(16, 16);

export default function Grid() {

    const [rows, setRows] = useState(gameGrid.rows);

    const toggleCell = (rowIndex: number, columnIndex: number, setStateFunction: Function) => {
        setRows(state => state.map(row => {
            for (let rowCount = 0; rowCount < row.cells.length; rowCount++) {
                let cell = row.cells[rowCount];
                if(cell.rowIndex === rowIndex && cell.columnIndex === columnIndex) {
                    cell.open = true;
                }
            }
            return row;
        }));
        setStateFunction();
    }

    useEffect(() => {
        console.log("use effect fired")
    }, [rows]);

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
