
class Controller {
    constructor() {
        this.left = false;
        this.right = false;
        this.down = false;
        this.up = false;

        this.actions = {
            down: false,
            up: false,
            left: false,
            right: false,
        };
        this.keybinding = {
            down: 's',
            up: 'z',
            left: 'q',
            right: 'd',
        };

        this.keyactions = {};
        this._keys = [];
        for (const keybinding of Object.entries(this.keybinding)){
            this.keyactions[keybinding[1]] = keybinding[0];
            this._keys.push(keybinding[1]);
        }

        window.addEventListener('keydown', (ev) => {
            const key = ev.key;
            if (this._keys.includes(key)) {
                const action = this.keyactions[key];
                if (!this.actions[action]) {
                    // console.log(`-- press ${key}`);
                    this.actions[action] = true;
                }
            }
        });

        window.addEventListener('keyup', (ev) => {
            const key = ev.key;
            if (this._keys.includes(key)) {
                const action = this.keyactions[key];
                if (this.actions[action]) {
                    // console.log(`-- release ${key}`);
                    this.actions[action] = false;
                }
            }
        });
    }
}
