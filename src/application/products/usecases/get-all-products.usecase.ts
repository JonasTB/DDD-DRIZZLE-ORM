import { Injectable } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { ProductRepository } from '../../../infrastructure/repositories/product.repository'

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll()
  }
}
