import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerChangedAddressEvent from "../event/customer/customer-changed-address.event";
import EnviaConsoleLogHandler from "../event/customer/handler/envia-console-log-handler.handler";
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

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get address(): Address{
        return this._address;
    }

    get rewardPoints(): number{
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

    changeAddress(address: Address){
        this._address = address;
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        eventDispatcher.register("CustomerChangedAddressEvent",eventHandler);
        const customerChangedAddressEvent = new CustomerChangedAddressEvent(
            this._id,
            this._name,
            address,
        );
        eventDispatcher.notify(customerChangedAddressEvent);
        
        eventDispatcher.unregisterAll();
    }
   
    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

}