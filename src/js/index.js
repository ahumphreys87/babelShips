import {Grid} from './classes/Grid';
import {Ship} from './classes/Ship';

let gameGrid;

gameGrid = new Grid({
    rows: 5,
    columns: 5,
    element: '.js-grid'
});

gameGrid.placeShip(new Ship('cruiser', 3));
gameGrid.placeShip(new Ship('battleship', 4));
gameGrid.placeShip(new Ship('destroyer', 2));
