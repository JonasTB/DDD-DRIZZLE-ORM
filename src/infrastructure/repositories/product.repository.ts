import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { IProductRepository } from '../../domain/products/repositories/product.repository.interface';
import { Product } from '../../domain/products/entities/product.entity';
import { products } from '../database/schema/products.schema';

const DATABASE = 'DATABASE';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @Inject(DATABASE) private readonly db: PostgresJsDatabase,
  ) {}

  async create(product: { name: string; description: string | null; price: number; stock: number }): Promise<Product> {
    const [newProduct] = await this.db.insert(products).values({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock,
    }).returning();

    return new Product(
      newProduct.id,
      newProduct.name,
      newProduct.description,
      Number(newProduct.price),
      newProduct.stock,
      newProduct.createdAt,
      newProduct.updatedAt,
    );
  }

  async findById(id: string): Promise<Product | null> {
    const [product] = await this.db.select().from(products).where(eq(products.id, id));
    
    if (!product) return null;

    return new Product(
      product.id,
      product.name,
      product.description,
      Number(product.price),
      product.stock,
      product.createdAt,
      product.updatedAt,
    );
  }

  async findAll(): Promise<Product[]> {
    const allProducts = await this.db.select().from(products);
    
    return allProducts.map(product => new Product(
      product.id,
      product.name,
      product.description,
      Number(product.price),
      product.stock,
      product.createdAt,
      product.updatedAt,
    ));
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const updateData: any = {};
    
    if (product.name !== undefined) updateData.name = product.name;
    if (product.description !== undefined) updateData.description = product.description;
    if (product.price !== undefined) updateData.price = product.price.toString();
    if (product.stock !== undefined) updateData.stock = product.stock;
    
    updateData.updatedAt = new Date();

    const [updatedProduct] = await this.db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    if (!updatedProduct) return null;

    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.description,
      Number(updatedProduct.price),
      updatedProduct.stock,
      updatedProduct.createdAt,
      updatedProduct.updatedAt,
    );
  }

  async delete(id: string): Promise<boolean> {
    const [deletedProduct] = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    return !!deletedProduct;
  }
}
