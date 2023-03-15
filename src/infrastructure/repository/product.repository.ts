import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";

export default class ProductRepository implements ProductRepositoryInterface{
    
    async create(entity: Product): Promise<void>{
        await ProductModel.create({
            id: entity.getId(),
            name: entity.getName(),
            price: entity.getPrice(),
        });
    }

    async update(entity: Product): Promise<void>{
        await ProductModel.update(
            {
                name: entity.getName(),
                price: entity.getPrice(),
            },
            {
                where: {
                    id: entity.getId(),
                },
            });
    }

    async find(id: string): Promise<Product>{
        const productModel = await ProductModel.findOne({ where: { id }});

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        )
    }

    async findAll(): Promise<Product[]>{
        const productModels = await ProductModel.findAll();
        return productModels.map((productModel) => 
        new Product(productModel.id, productModel.name, productModel.price));
    }
}