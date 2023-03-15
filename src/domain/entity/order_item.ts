export default class OrderItem{

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    private _total: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this._total = this.total();
        this.validate();
    }

    getId(): string {
        return this._id;
    }

    getName(): string{
        return this._name;
    }

    getQuantity(): number {
        return this._quantity;
    }

    getPrice(): number{
        return this._price * this._quantity;
    }

    getProductId(): string{
        return this._productId;
    }

    total(): number{
        return this._price * this._quantity;
    }

    validate(): boolean {
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
        if(this._name.length === 0){
            throw new Error("Name is required");
        }
        if(this._productId.length === 0){
            throw new Error("ProductId is required");
        }
        if(this._price <= 0){
            throw new Error("Price must be greater than 0");
        }
        if(this._quantity <= 0){
            throw new Error("Quantity must be greater than 0");
        }
        return true;
    }
}