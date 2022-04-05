export default class Cell {
    open: boolean;
    mine: boolean;
    flagged: boolean;
    rowIndex: number;
    columnIndex: number;
    numberOfMinesAround: Number;

    constructor (rowIndex: number, columnIndex: number) {
        this.open = false;
        this.flagged = false;
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.mine = Math.random() < 0.5;
        this.numberOfMinesAround = 4;
    }
}

export interface CellCoordinate {
    rowIndex: number;
    columnIndex: number;
}
