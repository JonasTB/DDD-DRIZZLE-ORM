import { Module } from '@nestjs/common'
import { CreateProductUseCase } from '../../application/products/usecases/create-product.usecase'
import { DeleteProductUseCase } from '../../application/products/usecases/delete-product.usecase'
import { GetAllProductsUseCase } from '../../application/products/usecases/get-all-products.usecase'
import { GetProductUseCase } from '../../application/products/usecases/get-product.usecase'
import { UpdateProductUseCase } from '../../application/products/usecases/update-product.usecase'
import { ProductRepository } from '../../infrastructure/repositories/product.repository'
import { ProductsController } from './products.controller'

@Module({
  controllers: [ProductsController],
  providers: [
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepository,
    },
    {
      provide: 'CREATE_PRODUCT_USE_CASE',
      useClass: CreateProductUseCase,
    },
    {
      provide: 'GET_PRODUCT_USE_CASE',
      useClass: GetProductUseCase,
    },
    {
      provide: 'GET_ALL_PRODUCTS_USE_CASE',
      useClass: GetAllProductsUseCase,
    },
    {
      provide: 'UPDATE_PRODUCT_USE_CASE',
      useClass: UpdateProductUseCase,
    },
    {
      provide: 'DELETE_PRODUCT_USE_CASE',
      useClass: DeleteProductUseCase,
    },
  ],
  exports: ['PRODUCT_REPOSITORY'],
})
export class ProductsModule {}
