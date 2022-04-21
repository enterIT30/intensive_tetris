import { tetraminoes } from './tetraminoes.js';
import { ROWS, COLUMNS } from '../script.js';

export class Game {
  area = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ];

  activeTetramino = this.createTetramino();
  nextTetramino = this.createTetramino();

  changeTetramino() {
    this.activeTetramino = this.nextTetramino;
    this.nextTetramino = this.createTetramino(); //? не понял
  }

  createTetramino() {
    const keys = Object.keys(tetraminoes);
    const letterTetramino = keys[Math.floor(Math.random() * keys.length)];
    const rotation = tetraminoes[letterTetramino];
    const rotationIndex = Math.floor(Math.random() * rotation.length);
    const figure = rotation[rotationIndex];

    return {
      figure,
      rotation,
      rotationIndex,
      x: 3, //! Координаты свойства block (по первому элементу, в первом массиве)
      y: 0,
    };
  }

  moveLeft() {
    if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
      this.activeTetramino.x -= 1;
    }
  }

  moveRight() {
    if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
      this.activeTetramino.x += 1;
    }
  }

  moveDown() {
    if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
      this.activeTetramino.y += 1;
    } else {
      this.stopMove();
    }
  }

  rotateTetramino() {
    this.activeTetramino.rotationIndex =
      this.activeTetramino.rotationIndex < 3 ?
        this.activeTetramino.rotationIndex + 1 : 0;

    this.activeTetramino.figure =
      this.activeTetramino.rotation[this.activeTetramino.rotationIndex];

    if (!this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y)) {
      this.activeTetramino.rotationIndex =                      //? не понял
        this.activeTetramino.rotationIndex > 0 ?
          this.activeTetramino.rotationIndex - 1 : 3;

      this.activeTetramino.figure =
        this.activeTetramino.rotation[this.activeTetramino.rotationIndex];

    }
  }

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const {x, y, figure: tetramino} = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];

      for (let j = 0; j < row.length; j++) {
        const fullFigure = row[j];
        if (fullFigure !== '0') {
          area[y + i][x + j] = tetramino[i][j];
        }
      }
    }
    return area;
  }

  checkOutPosition(x,y) {
    const tetramino = this.activeTetramino.figure;
    for (let i = 0; i < tetramino.length; i++) {
      for (let j = 0; j < tetramino[i].length; j++) {
        if (tetramino[i][j] === '0') {
          continue;
        }
        if (!this.area[y + i] ||
            !this.area[y + i][x + j] ||
            this.area[y + i][x + j] !== '0') {//? не понял логику
          return false;
        }
      }
    }
    return true;
  }

  stopMove() {
    const {x, y, figure: tetramino} = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== '0') {
          this.area[y + i][x + j] = tetramino[i][j];
        }
      }
    }

    this.changeTetramino();
    this.clearRow();
  }

  clearRow() {
    const rows = []; //! будет заполняться строками, которые нужно удалить

    for (let i = ROWS - 1; i >= 0; i--) {
      let countCell = 0; // количество ячеек в строке

      for (let j = 0; j < COLUMNS; j++) {
        if (this.area[i][j] !== '0') {
          countCell +=1;
        }
      }

      if (!countCell) {
        break;
      }
      if (countCell === COLUMNS) {
        rows.unshift(i);
        console.log(rows);
      }
    }
    
    rows.forEach(i => {
      this.area.splice(i, 1);
      this.area.unshift(Array(COLUMNS).fill('0'));
    });
    
  }
}