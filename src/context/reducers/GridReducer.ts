import { Reducer } from "react";
import Grid from "../../Models/Grid";
import Action from "../action";

export const GridReducer: Reducer<Grid, Action<Grid>> = (state, action) => {
    switch (action.type) {
        case 'MUTATE_GRID': return {  ...state, ...action.payload };
        default: return {...state};
    }
}