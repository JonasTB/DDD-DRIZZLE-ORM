import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../infrastructure/repositories/product.repository';
import { Product } from '../../../domain/products/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    const productData = Product.create(
      createProductDto.name,
      createProductDto.description || null,
      createProductDto.price,
      createProductDto.stock,
    );

    return this.productRepository.create(productData);
  }
}
