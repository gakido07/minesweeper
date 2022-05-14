import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GridContext } from "../context/grid.context";
import Row from "./Row";

export default function Grid() {
    //TODO Refactor code to use context and reducer

    const { grid: { rows } } = useContext(GridContext);


    return (
            <StyledGrid>
            {
                rows.map((row, index) => (
                    <Row key={index} cells={row.cells} />
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
