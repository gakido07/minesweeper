import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FLAG_CELL, TOGGLE_CELL } from "../context/reducers/grid.actions";
import CellModel from "../Models/Cell";

type CellProps = CellModel;

export default function Cell({ mine, rowIndex, columnIndex, flagged, numberOfMinesAround, open }: CellProps) {

    const dispatch = useDispatch();

    return (
        <StyledCell 
        open = {open} 
        onContextMenu = {(event) => {
            event.preventDefault();
            dispatch(FLAG_CELL({rowIndex: rowIndex, columnIndex: columnIndex}));
        }}
        onClick = {() => dispatch(TOGGLE_CELL({rowIndex: rowIndex, columnIndex: columnIndex}))}>
            { mine && open && <div>m</div> }
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