import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../../infrastructure/repositories/product.repository';
import { Product } from '../../../domain/products/entities/product.entity';

@Injectable()
export class GetProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
