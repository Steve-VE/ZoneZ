
const _tileSets = [];
// Helper for the z-indexes:
__FLOOR__ = 16;
__WALL__ = 32;
__CEIL__ = 48;
// For each tileset image, it must have an object like the followings.
// When set, it must be pushed into the `_tileSets` array to be loaded when the game will start.
const testTileset = {
    name: 'Basic Tiles',
    dname: 'basic_tiles',
    source: 'src/img/tileset.png',
    startAt: 0,
    endAt: 48,
};
const tileData = {
    basic_tiles: [  // Z-index (Number), isBlocking (boolean)
        [0, false],
        [0, false],
        [0, false],
        [__CEIL__, false],
        [__CEIL__, false],
        [__CEIL__, false],
        [__CEIL__, true],
        [__CEIL__, true],
        [__WALL__, true],
        [__WALL__, true],
        [__WALL__, true],
        [__CEIL__, true],
        [__CEIL__, true],
        [__CEIL__, true],
        [__CEIL__, true],
        [__CEIL__, true],
        [__FLOOR__, true],
        [__FLOOR__, true],
        [__FLOOR__, true],
        [__CEIL__, false],
        [__CEIL__, false],
        [__CEIL__, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [__FLOOR__, true],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [__WALL__, true],
        [__WALL__, true],
        [__WALL__, true],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [0, false],
        [__FLOOR__, true],
        [__FLOOR__, true],
        [__FLOOR__, true],
    ],
};
_tileSets.push(testTileset);
