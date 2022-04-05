import { createReducer } from "@reduxjs/toolkit";
import Grid, { flagCell, openCell } from "../../Models/Grid";
import Row from "../../Models/Row";
import { FLAG_CELL, TOGGLE_CELL } from "./grid.actions";

const grid = new Grid(16, 16).populateCellsWithMineNumber();

const initialState: { rows: Row[]; totalRows: number; totalColumns: number }  = {
    rows: grid.rows,
    totalRows: grid.totalRows,
    totalColumns: grid.totalColumns,
};

const gridReducer = createReducer(initialState, (builder) => {
    builder.addCase(TOGGLE_CELL, (state, action) => {
        const { columnIndex, rowIndex} = action.payload;
        const newGrid = openCell(rowIndex, columnIndex, state.rows);
        return { ...state, rows: newGrid};
    });
    builder.addCase(FLAG_CELL, (state, action) => {
        const { columnIndex, rowIndex } = action.payload;
        const newGrid = flagCell(rowIndex, columnIndex, state.rows);
        return { ...state, rows: newGrid };
    })
});

export default gridReducer;