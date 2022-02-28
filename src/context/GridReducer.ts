import Grid from "../Views/Grid";
import GridModel from "../Models/Grid";

export const TOGGLE_CELL = 'TOGGLE_CELL';

export const toggleCell = (rowIndex: number, columnIndex: number, grid: GridModel) => ({
    type: TOGGLE_CELL,
    grid: grid.toggleCell(rowIndex, columnIndex)
})

export const initialState = {
    grid:  new GridModel(16, 16),
}

export const GridReducer = (state = initialState, action: any) => {
    switch(action) {
        case 'TOGGLE_CELL':
            return {
                ...state, grid: action.grid
            }
    }
}