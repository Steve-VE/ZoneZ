
class Entity {
    static _allEntities = [];
    static _entitiesToDraw = [];
    static all() {
        return Entity._allEntities;
    }
    static toDraw(entity=false) {
        if (entity) {
            Entity._entitiesToDraw.push(entity);
            return true;
        }
        const entitiesToDraw = this._entitiesToDraw;
        this._entitiesToDraw = [];
        return entitiesToDraw;
    }

    constructor(args) {
        Entity._allEntities.push(this);
        this.x = args.x || 0;
        this.y = args.y || 0;
        this.z = args.z || 0;
        this.width = args.width || args.size || 0;
        this.height = args.height || args.size || 0;
    }

    // Update and drawing cycle, called in the following order.
    beforeUpdate() {}
    update() {}
    draw() {}
    afterUpdate() {}
    // Special drawing method to draw something on the top of the sprites.
    drawOnHUD() {}

    /**
     * Checks if the mouse is on the entity.
     *
     * @param {Mouse} mouse
     * @returns {boolean}
     */
    mouseOn(mouse) {
        return mouse.x >= this.left && mouse.x <= this.right &&
            mouse.y >= this.top && mouse.y <= this.bottom;
    }
    onClick() {}

    // Getters
    get x() { return this._x - (drawContext && mainCamera.paddingX); }
    get y() { return this._y - (drawContext && mainCamera.paddingY); }
    get z() { return this._y + this._z; }

    get bottom() { return this.y + (this.height / 2); }
    get left() { return this.x - (this.width / 2); }
    get right() { return this.x + (this.width / 2); }
    get top() { return this.y - (this.height / 2); }
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
