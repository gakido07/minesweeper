import Cell from "./Cell";

export default class Row {
    rowIndex: number;
    cells: Cell[];

    constructor(columnNumber: number, rowIndex: number) {
        this.cells = [];
        this.rowIndex = rowIndex;
        for (let count = 0; count < columnNumber; count ++ ) {
            this.cells.push(new Cell(rowIndex, count));
        }
    }
}