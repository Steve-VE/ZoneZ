
class Character {
    constructor(args) {
        this.x = args.x || 0;
        this.y = args.y || 0;
        this.z = 7;

        this.size = args.size || TILE_SIZE;

        this.acceleration = args.acceleration || 0.5;
        this.speed = args.speed || 0;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = args.maxSpeed || 4;
    }

    canMoveHorizontally() {
        let tx;
        let ty = Math.floor(this.y / TILE_SIZE);
        if (this.speedX > 0) {
            tx = Math.floor((this.right + this.speedX) / TILE_SIZE);
            const tile = level.tiles[ty][tx];

            if (tile.blocking) {
                this.speedX = 0;
                this.x += tile.x - this.right;
                return false;
            } else {
                return true;
            }
        } else if (this.speedX < 0) {
            tx = Math.floor((this.left + this.speedX) / TILE_SIZE);
            const tile = level.tiles[ty][tx];

            if (tile.blocking) {
                this.speedX = 0;
                this.x += (tile.x + TILE_SIZE) - this.left;
                return false;
            } else {
                return true;
            }
        }
    }

    canMoveVertically() {
        let tx = Math.floor(this.x / TILE_SIZE);
        let ty;
        if (this.speedY > 0) {
            ty = Math.floor((this.bottom + this.speedY) / TILE_SIZE);
            const tile = level.tiles[ty][tx];

            if (tile.blocking) {
                this.speedY = 0;
                this.y += tile.y - this.bottom;
                return false;
            } else {
                return true;
            }
        } else if (this.speedY < 0) {
            ty = Math.floor((this.top + this.speedY) / TILE_SIZE);
            const tile = level.tiles[ty][tx];

            if (tile.blocking) {
                this.speedY = 0;
                this.y += (tile.y + TILE_SIZE) - this.top;
                return false;
            } else {
                return true;
            }
        }
    }

    draw() {
        fontSize(32);
        // text('🕺', ...this.pos);
        text('🙍‍♂️', ...this.pos);
        fontSize(16);
        text('🔫', this.left, this.y);
        // text('🧟‍♀️', ...this.pos);
    }

    drawOnHUD() {
        //*
        noFill();
        stroke('gray');
        ctx.lineWidth = 0.5;
        rect(...this.cornerTopLeft, this.size);
        fill(0, 0, 0, 0.2);
        stroke('red');
        circle(...this.pos, this.size / 2);
        fill('red');
        point(...this.pos);
        point(...this.cornerBottomLeft);
        point(...this.cornerBottomRight);
        point(...this.cornerTopLeft);
        point(...this.cornerTopRight);
        //*/
    }

    update() {
        const x_dir = controller.actions.right - controller.actions.left;
        const y_dir = controller.actions.down - controller.actions.up;
        if (controller.actions.right || controller.actions.left || controller.actions.up || controller.actions.down) {

            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        } else {
            this.speed = Math.max(this.speed - (this.acceleration * 1.5), 0);
        }

        this.speedX = x_dir * this.speed;
        this.speedY = y_dir * this.speed;

        if (this.speedX != 0 && this.canMoveHorizontally()) {
            this.x += this.speedX;
        }
        if (this.speedY != 0 && this.canMoveVertically()) {
            this.y += this.speedY;
        }

        toDraw.push(this);
    }

    // Getters
    get x() { return this._x - (drawContext && mainCamera.paddingX); }
    get y() { return this._y - (drawContext && mainCamera.paddingY); }
    get z() { return this._y + this._z; }
    get bottom() { return this.y + (this.size / 2); }
    get left() { return this.x - (this.size / 2); }
    get right() { return this.x + (this.size / 2); }
    get top() { return this.y - (this.size / 2); }
    get pos() { return [this.x, this.y]; }
    get cornerBottomLeft() { return [this.left, this.bottom]; }
    get cornerBottomRight() { return [this.right, this.bottom]; }
    get cornerTopLeft() { return [this.left, this.top]; }
    get cornerTopRight() { return [this.right, this.top]; }

    // Setters
    set x(px) { this._x = px; }
    set y(py) { this._y = py; }
    set z(pz) { this._z = pz; }
}
