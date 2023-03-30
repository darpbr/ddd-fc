import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface{

    private eventHandlers: { [ eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void{
        const eventName = event.constructor.name;
        if(this.eventHandlers[eventName]){
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface):void {
        // Se o evento não existir criamos um novo evento com lista vazia
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }
    
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        // Se o evento existir efetuar um splice
        if(this.eventHandlers[eventName]){
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1){
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }
}