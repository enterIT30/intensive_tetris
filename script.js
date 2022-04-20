const SIZE_BLOCK = 35;

const game = {
  area: [
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
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'x'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'x'],
    ['x', 'x', '0', '0', 'x', 'x', '0', '0', '0', 'x'],
    ['0', 'x', 'x', '0', 'x', 'x', '0', '0', '0', 'x'],
  ],

  activeTetramino: {
    x: 3,   //! Координаты свойства block (по первому элементу, в первом массиве)
    y: 0,
    figure: [
    ['0', 'x', '0'],
    ['0', 'x', '0'],
    ['x', 'x', '0'],
    ],
    rotationIndex: 0,
    rotation: [
      [
        ['0', 'x', '0'],
        ['0', 'x', '0'],
        ['x', 'x', '0'],
      ],
      [
        ['x', '0', '0'],
        ['x', 'x', 'x'],
        ['0', '0', '0'],
      ],
      [
        ['0', 'x', 'x'],
        ['0', 'x', '0'],
        ['0', 'x', '0'],
      ],
      [
        ['0', '0', '0'],
        ['x', 'x', 'x'],
        ['0', '0', 'x'],
      ],
    ],
  },

  moveLeft() {
    if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
      this.activeTetramino.x -= 1;
    }
  },

  moveRight() {
    if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
      this.activeTetramino.x += 1;
    }
  },

  moveDown() {
    if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
      this.activeTetramino.y += 1;
    } else {
      this.stopMove();
    }
  },

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
  },

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const {x, y, figure: tetramino} = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];

      for (let j = 0; j < row.length; j++) {
        const fullFigure = row[j];
        if (fullFigure === 'x') {
          area[y + i][x + j] = tetramino[i][j];
        }
      }
    }
    return area;
  },

  checkOutPosition(x,y) {
    const tetramino = this.activeTetramino.figure;
    for (let i = 0; i < tetramino.length; i++) {
      for (let j = 0; j < tetramino[i].length; j++) {
        if (tetramino[i][j] === '0') {
          continue;
        }
        if (!this.area[y + i] ||
            !this.area[y + i][x + j] ||
            this.area[y + i][x + j] === 'x') {//? не понял логику
          return false;
        }
      }
    }
    return true;
  },

  stopMove() {
    const {x, y, figure: tetramino} = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === 'x') {
          this.area[y + i][x + j] = tetramino[i][j];
        }
      }
    }
  },
};

const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);
canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext('2d');  //? метод getContext()

/**
 * @param {Object} area
 */
let showArea = area => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const cell = line[x];
      if (cell === 'x') {
        context.fillStyle = '#f7971d';
        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK); //? методы context-a
        context.strokeStyle = '#202020';
        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
      }
    }
  }
};

window.addEventListener('keydown', e => {
  const key = e.code;
  console.log(key);
  switch(key) {
    case 'ArrowDown':
      game.moveDown();
      showArea(game.viewArea);
      break;
    case 'ArrowLeft':
      game.moveLeft();
      showArea(game.viewArea);
      break;
    case 'ArrowRight':
      game.moveRight();
      showArea(game.viewArea);
      break;
    case 'ArrowUp':
      game.rotateTetramino();
      showArea(game.viewArea);
      break;
  }
});

showArea(game.viewArea);