import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const existingProduct = await this.productRepository.findById(id)

    if (!existingProduct) {
      throw new NotFoundException('Product not found')
    }

    const deleted = await this.productRepository.delete(id)

    if (!deleted) {
      throw new NotFoundException('Failed to delete product')
    }

    return deleted
  }
}
