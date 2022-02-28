import { useEffect, useState } from "react";
import styled from "styled-components";
import CellModel from "../Models/Cell";
import Grid from "../Models/Grid";

type CellProps = CellModel & { toggleCell: Function }

export default function Cell({ mine, rowIndex, columnIndex, numberOfMinesAround, open, toggleCell}: CellProps) {

    const [testOpen, setTestOpen] = useState(false);

    const toggleView = () => {
        setTestOpen(state => !state);
    }

    // useEffect(() => {
    //     if(testOpen) {
    //         toggleCellExecute(rowIndex - 1, columnIndex, )
    //     }
    // }, [testOpen])

    const toggleCellExecute = (rowIndex: number, columnIndex: number): void => {
        toggleCell(rowIndex, columnIndex, toggleView);
    }

    return (
        <StyledCell open = {open} onClick = {() => toggleCell(rowIndex, columnIndex)}>
            {mine && open && <div>m</div>}
            { !mine && numberOfMinesAround && <div>{ numberOfMinesAround }</div> }
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