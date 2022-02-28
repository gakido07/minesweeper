import React, { useContext, useState } from "react";
import styled from "styled-components";
import CellModel from "../Models/Cell";
import Grid from "../Models/Grid";
import Cell from "./Cell";

interface props {
    cells: CellModel[],
    toggleCell: Function,
}

export default function Row({ cells, toggleCell }: props) {

    const [rowCells, setRowCells] = useState(cells);

    return (
        <StyledRow>
            {
                rowCells.map((cell, index) => <Cell rowIndex={cell.rowIndex} toggleCell = {toggleCell} open={cell.open} key={index} columnIndex={cell.columnIndex} mine = {cell.mine} numberOfMinesAround = {cell.numberOfMinesAround} />)
            }
        </StyledRow>
    )
} 

const StyledRow = styled.div`
    height: 3em;
    margin-bottom: 0em;
    width: 100%;
    border: 0.1em beige solid;
    display: flex;
    justify-content: space-between;
`