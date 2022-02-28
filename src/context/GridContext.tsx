import { createContext, useContext } from "react";
import Grid from "../Models/Grid";

const grid = new Grid(16, 16)

export const GridContext = createContext(new Grid(16, 16));
