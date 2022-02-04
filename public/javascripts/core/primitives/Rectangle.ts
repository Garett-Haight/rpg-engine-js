export default class Rectangle {
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    renderable: boolean;
    constructor(x:number, y:number, width:number, height:number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.renderable = false;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    setX(x: number) {
        this._x = x;
    }

    setY(y: number) {
        this._y = y;
    }

    setWidth(width: number) {
        this._width = width;
    }

    setHeight(height: number) {
        this._height = height;
    }

    getCenterX() {
        return this._x + this._width / 2;
    }

    getCenterY() {
        return this._y + this._height / 2;
    }

    getLeft() {
        return this._x;
    }

    getRight() {
        return this._x + this._width;
    }

    getTop() {
        return this._y;
    }

    getBottom() {
        return this._y + this._height;
    }

    collidesWith(other:Rectangle) {
        return (
            this.getRight() > other.getLeft() &&
            this.getLeft() < other.getRight() &&
            this.getTop() < other.getBottom() &&
            this.getBottom() > other.getTop()
        );
    }

    isValidRectangle() {
        return (this._x >=0 && this._y >= 0 && this._width >= 0 && this._height >=0);
    }

    render(ctx: { fillstyle: string; strokeRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void; }) {
        ctx.fillstyle = "yellow";
        ctx.strokeRect(this._x, this._y, this._width, this._height);
    }
}