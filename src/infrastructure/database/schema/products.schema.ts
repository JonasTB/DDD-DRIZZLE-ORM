import { pgTable, uuid, varchar, timestamp, text, decimal, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
