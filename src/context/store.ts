import { configureStore } from "@reduxjs/toolkit";

import Row from "../Models/Row";
import gridReducer from "./reducers/grid.reducer";


export interface IRootState {
    grid: { rows: Row[]; totalRows: number; totalColumns: number }
}

const store = configureStore({
    reducer: {
        grid: gridReducer
    }
});

export default store;