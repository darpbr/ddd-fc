import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface{

    handle(event: CustomerChangedAddressEvent): void {
        console.log(`O endereço do cliente: ` + event.id + `, `+ event.name + ` alterado para: ` 
        + event.address);
    }
}