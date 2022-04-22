import { SIZE_BLOCK, ROWS, COLUMNS, startWrapper } from "../script.js";

export class View {
  constructor (container) {
    this.container = container;
    this.preview(container);
  }

   colors = {
    J: '#d308e2',
    I: '#00a0ea',
    O: '#4cd716',
    L: '#f6ff00',
    2: '#3a26ff',
    T: '#c22f4e',
    S: '#9610dc',
  };

  canvas = document.createElement('canvas');

  preview() {
    this.container.textContent = '';
    const prev = document.createElement('h3');
    prev.classList.add('preview-button');
    startWrapper.append(prev);
    prev.insertAdjacentText('afterbegin', 'press enter');
  }

  init() {
    this.container.textContent = '';
    this.canvas.style.gridArea = 'game';
    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  createBlockScore() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: 'tetris';
      width: ${SIZE_BLOCK * 6}px;
      height: ${SIZE_BLOCK * 5}px;
      font-size: 20px;
      border: 2px solid #fff;
      padding: 20px;
      grid-area: score;
      justify-self: start;
      ;
      `;//align-self: center

    let marginZero = (el) => {
      el.style.margin = 0;
    };

    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');
    const timerElem = document.createElement('p');

    marginZero(linesElem);
    marginZero(scoreElem);
    marginZero(levelElem);
    marginZero(recordElem);
    marginZero(timerElem);

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem, timerElem);

    this.container.append(scoreBlock);

    return (lines, score, level, record, timeInGame) => {
      linesElem.textContent = `lines: ${lines}`;
      scoreElem.textContent = `score: ${score}`;
      levelElem.textContent = `level: ${level}`;
      recordElem.textContent = `record: ${record}`;
      timerElem.textContent = `time: ${timeInGame}`;
    };
  }

  createBlockNextTetramino() {
    const blockNextTetramino = document.createElement('div');
    blockNextTetramino.style.cssText = `
      width: ${SIZE_BLOCK * 6}px;
      height: ${SIZE_BLOCK * 5}px;
      border: 2px solid #fff;
      padding: 20px;
      font-size: 30px;
      grid-area: next;
      display: flex;
      align-items: center;
      justify-self: end;
      justify-content: center;
      `;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    blockNextTetramino.append(canvas);

    this.container.append(blockNextTetramino);

    return (tetramino) => {
      canvas.width = SIZE_BLOCK * tetramino.length;
      canvas.height = SIZE_BLOCK * tetramino.length;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const cell = line[x];
          if (cell !== '0') {
            context.fillStyle = this.colors[cell];
            context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK); //? методы context-a
            context.strokeStyle = '#202020';
            context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          }
        }
      }
    };
  }


  /**
   * @param {Object} area
   */
  showArea(area) {
    const context = this.canvas.getContext('2d');  //? метод getContext()

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const cell = line[x];
        if (cell !== '0') {
          context.fillStyle = this.colors[cell];
          context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK); //? методы context-a
          context.strokeStyle = '#202020';
          context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  }
}