import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardpoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            city: address.city,
            zipcode: address.zip,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            street: customer.address.street,
            city: customer.address.city,
            number: customer.address.number,
            zipcode: customer.address.zip,
            rewardpoints: customer.rewardPoints, 
        });

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel2.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            street: customer.address.street,
            city: customer.address.city,
            number: customer.address.number,
            zipcode: customer.address.zip,
            rewardpoints: customer.rewardPoints, 
        });

    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);
        
        expect(customer).toStrictEqual(customerResult);
    });

    it("should find all products", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardPoints(10);

        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Street 2", 2, "zipcode","City");
        customer2.changeAddress(address2);
        customer2.activate();
        customer2.addRewardPoints(20);

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);

    });

    it("should throw an error when customer is not found",async ()=> {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("45612");
        }).rejects.toThrow("Customer not found");
    });

});