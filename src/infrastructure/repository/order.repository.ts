import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
    
    async create(entity: Order): Promise<void>{
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{ model: OrderItemModel }],
        });
    }

    async update(entity: Order): Promise<void>{
        await OrderModel.update(
            {
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                where: {
                    id: entity.id,
                },
            });
    }

    async find(id: string): Promise<Order>{
        let orderModel: OrderModel;
        try {
            orderModel = await OrderModel.findOne({ 
                where: { id, },
                rejectOnEmpty: true, 
                include: ["items"],});
        } catch (error) {
            throw new Error("Order not found");
        }

        const orderItems: OrderItem[] = orderModel.items.map((orderItemModel) => {
            let orderItem = new OrderItem(
                orderItemModel.id,
                orderItemModel.name,
                orderItemModel.price,
                orderItemModel.product_id,
                orderItemModel.quantity
                );
            return orderItem;
        });

        const order = new Order(id, orderModel.customer_id, orderItems);

        return order;
    }

    async findAll(): Promise<Order[]>{
        const orderModels = await OrderModel.findAll({ include: ["items"]});
        
        const orders = orderModels.map((orderModel) => {

            const order = new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map((orderItemModels) => {
                    const orderItem = new OrderItem(
                        orderItemModels.id,
                        orderItemModels.name,
                        orderItemModels.price,
                        orderItemModels.product_id,
                        orderItemModels.quantity
                        );
                    return orderItem;
                })
            );

            return order;
        });
        return orders;
    }
}