
// Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const FRAMERATE = 30;
// const FRAMERATE = 60;
const TILE_SIZE = 16;

let frame_count = 0;
let frame_count_by_second = 0;
let frame_rate = 0;
let millisecond = Date.now();
let toDraw = [];

let ctx;
let mainCamera;
let tileset;
let drawContext = false;
let room;
let game;

const character = new Character({
    x: TILE_SIZE * 7,
    y: TILE_SIZE * 10,
    size: TILE_SIZE,
});

const controller = new Controller();

document.addEventListener('DOMContentLoaded', () => {
    // TODO: need to do a better loading ressource and game launch process.
    // Load sprites.
    tileset = new Image();
    tileset.onload = function () {
        const numberOfTileX = Math.floor(tileset.width / TILE_SIZE);
        for (let i = 0; i < 21; i++) {
            const y = Math.floor(i / numberOfTileX) * TILE_SIZE;
            const x = ((i % numberOfTileX) * TILE_SIZE);
            new Sprite({
                source: tileset,
                marginX: x,
                marginY: y,
            });
        }
        // Launch the game.
        game = new Game();
        room = new Room({});
        const camera = new Camera({
            follow: character,
        });
        camera.attachToDOM();
    };
    tileset.src = 'src/img/tileset.png';
});
