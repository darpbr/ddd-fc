import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository implements OrderRepositoryInterface{
    
    async create(entity: Order): Promise<void>{
        await OrderModel.create({
            id: entity.getId(),
            customer_id: entity.getCustomerId(),
            total: entity.getTotal(),
            items: entity.getItems().map((item) => ({
                id: item.getId(),
                name: item.getName(),
                price: item.getPrice(),
                product_id: item.getProductId(),
                quantity: item.getQuantity(),
            })),
        },
        {
            include: [{ model: OrderItemModel}],
        }
        );
    }
    
    async update(entity: Order): Promise<void>{
        throw new Error("Not implemented yet");
        // await ProductModel.update(
        //     {
        //         name: entity.getName(),
        //         price: entity.getPrice(),
        //     },
        //     {
        //         where: {
        //             id: entity.getId(),
        //         },
        //     });
    }

    async find(id: string): Promise<Order>{
        throw new Error("Not implemented yet");
        // const productModel = await ProductModel.findOne({ where: { id }});

        // return new Product(
        //     productModel.id,
        //     productModel.name,
        //     productModel.price
        // )
    }

    async findAll(): Promise<Order[]>{
        throw new Error("Not implemented yet");
        // const productModels = await ProductModel.findAll();
        // return productModels.map((productModel) => 
        // new Product(productModel.id, productModel.name, productModel.price));
    }
}