
class Game {
    constructor() {
        this.frame_count = 0;
        this.frame_count_by_second = 0;
        this.frame_rate = 0;
        this.milliseconds = Date.now();

        setInterval(this.loop.bind(this), 1000 / FRAMERATE);
    }

    loop() {
        this.frame_count++;
        this.frame_count_by_second++;

        // this.beforeUpdate();
        this.update();
        this.draw();
        this.afterUpdate();

        if (Date.now() >= this.milliseconds + 1000) {
            this.milliseconds = Date.now();
            this.frame_rate = this.frame_count_by_second;
            // console.log(`-- ${parseInt(this.milliseconds / 1000)} s: ${this.frame_rate} fps`);
            // console.log(`-- ${this.frame_rate} fps`);
            this.frame_count_by_second = 0;
        }
    }

    update() {
        for (const entity of Entity.all()) {
            entity.update();
        }
    }

    afterUpdate() {
        if (mainCamera) {
            mainCamera.update();
        }
    }

    draw() {
        drawContext = true;

        // Draw background
        fill('black');
        noStroke();
        rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw sprites
        const entitiesToDraw = Entity.toDraw();
        if (entitiesToDraw.length) {
            // Sort the entities by their `z` property to make the drawing order right.
            entitiesToDraw.sort((e1, e2) => e1.z < e2.z ? 1 : -1);
            while(entitiesToDraw.length) {
                const sprite = entitiesToDraw.pop();
                sprite.draw();
            }
        }
        drawContext = false;
    }
}
