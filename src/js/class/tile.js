
class Tile extends Entity {
    constructor(args) {
        super(args);
        this.blocking = args.blocking;
    }

    draw() {
        if (this.blocking) {
            noStroke();
            // Wall
            fill('gray');
            rect(this.x, this.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2);
            // Roof
            fill(0);
            rect(this.x, this.y - TILE_SIZE * 2, TILE_SIZE);
        } else {
            stroke(180);
            fill(200);
            rect(this.x, this.y, TILE_SIZE);
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