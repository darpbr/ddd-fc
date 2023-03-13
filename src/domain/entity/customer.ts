import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this._active = false;
        this.validate();
    }

    getId(): string{
        return this._id;
    }

    getName(): string{
        return this._name;
    }

    getAddress(): Address{
        return this._address;
    }

    getRewardPoints(): number{
        return this._rewardPoints;
    }

    isActive(): boolean{
        return this._active;
    }
    validate(){
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
        if(this._name.length === 0){
            throw new Error("Name is required");
        }
    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer.");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    setAddress(address: Address){
        this._address = address;
    }

    changeAddress(address: Address){
        this._address = address;
    }
   
    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

}