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
    ['x', 'x', 'x'],
    ['0', 'x', '0'],
    ['0', '0', '0'],
    ]
  },

  moveLeft() {
    this.activeTetramino.x -= 1;
  },
  moveRight() {
    this.activeTetramino.x -= 1;
  },
  moveDown() {
    this.activeTetramino.y += 1;
  },
  rotateTetramino() {

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

showArea(game.viewArea);