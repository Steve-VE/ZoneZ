
class Controller {
    constructor() {
        this.actions = {};
        this.keybinding = {
            down: 's',
            up: 'z',
            left: 'q',
            right: 'd',
            dev: 'tab',
            editor: 'f2',
        };
        this.specialActions = {
            dev: this.switchDev.bind(this),
            editor: this.switchEditorMode.bind(this),
        };

        this.mouse = new Mouse();

        this.keyactions = {};
        this._keys = [];
        for (const keybinding of Object.entries(this.keybinding)){
            this.actions[keybinding[0]] = false;
            this.keyactions[keybinding[1]] = keybinding[0];
            this._keys.push(keybinding[1]);
        }

        window.addEventListener('keydown', (ev) => {
            const key = ev.key.toLowerCase();
            game.devMode && console.log(`-- press ${key}`);
            if (this._keys.includes(key)) {
                ev.preventDefault();
                const action = this.keyactions[key];
                if (!this.actions[action]) {
                    this.actions[action] = true;
                }
            }
        });

        window.addEventListener('keyup', (ev) => {
            const key = ev.key.toLowerCase();
            game.devMode && console.log(`-- release ${key}`);
            if (this._keys.includes(key)) {
                ev.preventDefault();
                const action = this.keyactions[key];
                if (this.actions[action]) {
                    this.actions[action] = false;
                }
                if (this.specialActions[action]) {
                    this.specialActions[action]();
                }
            }
        });
    }

    bindMouseEvent(camera) {
        this.mouse.bindToCamera(camera);
    }

    switchDev() {
        game.devMode = !game.devMode;
    }

    switchEditorMode() {
        game.openEditor();
    }
}


class Mouse {
    constructor(args={}) {
        this.x = args.x || 0;
        this.y = args.y || 0;
        this.tileX = 0;
        this.tileY = 0;
        document.addEventListener('mousemove', this.onMove.bind(this));
        document.addEventListener('click', this.onClick.bind(this));
        document.addEventListener('mousedown', () => this.pressed = true );
        document.addEventListener('mouseup', () => this.pressed = false );
    }

    /**
     * Enables the mouse to interact with the camera's canvas.
     *
     * @param {Camera} camera
     */
    bindToCamera(camera) {
        camera.canvas.addEventListener('mousemove', (ev) => {
            this.x = (this.absoluteX / camera.zoom) + camera.paddingX;
            this.y = (this.absoluteY / camera.zoom) + camera.paddingY;
            this.tileX = Math.floor(this.x / TILE_SIZE);
            this.tileY = Math.floor(this.y / TILE_SIZE);
            if (currentRoom &&
                this.tileX < currentRoom.width && this.tileX >= 0 &&
                this.tileY < currentRoom.height && this.tileY >= 0) {
                const tile = Tile.get(this.tileX, this.tileY);
                if (tile) {
                    tile.select();
                }
            }
        });
    }

    onMove(ev) {
        this.absoluteX = ev.offsetX;
        this.absoluteY = ev.offsetY;
    }

    onClick(ev) {
        game.onClick(this);
    }
}
