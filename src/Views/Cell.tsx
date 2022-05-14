import { useEffect, useState } from "react";
import styled from "styled-components";
import CellModel from "../Models/Cell";
import Grid from "../Models/Grid";

type CellProps = CellModel & { toggleCell: Function }

export default function Cell({ mine, rowIndex, columnIndex, flagged, numberOfMinesAround, open, toggleCell}: CellProps) {

    return (
        <StyledCell 
        open = {open} 
        onContextMenu = {(event) => {
            event.preventDefault();
            toggleCell(rowIndex, columnIndex, "flag")
        }} 
        onClick = {() => toggleCell(rowIndex, columnIndex, "open")}>
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