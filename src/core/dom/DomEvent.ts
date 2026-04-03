export default class DomEvent {
    constructor(
        event: string,
        element: EventTarget,
        handler: EventListenerOrEventListenerObject
    ) {
        element.addEventListener(event, handler);
    }
}
