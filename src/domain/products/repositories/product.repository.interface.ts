import { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(product: { name: string; description: string | null; price: number; stock: number }): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
