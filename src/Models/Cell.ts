export default class Cell {
    open: boolean;
    mine: boolean;
    flagged: boolean;
    rowIndex: number;
    columnIndex: number;
    numberOfMinesAround: Number

    constructor (rowIndex: number, columnIndex: number) {
        this.open = false;
        this.flagged = false;
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.mine = isEven(Math.round(Math.random() * 10));
        this.numberOfMinesAround = 4;
    }
}

export interface CellCoordinates {
    rowIndex: number;
    columnIndex: number;
}

const isEven = (number: number): boolean => {
    return (number % 2) === 0 ? true : false;
}