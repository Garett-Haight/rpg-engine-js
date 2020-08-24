import ObjectLayer from './ObjectLayer'
import Rectangle from '../../primitives/Rectangle'

export default class CollisionLayer extends ObjectLayer {
    constructor(layer) {
        super(layer);
        this.collisions = layer.objects.map((rect) => {
            return new Rectangle(rect.x, rect.y, rect.width, rect.height);
        });
        return this.collisions;
    }

    checkCollision(rectangle) {
        return this.collisions.find(col => col.collidesWith(rectangle));
    }

    render(ctx, time) {

    }
}