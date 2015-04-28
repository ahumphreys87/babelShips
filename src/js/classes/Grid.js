const LEFT = 0;
const RIGHT = 1;
const UP = 2;
const DOWN = 3;

export class Grid {

    constructor(properties) {
        this.rows  = properties.rows;
        this.cols  = properties.columns;
        this.element = properties.element;

        this._createCells();
    }

    _createCells() {
        this._cells = [
            for (x of Array.apply(0, Array(this.rows)))
                [
                    for (y of Array.apply(0, Array(this.cols)))
                        0
                ]
        ];
    }

    render() {
        let self;
        let template;

        self = this;
        template = '';

        this._cells.forEach((row, rowIndex) => {
            template += '<div class="row">';
            
            row.forEach((cell, cellIndex) => {
                template += `<div class="cell" data-row="${rowIndex}" data-cell="${cellIndex}"></div>`;
            })

            template += '</div>';
        });

        document.querySelector(this.element).innerHTML = template;

        var cells = document.getElementsByClassName("cell");
        for (var i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', function() {
                self.checkCell(this);
            }, false);
        }
    }

    checkCell(cell) {
        if (this._cells[cell.dataset.row][cell.dataset.cell]) {
            cell.style.background = 'red';

        } else {
            cell.style.background = 'blue';
        }

        cell.removeEventListener('click');
    }

    placeShip(ship) {
        let row;
        let col;
        let direction;
        let placed;
        let collision;

        row = Math.floor(Math.random() * this.rows);
        col = Math.floor(Math.random() * this.cols);
        direction = Math.floor(Math.random() * 3);
        placed = false;
        collision = false;

        var updateVars = {
            [LEFT]() {
                col--;
            },
            [RIGHT]() {
                col++;
            },
            [UP]() {
                row--;
            },
            [DOWN]() {
                row++;
            }
        }

        if (this._checkFit(row, col, direction, ship.getLength())) {
            for (var x of Array.apply(0, Array(ship.getLength()))) {
                if (!this._cells[row][col]) {
                    this._cells[row][col] = ship.id;
                    updateVars[direction]();
                } else {
                    collision = true;
                    break;
                }
            }

            if (!collision) {
                placed = true;
            }
        }

        if (!placed) {
            this.removeShip(ship.id);
            this.placeShip(ship);
            return;
        }

        this.render();
    }

    removeShip(shipID) {
        this._cells.forEach(row => {
            row.forEach((cell, index) => {
                if (cell === shipID) {
                    row[index] = 0;
                }
            })
        });
    }

    _checkFit(row, col, direction, shipLength) {
        var self = this;

        var checks = {
            [LEFT]() {
                return col - shipLength > -1;
            },
            [RIGHT]() {
                return col + shipLength <= self._cells[row].length;
            },
            [UP]() {
                return row - shipLength > -1;
            },
            [DOWN]() {
                return row + shipLength >= self._cells.length;
            }
        };

        return checks[direction]();
    }
}
