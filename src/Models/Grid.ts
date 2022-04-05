import DIFFICULTY from "../logic/game.difficulty";
import Cell, { CellCoordinate } from "./Cell";
import Row from "./Row";

export default class Grid {
    rows: Row[]
    totalRows: number
    totalColumns: number;

    constructor(totalRows: number, totalColumns: number) {
        this.rows = [];
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;

        for (let count = 0; count < totalRows; count ++) {
            this.rows.push(new Row(this.totalColumns, count));
        }
    }

    extractNumberOfMines():  number {
        let count = 0;
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                if(cell.mine) {
                    count++
                }
            });
        });
        return count;
    }

    populateCellsWithMineNumber(): Grid {
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                if(!cell.mine) {
                    this.rows[cell.rowIndex].cells[cell.columnIndex].numberOfMinesAround = this.evaluateNumberOfMines(cell.rowIndex, cell.columnIndex, this.rows);
                }
            });
        });
        return this;
    }

    private evaluateNumberOfMines(rowIndex: number, columnIndex: number, rows: Row[]): number {

        // This function calculates the number mines in all cells surrounding the current cell

        const unProcessedCoordinates = filterValidCells(rowIndex, columnIndex, rows);         

        let count = 0;

        unProcessedCoordinates.forEach(coordinate => {
            if(coordinate.rowIndex > -1 && coordinate.columnIndex > - 1 && coordinate.rowIndex < this.totalRows && coordinate.columnIndex < this.totalColumns) {
                if(this.rows[coordinate.rowIndex].cells[coordinate.columnIndex].mine) {
                    count++;
                }
            }
        });
        return count;
    }
}


const filterValidCells = (rowIndex: number, columnIndex: number, rows: Row[]): CellCoordinate[] => {
    const N: CellCoordinate = {rowIndex: rowIndex - 1, columnIndex: columnIndex};
    const W: CellCoordinate = {rowIndex: rowIndex, columnIndex: columnIndex - 1};
    const S: CellCoordinate = { rowIndex: rowIndex + 1, columnIndex: columnIndex };
    const E: CellCoordinate = { rowIndex: rowIndex, columnIndex: columnIndex + 1 };
    const NW: CellCoordinate = {rowIndex: rowIndex - 1, columnIndex: columnIndex - 1};
    const SW: CellCoordinate = {rowIndex: rowIndex + 1, columnIndex: columnIndex - 1 };
    const SE: CellCoordinate = { rowIndex: rowIndex + 1, columnIndex: columnIndex + 1 };
    const NE: CellCoordinate = { rowIndex: rowIndex - 1, columnIndex: columnIndex + 1 };    
    return validCellFilter([NW, N, NE, E, SE, S, SW, W], rows);
}

export const flagCell = (rowIndex: number, columnIndex: number, rows: Row[]): Row[] => {
    rows[rowIndex].cells[columnIndex].flagged = true;
    return rows;
}

export const openCell = (rowIndex: number, columnIndex: number, rows: Row[]): Row[] => {
    let toggledCells: CellCoordinate[]  = [];
    const processedCoordinates: CellCoordinate[] = [];
    const mainQueue: CellCoordinate[] = filterValidCells(rowIndex, columnIndex, rows);
    rows[rowIndex].cells[columnIndex].open = true;
    if(rows[rowIndex].cells[columnIndex].mine) {
        return rows;
    }
    processedCoordinates.push({ rowIndex: rowIndex, columnIndex: columnIndex});
    let mineCondition = false;
    return rows.map((row) => {
        const queue = mainQueue.filter(queue => (queue.rowIndex === row.rowIndex));
        queue.forEach(coordinate => {
            if (row.cells[coordinate.columnIndex].mine) {
                mineCondition = true;
            }
            if(!mineCondition && !row.cells[coordinate.columnIndex].mine) {
                row.cells[coordinate.columnIndex].open = true;
                toggledCells.push(coordinate);
            }
        });
        toggledCells.forEach(cell => {
            const validCells = filterValidCells(cell.rowIndex, cell.columnIndex, rows).filter(cell => cell.rowIndex === row.rowIndex);
            validCells.forEach(validCell => {
                if(!row.cells[validCell.columnIndex].mine) {
                    row.cells[validCell.columnIndex].open = true;
                }
            })
        })
        return row;
    });
}

const validCellFilter = (cells: CellCoordinate[], rows: Row[]) => {
    return cells.filter(coordinate => (coordinate.rowIndex > -1 && coordinate.columnIndex > -1 && coordinate.rowIndex < rows.length && coordinate.columnIndex < rows[0].cells.length))
}