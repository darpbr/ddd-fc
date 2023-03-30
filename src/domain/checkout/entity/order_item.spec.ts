import OrderItem from "./order_item";

describe("Order_Item unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(()=> {
            let order = new OrderItem("", "oi1", 100,"p1",1);
        }).toThrowError("Id is required");
    });

    it("should throw error when Name is empty", () => {
        expect(()=> {
            let order = new OrderItem("123", "", 100,"p1",1);
        }).toThrowError("Name is required");
    });

    it("should throw error when Price is less than zero", () => {
        expect(()=> {
            let order = new OrderItem("123", "oi1", -100,"p1",1);
        }).toThrowError("Price must be greater than 0");
    });

    it("should throw error when productId is empty", () => {
        expect(()=> {
            let order = new OrderItem("123", "oi1", 100,"",1);
        }).toThrowError("ProductId is required");
    });

    it("should throw error when Item qtd is less than zero", () => {
        expect(()=> {
            let order = new OrderItem("123", "oi1", 100,"p1",-1);
        }).toThrowError("Quantity must be greater than 0");
    });

});