
import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangedAddressEvent>{

    handle(event: CustomerChangedAddressEvent): void {
        console.log(`O endereço do cliente: ` + event.id + `, `+ event.name + ` alterado para: ` 
        + event.address);
    }
}