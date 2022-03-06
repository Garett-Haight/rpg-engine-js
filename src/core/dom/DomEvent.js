export default class DomEvent {
    constructor(event, element, handler) {
        this.eventHandler = element.addEventListener(event, handler);
    }
}