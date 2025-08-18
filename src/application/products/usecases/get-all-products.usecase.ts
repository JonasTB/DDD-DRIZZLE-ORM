import { Inject, Injectable, Logger } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'

@Injectable()
export class GetAllProductsUseCase {
  private readonly logger = new Logger(GetAllProductsUseCase.name)

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    this.logger.log('Getting all products')

    const products = await this.productRepository.findAll()

    this.logger.log(`Found ${products.length} products`)
    return products
  }
}
