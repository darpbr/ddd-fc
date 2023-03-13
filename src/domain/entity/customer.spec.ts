import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("","John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1","");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123","John");
        customer.changeName("Jane")

        expect(customer.getName()).toBe("Jane");
    });

    it("should activate customer", () => {

        const customer = new Customer("1","customer 1");
        const address = new Address("street 1",123,"13330-250","Sao Paulo");
        customer.setAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(()=> {
            const customer = new Customer("1","customer 1");
            customer.activate();    
        }).toThrowError("Address is mandatory to activate a customer.");
    });

    it("should deactivate customer", () => {

        const customer = new Customer("1","customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () =>{
        const customer = new Customer("1","customer 1");
        expect(customer.getRewardPoints()).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.getRewardPoints()).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.getRewardPoints()).toBe(20);

    });

});