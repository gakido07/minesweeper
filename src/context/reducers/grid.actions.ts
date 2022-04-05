import { createAction } from "@reduxjs/toolkit";

import { CellCoordinate } from "../../Models/Cell";

export const TOGGLE_CELL = createAction('TOGGLE_CELL', (payload: CellCoordinate) => {
    return {
        payload: payload
    }
});

export const FLAG_CELL = createAction('FLAG_CELL', (payload: CellCoordinate) => ({payload: payload}));

