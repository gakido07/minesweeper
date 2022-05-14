import Cell, { CellCoordinates } from "./Cell";
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
        })

        return count;
    }

    populateCellsWithMineNumber(): Grid {
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                this.rows[cell.rowIndex].cells[cell.columnIndex].numberOfMinesAround = this.evaluateNumberOfMines(cell.columnIndex, cell.rowIndex);
            })
        });
        return this;
    }


    toggleCell(rowIndex: number, columnIndex: number): Grid {
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                if(cell.columnIndex === columnIndex && cell.rowIndex === rowIndex) {
                    cell.open = true;
                }
            });
        })
        return this;
    }

    private evaluateNumberOfMines(rowIndex: number, columnIndex: number): number {

        /* This function calculates the number mines in all cells surrounding the current cell in the iteration using eight 
        *  cardinal points as variables  */

        //TODO Think of a more efficient way to refactor this function

        const unProcessedCoordinates = getSurroundingCellInfo(rowIndex, columnIndex);         

        let count = 0;

        unProcessedCoordinates.forEach(coordinate => {
            if(coordinate.rowIndex > -1 && coordinate.columnIndex > -1 && coordinate.rowIndex < this.totalRows && coordinate.columnIndex < this.totalColumns) {
                if(this.rows[coordinate.rowIndex].cells[coordinate.columnIndex].mine) {
                    count++;
                }
            }
        });

        return count;
    }

}

const getSurroundingCellInfo = (rowIndex: number, columnIndex: number): CellCoordinates[] => {
    const N: CellCoordinates = {rowIndex: rowIndex - 1, columnIndex: columnIndex};
    const W: CellCoordinates = {rowIndex: rowIndex, columnIndex: columnIndex - 1};
    const S: CellCoordinates = { rowIndex: rowIndex + 1, columnIndex: columnIndex };
    const E: CellCoordinates = { rowIndex: rowIndex, columnIndex: columnIndex + 1 };
    const NW: CellCoordinates = {rowIndex: rowIndex - 1, columnIndex: columnIndex - 1};
    const SW: CellCoordinates = {rowIndex: rowIndex + 1, columnIndex: columnIndex - 1 };
    const SE: CellCoordinates = { rowIndex: rowIndex + 1, columnIndex: columnIndex + 1 };
    const NE: CellCoordinates = { rowIndex: rowIndex - 1, columnIndex: columnIndex + 1 };

    return [N, W, S, E, NW, SW, SE, NE];
}


export function toggleCells (rows: Row[], rowIndex: number, columnIndex: number, action: string): Row[] {
    return rows.map(row => {
        if(row.rowIndex === rowIndex) {
            let cell = row.cells[columnIndex];
            if(cell.rowIndex === rowIndex && cell.columnIndex === columnIndex) {
                if (action === 'open') {
                    cell.open = true;
                    if(!cell.mine) {
                        const unProcessedCoordinates = getSurroundingCellInfo(rowIndex, columnIndex);
                        unProcessedCoordinates.forEach(coordinate => {
                            if(coordinate.rowIndex > -1 && coordinate.columnIndex > -1 && coordinate.rowIndex < rows.length && coordinate.columnIndex < rows[0].cells.length) {
                            rows[coordinate.rowIndex].cells[coordinate.columnIndex].open = true;
                        }                    
                    });
                    }
                }

                if (action === 'flag') {
                    cell.flagged = true;
                }
            }
        }
        return row;
    });
}
