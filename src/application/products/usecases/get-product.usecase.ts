import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'

@Injectable()
export class GetProductUseCase {
  private readonly logger = new Logger(GetProductUseCase.name)

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    this.logger.log(`Getting product with ID: ${id}`)

    const product = await this.productRepository.findById(id)

    if (!product) {
      this.logger.warn(`Product not found with ID: ${id}`)
      throw new NotFoundException('Product not found')
    }

    this.logger.log(`Product found: ${product.name} (ID: ${product.id})`)
    return product
  }
}
