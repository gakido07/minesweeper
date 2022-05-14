import { createContext, Dispatch } from "react";

import Grid from "../Models/Grid";
import Action from "./action";

export const GridContext = createContext<{grid: Grid, control: Dispatch<Action<Grid>>}>(null);