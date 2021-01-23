
class Sprite {
    static _sprites = [];
    static get(index) {
        return Sprite._sprites[index];
    }

    constructor(args) {
        this.source = args.source;
        this.width = args.size || args.width || TILE_SIZE;
        this.height = args.size || args.height || TILE_SIZE;
        this.marginX = args.marginX || 0;
        this.marginY = args.marginY || 0;

        Sprite._sprites.push(this);
    }

    draw(dx=0, dy=0) {
        ctx.drawImage(
            this.source,
            this.marginX, this.marginY,
            this.width, this.height,
            dx, dy,
            this.width, this.height
        );
    }
}
