
class Tile extends Entity {
    static _tiles = [];
    static _idCount = 0;
    static _selected;
    static get(px, py) {
        for (const tile of Tile._tiles) {
            if (tile._x === px && tile._y === py) {
                return tile;
            }
        }
        return false;
    }
    static getSelected() {
        return Tile._selected;
    }

    constructor(args) {
        super(args);
        this.width = this.width || TILE_SIZE;
        this.height = this.height || TILE_SIZE;
        Tile._tiles.push(this);
        // Will define the properties `blocking`, `spriteIndex` and `z`.
        this.changeSpriteIndex( args.spriteIndex || 0);
        this.selected = false;
        this.id = Tile._idCount++;
    }

    changeSpriteIndex(index) {
        this.spriteIndex = index;
        this.z = tileData.basic_tiles[this.spriteIndex][0];
        this.blocking = tileData.basic_tiles[this.spriteIndex][1];
    }

    draw() {
        Sprite.get(this.spriteIndex).draw(this.x, this.y);
    }

    drawOnHUD() {
        if (game.mode != 'editor' || !game.devMode) {
            return;
        }
        if (this.blocking) {
            noFill();
            stroke(255, 0, 0);
            rect(this.x, this.y, this.width, this.height);
        }
        if (this.selected) {
            noFill();
            stroke(255);
            rect(this.x, this.y, this.width, this.height);
        }
    }

    mouseOn(mouse) {
        return mouse.x >= this.x && mouse.x <= this.x + this.width &&
            mouse.y >= this.y && mouse.y <= this.y + this.height;
    }

    onClick() {
        if (game.selectedSpriteIndex !== undefined) {
            this.changeSpriteIndex(game.selectedSpriteIndex);
        } else {
            console.log(this.z);
        }
    }

    select() {
        const previousSelected = Tile.getSelected();
        if (previousSelected) {
            previousSelected.selected = false;
        }
        this.selected = true;
        Tile._selected = this;
    }

    update() {
        Entity.toDraw(this);
    }

    // Getters
    get x() {
        return (this._x * TILE_SIZE) - (drawContext && mainCamera.paddingX);
    }
    get y() {
        if (drawContext){
            return (this._y * TILE_SIZE) - mainCamera.paddingY;
        }
        return this._y * TILE_SIZE;
    }
    get z() { return (this._y * TILE_SIZE) + this._z; }

    set x(px) { this._x = px; }
    set y(py) { this._y = py; }
    set z(pz) { this._z = pz; }
}