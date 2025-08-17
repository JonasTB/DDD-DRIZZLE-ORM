import { Injectable, NotFoundException } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { ProductRepository } from '../../../infrastructure/repositories/product.repository'

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }
}
