import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from '../../application/products/usecases/create-product.usecase';
import { GetProductUseCase } from '../../application/products/usecases/get-product.usecase';
import { GetAllProductsUseCase } from '../../application/products/usecases/get-all-products.usecase';
import { UpdateProductUseCase } from '../../application/products/usecases/update-product.usecase';
import { DeleteProductUseCase } from '../../application/products/usecases/delete-product.usecase';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    GetProductUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
