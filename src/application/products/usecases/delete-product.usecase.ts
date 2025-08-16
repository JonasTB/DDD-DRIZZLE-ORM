import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../../infrastructure/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const existingProduct = await this.productRepository.findById(id);
    
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const deleted = await this.productRepository.delete(id);
    
    if (!deleted) {
      throw new NotFoundException('Failed to delete product');
    }

    return deleted;
  }
}
