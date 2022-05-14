import React from "react";
import styled from "styled-components";
import CellModel from "../Models/Cell";
import Cell from "./Cell";

interface props {
    cells: CellModel[],
    toggleCell: Function,
}

export default function Row({ cells, toggleCell }: props) {

    return (
        <StyledRow>
            {
                cells.map((cell, index) => <Cell {... cell} toggleCell = { toggleCell } key = {index} />)
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