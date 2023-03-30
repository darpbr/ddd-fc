import CustomerCreatedEvent from "../../customer/event/customer/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/customer/handler/envia-console-log-1-handler.handler";
import EnviaConsoleLog2Handler from "../../customer/event/customer/handler/envia-console-log-2-handler.handler";
import EnviaConsoleLogHandler from "../../customer/event/customer/handler/envia-console-log-handler.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
   
    it("should register an event handler",() => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const eventHandler3 = new EnviaConsoleLogHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);
        eventDispatcher.register("CustomerChangedAddressEvent",eventHandler3);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
        .toMatchObject(eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler3);

    });

    it("Should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const eventHandler3 = new EnviaConsoleLogHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
        .toMatchObject(eventHandler2);

        eventDispatcher.register("CustomerChangedAddressEvent",eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler3);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler3);


        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(0);
    });

    it("Should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const eventHandler3 = new EnviaConsoleLogHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
        .toMatchObject(eventHandler2);

        eventDispatcher.register("CustomerChangedAddressEvent",eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler3);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeUndefined();
    });

    it("Should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
        .toMatchObject(eventHandler2);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            description: "Customer 1 description",
            address: "Address Customer 1",
        });

        // Quando o notify for executado o SencEmailWhenProductIsCreatedEvent.handler() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

});
