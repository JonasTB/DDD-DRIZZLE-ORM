import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }
}
