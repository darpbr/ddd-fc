import EventInterface from "../@shared/event.interface";
import Address from "../../entity/address"

export default class CustomerChangedAddressEvent implements EventInterface{
    dataTimeOcurred: Date;
    eventData: any;
    _id: string;
    _name: string;
    _address: Address;

    constructor(id: string, name: string, address: Address){
        this.dataTimeOcurred = new Date();
        this._id = id;
        this._name = name;
        this._address = address;
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
}
