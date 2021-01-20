
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

const character = new Character({
    x: TILE_SIZE * 7,
    y: TILE_SIZE * 4,
});

const controller = new Controller();

const camera = new Camera({
    follow: character,
});

document.addEventListener('DOMContentLoaded', () => {
    camera.attachToDOM();
    setInterval(gameLoop, 1000 / FRAMERATE);
});


const gameLoop = function () {
    frame_count++;
    frame_count_by_second++;
    // Updates:
    for (let y = 0; y < level.height; y++){
        for (let x = 0; x < level.width; x++){
            level.tiles[y][x].update();
        }
    }
    character.update();
    camera.update();

    // Draws:
    drawContext = true;
    // Draw background
    fill('black');
    noStroke();
    rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Draw sprites
    if (toDraw.length) {
        toDraw.sort((e1, e2) => e1.z < e2.z ? 1 : -1);
        while(toDraw.length) {
            const sprite = toDraw.pop();
            sprite.draw();
        }
    }
    // // Draw tiles
    // for (let y = 0; y < level.height; y++){
    //     for (let x = 0; x < level.width; x++){
    //         level.tiles[y][x].draw();
    //     }
    // }
    // Draw entities
    character.drawOnHUD();
    camera.drawOnHUD();
    drawContext = false;

    if(Date.now() >= millisecond + 1000) {
        millisecond = Date.now();
        frame_rate = frame_count_by_second;
        // console.log(`-- ${parseInt(millisecond / 1000)} s: ${frame_rate} fps`);
        // console.log(`-- ${frame_rate} fps`);
        frame_count_by_second = 0;
    }
};
