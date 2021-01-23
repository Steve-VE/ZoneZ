
class Character extends Entity{
    constructor(args) {
        super(args);
        this.z = 7;
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
        fontSize(TILE_SIZE);
        // text('🕺', ...this.pos);
        text('🙍‍♂️', ...this.pos);
        fontSize(TILE_SIZE / 2);
        text('🔫', this.left, this.y);
        // text('🧟‍♀️', ...this.pos);
    }

    drawOnHUD() {
        //*
        noFill();
        stroke('gray');
        ctx.lineWidth = 0.5;
        rect(...this.cornerTopLeft, this.width, this.height);
        fill(0, 0, 0, 0.2);
        stroke('red');
        circle(...this.pos, this.width / 2, this.height / 2);
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

        Entity.toDraw(this);
    }
}
