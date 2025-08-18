import { Inject, Injectable, Logger } from '@nestjs/common'
import { Product } from '../../../domain/products/entities/product.entity'
import type { IProductRepository } from '../../../domain/products/repositories/product.repository.interface'
import type { CreateProductDto } from '../dto/create-product.dto'

@Injectable()
export class CreateProductUseCase {
  private readonly logger = new Logger(CreateProductUseCase.name)

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`Creating product: ${createProductDto.name}`)
    this.logger.debug(`Product data: ${JSON.stringify(createProductDto)}`)

    const productData = Product.create(
      createProductDto.name,
      createProductDto.description || null,
      createProductDto.price,
      createProductDto.stock,
    )

    const createdProduct = await this.productRepository.create(productData)
    this.logger.log(
      `Product created successfully: ${createdProduct.name} (ID: ${createdProduct.id})`,
    )

    return createdProduct
  }
}
