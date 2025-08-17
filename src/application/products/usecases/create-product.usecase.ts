import { Inject, Injectable } from '@nestjs/common'
import { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'
import type { CreateProductDto } from '../dto/create-product.dto'

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    const productData = Product.create(
      createProductDto.name,
      createProductDto.description || null,
      createProductDto.price,
      createProductDto.stock,
    )

    return this.productRepository.create(productData)
  }
}
