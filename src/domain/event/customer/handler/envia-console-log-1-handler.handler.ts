import EventHandlerInterface from "../../@shared/event-handler.interface";
import CostumerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface{

    handle(event: CostumerCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}