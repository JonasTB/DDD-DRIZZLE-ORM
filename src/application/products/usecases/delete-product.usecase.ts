import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'

@Injectable()
export class DeleteProductUseCase {
  private readonly logger = new Logger(DeleteProductUseCase.name)

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    this.logger.log(`Deleting product with ID: ${id}`)

    const existingProduct = await this.productRepository.findById(id)

    if (!existingProduct) {
      this.logger.error(`Product not found for deletion with ID: ${id}`)
      throw new NotFoundException('Product not found')
    }

    this.logger.log(
      `Found product to delete: ${existingProduct.name} (ID: ${existingProduct.id})`,
    )

    const deleted = await this.productRepository.delete(id)

    if (!deleted) {
      this.logger.error(`Failed to delete product with ID: ${id}`)
      throw new NotFoundException('Failed to delete product')
    }

    this.logger.log(
      `Product deleted successfully: ${existingProduct.name} (ID: ${existingProduct.id})`,
    )
    return deleted
  }
}
