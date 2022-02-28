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
        console.log(this);
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
                this.rows[cell.rowIndex].cells[cell.columnIndex].numberOfMinesAround = this.evaluate(cell.columnIndex, cell.rowIndex);
            })
        });

        return this;
    }


    toggleCell(rowIndex: number, columnIndex: number): Grid {
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
                if(cell.columnIndex === columnIndex && cell.rowIndex === rowIndex) {
                    cell.open = true;
                    console.log(cell.open);
                }
            });
        })
        return this;
    }

    private evaluate(columnIndex: number, rowIndex: number): number {
        const top: CellCoordinates = {rowIndex: rowIndex - 1, columnIndex: columnIndex};
        const left: CellCoordinates = {rowIndex: rowIndex, columnIndex: columnIndex - 1};
        const down: CellCoordinates = { rowIndex: rowIndex + 1, columnIndex: columnIndex };
        const right: CellCoordinates = { rowIndex: rowIndex, columnIndex: columnIndex + 1 };

        let count = 0;

        if(top.rowIndex > -1 && top.columnIndex > -1 && top.rowIndex < this.totalRows  && top.columnIndex < this.totalColumns) {
            if(this.rows[top.rowIndex].cells[top.columnIndex].mine) {
                count++;
            }
            if(this.rows[left.rowIndex].cells[left.columnIndex].mine) {
                count ++
            }
            if( this.rows[down.rowIndex].cells[down.columnIndex].mine ) {
                count++;
            }
            if(this.rows[right.rowIndex].cells[right.columnIndex].mine) {
                count++;
            }
        }

        // console.log(count);
        return count;
    }
}