
class Camera{
    constructor(args) {
        this.x = args.x || 0;
        this.y = args.y|| 0;
        this.marginX = args.marginX || args.margin || CANVAS_WIDTH * 0.15;
        this.marginY = args.marginY || args.margin || CANVAS_HEIGHT * 0.15;

        if (args.follow) {
            this.bindTo(args.follow);
        }
    }

    attachToDOM() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = "mainCanvas";
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        document.body.appendChild(this.canvas);
        this.setAsMainCamera();
    }

    /**
     * Say to the Camera to follow this entity.
     *
     * @param {Entity} entity
     */
    bindTo(entity) {
        this.target = entity;
        this.x = this.target.x;
        this.y = this.target.y;
    }

    draw () {}

    drawOnHUD () {
        stroke(255, 0, 0, 0.1);
        fill('transparent');
        rect(
            this.x - this.marginX,
            this.y - this.marginY,
            this.marginX * 2,
            this.marginY * 2
        );
    }

    setAsMainCamera() {
        mainCamera = this;
        ctx = this.canvas.getContext('2d');
    }

    update() {
        let moveX = 0;
        let moveY = 0;

        if (this.target) {
            const distX = Math.abs(this.x - this.target.x);
            const distY = Math.abs(this.y - this.target.y);

            if (distX > this.marginX) {
                const direction = (this.target.x < this.x && -1) || 1;
                moveX = 0.15 * (distX - this.marginX) * direction;
            }
            if (distY > this.marginY) {
                const direction = (this.target.y < this.y && -1) || 1;
                moveY = 0.15 * (distY - this.marginY) * direction;
            }
        }

        this.x += moveX;
        this.y += moveY;
    }

    // Getters
    get x() { return this._x - (drawContext && this.paddingX); }
    get y() { return this._y - (drawContext && this.paddingY); }
    get paddingX() { return Math.round(this._x - (this.canvas.width / 2)); }
    get paddingY() { return Math.round(this._y - (this.canvas.height / 2)); }

    // Setters
    set x(px) { this._x = px; }
    set y(py) { this._y = py; }
}
