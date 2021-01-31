
class Character extends Entity{
    constructor(args) {
        super(args);
        this.z = 7;
        this.acceleration = args.acceleration || 0.5;
        this.speed = args.speed || 0;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = args.maxSpeed || 4;

        this.char = '🙍‍♂️'; // Todo: temp for test, to delete.
    }

    canMoveHorizontally() {
        const edge = this.speedX > 0 ? this.right : this.left;
        let tx = Math.floor((edge + this.speedX) / TILE_SIZE);
        if (tx < 0  || tx >= room.width) {
            return false;
        }
        let ty = Math.floor(this.y / TILE_SIZE);
        const tile = room.tiles[ty][tx];

        if (tile.blocking) {
            this.speedX = 0;
            if (this.speedX > 0) {
                this.x += tile.x - this.right;
            } else if (this.speedX < 0) {
                this.x += (tile.x + TILE_SIZE) - this.left;
            }
            return false;
        }
        return true;
    }

    canMoveVertically() {
        const edge = this.speedY > 0 ? this.bottom : this.top;
        let ty = Math.floor((edge + this.speedY) / TILE_SIZE);
        if (ty < 0  || ty >= room.height) {
            return false;
        }
        let tx = Math.floor(this.x / TILE_SIZE);
        const tile = room.tiles[ty][tx];

        if (tile.blocking) {
            this.speedY = 0;
            if (this.speedY > 0) {
                this.y += tile.y - this.bottom;
            } else if (this.speedY < 0) {
                this.y += (tile.y + TILE_SIZE) - this.top;
            }
            return false;
        }
        return true;
    }

    draw() {
        fontSize(TILE_SIZE);
        text(this.char, ...this.pos);
        fontSize(TILE_SIZE / 2);
        text('🔫', this.left, this.y);
    }

    drawOnHUD() {
        if (!game.devMode) {
            return;
        }
        noFill();
        stroke('gray');
        lineWidth(0.5);
        rect(...this.cornerTopLeft, this.width, this.height);
        fill(0, 0, 0, 0.5);
        stroke('red');
        circle(...this.pos, this.width / 2, this.height / 2);
        fill('red');
        point(...this.pos);
        point(...this.cornerBottomLeft);
        point(...this.cornerBottomRight);
        point(...this.cornerTopLeft);
        point(...this.cornerTopRight);
    }

    onClick() {
        const chars = ['🧟‍♀️', '🙍‍♂️', '👮‍♀️', '👮‍♂️', '🕵️‍♀️', '🕵️‍♂️', '👩‍💼', '👨‍💼'];
        const charIndex = Math.floor(Math.random() * chars.length);
        this.char = chars[charIndex];
    }

    update() {
        const x_dir = controller.actions.right - controller.actions.left;
        const y_dir = controller.actions.down - controller.actions.up;
        if (controller.actions.right || controller.actions.left ||
            controller.actions.up || controller.actions.down) {
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
