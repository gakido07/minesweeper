import { useState } from "react";
import styled from "styled-components";
import CellModel from "../Models/Cell";

type CellProps = CellModel & { toggleCell: Function }

export default function Cell({ mine, rowIndex, columnIndex, numberOfMinesAround, open, toggleCell }: CellProps) {

    const [testOpen, setTestOpen] = useState(false);

    const toggleView = () => {
        setTestOpen(state => !state);
    }

    const toggleCellExecute = (): void => {
        toggleCell(rowIndex, columnIndex, toggleView);
    }

    return (
        <StyledCell open = {testOpen} onClick = {() => toggleCellExecute()}>
            {mine && testOpen && <div>m</div>}
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