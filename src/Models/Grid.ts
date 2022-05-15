import { CellCoordinates } from "./Cell";
import _ from "lodash";
import Row from "./Row";

export default interface Grid {
    rows: Row[]
    totalRows: number
    totalColumns: number;
}

export class GridFactory {
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

    private extractNumberOfMines():  number {
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

    build(): Grid {
        this.populateCellsWithMineNumber();
        return this;
    }

    private populateCellsWithMineNumber(): Grid {
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                this.rows[cell.rowIndex].cells[cell.columnIndex].numberOfMinesAround = this.evaluateNumberOfMines(cell.columnIndex, cell.rowIndex);
            })
        });
        return this;
    }

    private evaluateNumberOfMines(rowIndex: number, columnIndex: number): number {

        const unProcessedCoordinates = getSurroundingCellInfo(rowIndex, columnIndex, {
            rows: this.rows,
            totalColumns: this.totalColumns,
            totalRows: this.totalRows
         });         

        let count = 0;

        unProcessedCoordinates.forEach(coordinate => {
            
                if(this.rows[coordinate.rowIndex].cells[coordinate.columnIndex].mine) {
                    count++;
                }
        });
        return count;
    }
}

const recursiveGetSurroundingCellInfo = (rowIndex: number, columnIndex: number, grid: Grid): CellCoordinates[] => {
    const validCells = getSurroundingCellInfo(rowIndex, columnIndex, grid);
    const processed:CellCoordinates [] = [];
    processed.push({
        rowIndex: rowIndex,
        columnIndex: columnIndex
    });
    const more: CellCoordinates[] = []
    for (let count = 0; count < validCells.length; count++) {
        const coordinateInFocus = validCells[count];
        if (
            !processed.some(cell => _.isEqual(({
                rowIndex: coordinateInFocus.rowIndex,
                columnIndex: coordinateInFocus.columnIndex
            }), 
            cell))
        ) {
            console.log(coordinateInFocus);
            const inFocus = getSurroundingCellInfo(coordinateInFocus.rowIndex, coordinateInFocus.columnIndex, grid);
            inFocus.forEach(focus => {
                if (!more.some(cell => _.isEqual(({
                    rowIndex: focus.rowIndex,
                    columnIndex: focus.columnIndex
                }), 
                cell))) {
                    more.push(focus);
                }
            })
        }

    }
    console.log(more);
    return more;
}

const getSurroundingCellInfo = (rowIndex: number, columnIndex: number, grid: Grid): CellCoordinates[] => {
    const N: CellCoordinates = {rowIndex: rowIndex - 1, columnIndex: columnIndex};
    const W: CellCoordinates = {rowIndex: rowIndex, columnIndex: columnIndex - 1};
    const S: CellCoordinates = {rowIndex: rowIndex + 1, columnIndex: columnIndex };
    const E: CellCoordinates = {rowIndex: rowIndex, columnIndex: columnIndex + 1 };
    const NW: CellCoordinates = {rowIndex: rowIndex - 1, columnIndex: columnIndex - 1};
    const SW: CellCoordinates = {rowIndex: rowIndex + 1, columnIndex: columnIndex - 1};
    const SE: CellCoordinates = {rowIndex: rowIndex + 1, columnIndex: columnIndex + 1};
    const NE: CellCoordinates = {rowIndex: rowIndex - 1, columnIndex: columnIndex + 1};
    return [N, W, S, E, NW, SW, SE, NE].filter(coordinate => 
        (coordinate.rowIndex > -1 && coordinate.columnIndex > -1 && coordinate.rowIndex < grid.totalRows && coordinate.columnIndex < grid.totalColumns)
        );
}


export const toggleCell = (rowIndex: number, columnIndex: number, grid: Grid): Grid => {
    console.log(getSurroundingCellInfo(rowIndex, columnIndex, grid));
    const cells = recursiveGetSurroundingCellInfo(rowIndex, columnIndex, grid)
    cells.forEach(cell => {
        if (!grid.rows[cell.rowIndex].cells[cell.columnIndex].open) {
            grid.rows[cell.rowIndex].cells[cell.columnIndex].open = true;
        }
    })

    return grid;
}