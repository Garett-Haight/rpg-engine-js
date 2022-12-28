export default class Transition {
    animation:string;
    duration:number;
    frame: number;
    fn: any;
    localCoordinates: { x:number, y:number };
    private _x: number = 0;
    private _y: number = 0;
    constructor(fn) {
        this.fn = fn.bind(this);
        this.frame = 0;
    }

    execute(duration: number) {

    }
}

const linear = new Transition(function(args) {
    for (let i = 0; i <= 1; i += 0.1) {
        this.frame++;
        this._x = i;
        this._y = i;

    }
});

const square = new Transition(function(args) {
    for (let i = 0; i <= 1; i += 0.1) {
        this.frame++;
        this._x = i;
        this._y = i * i;
    }
});

const sine = new Transition(function(args) {
    let counter = 0;
    for (let i = 0; i <= 1; i += 0.1) {
        this.frame++;
        this._x = i;
        this._y = Math.sin(i * (2 * Math.PI));
    }
});

