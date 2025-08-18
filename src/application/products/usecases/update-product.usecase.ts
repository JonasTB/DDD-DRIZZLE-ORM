import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'
import type { UpdateProductDto } from '../dto/update-product.dto'

@Injectable()
export class UpdateProductUseCase {
  private readonly logger = new Logger(UpdateProductUseCase.name)

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.log(`Updating product with ID: ${id}`)
    this.logger.debug(`Update data: ${JSON.stringify(updateProductDto)}`)

    const existingProduct = await this.productRepository.findById(id)

    if (!existingProduct) {
      this.logger.warn(`Product not found for update with ID: ${id}`)
      throw new NotFoundException('Product not found')
    }

    this.logger.log(
      `Found product to update: ${existingProduct.name} (ID: ${existingProduct.id})`,
    )

    const updatedProduct = await this.productRepository.update(
      id,
      updateProductDto,
    )

    if (!updatedProduct) {
      this.logger.error(`Failed to update product with ID: ${id}`)
      throw new NotFoundException('Failed to update product')
    }

    this.logger.log(
      `Product updated successfully: ${updatedProduct.name} (ID: ${updatedProduct.id})`,
    )
    return updatedProduct
  }
}
