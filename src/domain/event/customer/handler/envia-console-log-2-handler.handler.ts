import EventHandlerInterface from "../../@shared/event-handler.interface";
import CostumerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface{

    handle(event: CostumerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}