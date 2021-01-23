
// Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const FRAMERATE = 30;
// const FRAMERATE = 60;
const TILE_SIZE = 32;

let frame_count = 0;
let frame_count_by_second = 0;
let frame_rate = 0;
let millisecond = Date.now();
let toDraw = [];

const level = {
    width: 16,
    height: 10,
    data: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    tiles: [],
};

// Convert the data into tiles.
for (let y = 0; y < level.height; y++) {
    level.tiles[y] = [];
    for (let x = 0; x < level.width; x++) {
        level.tiles[y][x] = new Tile({
            x, y,
            blocking: level.data[y][x] === 1,
        });
    }
}

let ctx;
let mainCamera;
let drawContext = false;

const game = new Game();

const character = new Character({
    x: TILE_SIZE * 7,
    y: TILE_SIZE * 4,
    size: TILE_SIZE,
});

const controller = new Controller();

const camera = new Camera({
    follow: character,
});

document.addEventListener('DOMContentLoaded', () => {
    camera.attachToDOM();
});
