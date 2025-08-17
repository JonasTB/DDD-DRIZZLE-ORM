import { Inject, Injectable } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll()
  }
}
