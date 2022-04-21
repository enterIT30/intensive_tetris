import { SIZE_BLOCK, ROWS, COLUMNS } from "../script.js";

export class View {
  constructor (container) {
    this.container = container;

    this.preview(container);
  }

   colors = {
    J: '#d308e2',
    I: '#d03939',
    O: '#15ff03',
    L: '#fdff63',
    2: '#3a26ff',
    T: '#d62727',
    S: '#9610dc',
  };

  preview(container) {
    const prev = document.createElement('h2');
    prev.classList.add('preview-text');
    container.append(prev);
    prev.insertAdjacentText('afterbegin', 'press enter');
  }

  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');  //? метод getContext()

  init() {
    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  /**
   * @param {Object} area
   */
  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const cell = line[x];
        if (cell !== '0') {
          this.context.fillStyle = this.colors[cell];
          this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK); //? методы context-a
          this.context.strokeStyle = '#202020';
          this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  }
}