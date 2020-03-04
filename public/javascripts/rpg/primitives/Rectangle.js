export default class Rectangle {
    constructor(args) {
        var w, h, x1, y1, x2, y2, renderable;
        ({w, h, x1, y1, x2, y2, renderable} = args);
        console.log(w);
        console.log(h);
        console.log(x1);
        console.log(y1);
        console.log(x2);
        console.log(renderable);
        this.width = w;
        this.height = h;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    render(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x1, this.y1, this.width, this.height);
    }
}