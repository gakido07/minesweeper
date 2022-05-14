import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GridContext } from "../context/grid.context";
import CellModel from "../Models/Cell";
import Grid, { toggleCell } from "../Models/Grid";

type CellProps = CellModel 

export default function Cell({ mine, rowIndex, columnIndex, flagged, numberOfMinesAround, open}: CellProps) {

    const { grid ,control } = useContext(GridContext);

    return (
        <StyledCell 
        open = {open} 
        onContextMenu = {(event) => {
            event.preventDefault();
            control({
                type: 'MUTATE_GRID',
                payload: toggleCell(rowIndex, columnIndex, grid)
            })
        }} 
        onClick = {() => ''}>
            {mine && open && <div>m</div>}
            { !open && flagged && <div> f </div> }
            { !mine && open && numberOfMinesAround && <div>{ numberOfMinesAround }</div> }
        </StyledCell>
    );
}

const StyledCell = styled.div<{open: boolean}>`
    min-width: 3em;
    height: 100%;
    border: 0.3em solid beige;
    background-color: ${props => props.open ? "red" : "black"};
    transition: all 0.1s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    :hover{
        cursor: pointer;
    }
`;