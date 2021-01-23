
class Tile extends Entity {
    constructor(args) {
        super(args);
        this.blocking = args.blocking;
        this.spriteIndex = args.spriteIndex || 0;
    }

    draw() {
        if (this.blocking) {
            Sprite.get(12).draw(this.x, this.y);
        } else {
            Sprite.get(this.spriteIndex - 1).draw(this.x, this.y);
        }
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
    get z() {
        if (this.blocking) {
            return (this._y + 1) * TILE_SIZE;
        }
        return 0;
    }

    // Setters
    set x(px) { this._x = px; }
    set y(py) { this._y = py; }
    set z(pz) { this._z = pz; }
}