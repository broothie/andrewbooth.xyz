export default class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.foreground = document.getElementById('foreground');

        this.stepHz = 10;
        this.cellSize = 14;
        this.seedRatio = 0.2;
        this.colorMap = {
            dead: '#ffffff',
            reviving: '#fbfbfb',
            dying: '#f7f7f7',
            alive: '#f3f3f3'
        };

        this.cells = [];

        for (let method of ['render', 'stretch']) this[method] = this[method].bind(this);

        this.init();
    }

    get ctx() {
        return this.canvas.getContext('2d');
    }

    get width() {
        return this.cells.length;
    }

    get height() {
        return this.cells[0]?.length || 0;
    }

    init() {
        this.stretch();
        this.seed();
        this.updateCells();
        this.paint()
    }

    seed() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (Math.random() < this.seedRatio) this.cells[x][y] = 'alive';
            }
        }
    }

    render() {
        this.stretch();
        this.updateCells();
        this.paint();
        setTimeout(() => requestAnimationFrame(this.render), 1000 / this.stepHz);
    }

    stretch() {
        const width = this.foreground.offsetWidth;
        const height = this.foreground.offsetHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        const xCells = Math.ceil(width / this.cellSize);
        const yCells = Math.ceil(height / this.cellSize);

        while (this.cells.length < xCells) this.cells.push([]);
        while (this.cells.length > xCells) this.cells.pop();

        while ((this.cells[0]?.length || 0) < yCells) this.cells.forEach(col => col.push('dead'));
        while ((this.cells[0]?.length || 0) > yCells) this.cells.forEach(col => col.pop());
    }

    updateCells() {
        this.cells = this.newCells();
    }

    newCells() {
        const newCells = [];
        for (let x = 0; x < this.width; x++) {
            const col = this.cells[x];
            const newCol = [];

            for (let y = 0; y < this.height; y++) {
                const cell = col[y];
                const alive = ['alive', 'dying'].includes(cell);
                const neighbors = neighborsOf(this.cells, x, y);
                const aliveNeighbors = neighbors.reduce((count, cell) => count + Number(['alive', 'dying'].includes(cell)), 0);

                let nextState;
                if (alive) {
                    nextState = aliveNeighbors === 2 || aliveNeighbors === 3 ? 'alive' : 'dead';
                } else {
                    nextState = aliveNeighbors === 3 ? 'alive' : 'dead';
                }

                newCol.push(nextState);
            }

            newCells.push(newCol);
        }

        for (let x = 0; x < this.width; x++) {
            const col = newCells[x];

            for (let y = 0; y < this.height; y++) {
                const cell = col[y];
                const neighbors = neighborsOf(newCells, x, y);
                const aliveNeighbors = neighbors.reduce((count, cell) => count + Number(['alive', 'dying'].includes(cell)), 0);

                if (cell === 'alive' && aliveNeighbors !== 2 && aliveNeighbors !== 3) {
                    col[y] = 'dying';
                } else if (cell === 'dead' && aliveNeighbors === 3) {
                    col[y] = 'reviving';
                }
            }
        }

        return newCells;
    }

    neighborsOf(x, y) {
        const neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                neighbors.push(this.cells[mod(x + i, this.width)][mod(y + j, this.height)]);
            }
        }

        return neighbors;
    }

    paint() {
        for (let x = 0; x < this.width; x++) {
            const col = this.cells[x];

            for (let y = 0; y < this.height; y++) {
                const cell = col[y];
                this.drawCell(x, y, this.colorMap[cell]);
            }
        }
    }

    drawCell(x, y, color) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
}

const neighborsOf = (cells, x, y) => {
    const width = cells.length;
    const height = cells[0]?.length || 0;

    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            neighbors.push(cells[mod(x + i, width)][mod(y + j, height)]);
        }
    }

    return neighbors;
};

const mod = (n, m) => n < 0 ? (m + n) % m : n % m;
