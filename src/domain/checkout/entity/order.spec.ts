import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(()=> {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(()=> {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when Item qtd is empty", () => {
        expect(()=> {
            let order = new Order("1", "123", []);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1","Item 1",100, "p1",2);
        const item2 = new OrderItem("i2","Item 2",200,"p2",2);        
        
        const order = new Order("o1","c1",[item]);
        const order2 = new Order("o2","c2",[item, item2]);
        
        const total = order.total();
        const total2 = order2.total();

        expect(total).toBe(200);
        expect(total2).toBe(600);
    });

    it("should Throw error if item qtd is less or equal than zero", () => {
               
        expect(()=> {
            const item = new OrderItem("i1","Item 1",100, "p1",0);
            const order = new Order("o1","c1",[item]);
        }).toThrowError("Quantity must be greater than 0");
       
    });

});