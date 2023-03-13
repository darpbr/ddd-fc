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
        customer.setAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.getName(),
            active: customer.isActive(),
            rewardpoints: customer.getRewardPoints(),
            street: address.getStreet(),
            number: address.getNumber(),
            city: address.getCity(),
            zipcode: address.getZip(),
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.setAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.getId(),
            name: customer.getName(),
            active: customer.isActive(),
            street: customer.getAddress().getStreet(),
            city: customer.getAddress().getCity(),
            number: customer.getAddress().getNumber(),
            zipcode: customer.getAddress().getZip(),
            rewardpoints: customer.getRewardPoints(), 
        });

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel2.toJSON()).toStrictEqual({
            id: customer.getId(),
            name: customer.getName(),
            active: customer.isActive(),
            street: customer.getAddress().getStreet(),
            city: customer.getAddress().getCity(),
            number: customer.getAddress().getNumber(),
            zipcode: customer.getAddress().getZip(),
            rewardpoints: customer.getRewardPoints(), 
        });

    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.setAddress(address);

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.getId());
        
        expect(customer).toStrictEqual(customerResult);
    });

    it("should find all products", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode","City");
        customer.setAddress(address);
        customer.activate();
        customer.addRewardPoints(10);

        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Street 2", 2, "zipcode","City");
        customer2.setAddress(address2);
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