
class Game {
    constructor() {
        this.mode = 'editor';
        this.frame_count = 0;
        this.frame_count_by_second = 0;
        this.frame_rate = 0;
        this.milliseconds = Date.now();
        this.setup();
    }

    setup () {
        this._loadRessources().then(() => {
            room = new Room({});
            const camera = new Camera({
                follow: character,
            });
            camera.attachToDOM();
            setInterval(this.loop.bind(this), 1000 / FRAMERATE);
        });
    }

    createTileSelector() {
        const tileZoom = 2;
        this.tileSelector = document.createElement('div');
        this.tileSelector.className = 'tile-selector';
        let index = 0;
        for (const sprite of Sprite.all()) {
            const tileImage = document.createElement('div');
            tileImage.className = `tile tn-${index++}`;
            // tileImage.src = sprite.source.src;
            tileImage.style.backgroundImage = `url(${sprite.source.src})`;
            tileImage.style.backgroundSize = `${sprite.source.width * tileZoom}px`;
            tileImage.style.backgroundPosition= `-${sprite.marginX * tileZoom}px -${sprite.marginY * tileZoom}px`;
            tileImage.style.width = `${sprite.width * tileZoom}px`;
            tileImage.style.height = `${sprite.height * tileZoom}px`;
            tileImage.addEventListener('click', (ev) => {
                const previousSelectedTile = document.querySelector('.tile.selected');
                if (previousSelectedTile) {
                    previousSelectedTile.classList.remove('selected');
                }
                ev.target.classList.add('selected');
            })
            this.tileSelector.appendChild(tileImage);
        }
        document.body.appendChild(this.tileSelector);
    }

    /**
     * @private
     * @returns {Promise}
     */
    _loadRessources () {
        return new Promise((resolve, reject) => {
            const tileset = new Image();
            tileset.onload = () => {
                const numberOfTileX = Math.floor(tileset.width / TILE_SIZE);
                for (let i = 0; i < 22; i++) {
                    const y = Math.floor(i / numberOfTileX) * TILE_SIZE;
                    const x = ((i % numberOfTileX) * TILE_SIZE);
                    new Sprite({
                        source: tileset,
                        marginX: x,
                        marginY: y,
                    });
                }
                this.createTileSelector();
                resolve();
            };
            tileset.src = 'src/img/tileset.png';
        });
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
