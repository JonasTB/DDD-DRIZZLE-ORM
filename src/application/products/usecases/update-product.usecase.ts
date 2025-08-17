import { Injectable, NotFoundException } from '@nestjs/common'
import type { Product } from '../../../domain/products/entities/product.entity'
import type { ProductRepository } from '../../../infrastructure/repositories/product.repository'
import type { UpdateProductDto } from '../dto/update-product.dto'

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id)

    if (!existingProduct) {
      throw new NotFoundException('Product not found')
    }

    const updatedProduct = await this.productRepository.update(
      id,
      updateProductDto,
    )

    if (!updatedProduct) {
      throw new NotFoundException('Failed to update product')
    }

    return updatedProduct
  }
}
