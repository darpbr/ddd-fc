import { Sequelize } from "sequelize-typescript"
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderModel from "./order.model";


describe("Order repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a new Order",async ()=> {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123","Customer 1");
        const address = new Address("street 1",1,"zip coded 1", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123","Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123","123",[orderItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: 20,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

    });

    it("should update a order", async () => {
        
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123","Customer 1");
        const address = new Address("street 1",1,"zip coded 1", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123","Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        let order = new Order("123","123",[orderItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        let orderModel = await OrderModel.findOne({ 
            where: { id:order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                }
            ]
        });

        const product2 = new Product("987","Product 2",20);
        productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        );

        order = new Order("123","123",[orderItem, orderItem2]);
        await orderRepository.update(order);

        orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.items).toHaveLength(2);

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id:order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                }
                ,{
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: "123",
                    product_id: "987",
                }
            ]
        });
    });

    it("should find a order", async () => {
        
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123","Customer 1");
        const address = new Address("street 1",1,"zip coded 1", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123","Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            4
        );

        const order = new Order("123","123",[orderItem, orderItem2])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderResult = await orderRepository.find("123");

        expect(orderResult).toStrictEqual(order);
    });

    it("should find all orders", async () => {
        
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123","Customer 1");
        const address = new Address("street 1",1,"zip coded 1", "city 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Street 2", 2, "zipcode","City");
        customer2.changeAddress(address2);
        customer2.activate();
        customer2.addRewardPoints(20);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("123","Product 1", 10);
        const product2 = new Product("321","Product 2", 20);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            4
        );

        const orderRepository = new OrderRepository();
        const order = new Order("1","123",[orderItem]);
        const order2 = new Order("2","456",[orderItem2]);

        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
    });

});