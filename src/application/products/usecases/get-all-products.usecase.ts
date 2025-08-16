import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../infrastructure/repositories/product.repository';
import { Product } from '../../../domain/products/entities/product.entity';

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
