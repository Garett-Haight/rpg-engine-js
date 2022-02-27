import Rectangle from '../../primitives/Rectangle'
import MapLayer from './MapLayer';

export default class CollisionLayer extends MapLayer {
    collisions: any;
    constructor(layer, map) {
        super(layer, map);
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