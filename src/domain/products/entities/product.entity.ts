export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
    public readonly stock: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string | null,
    price: number,
    stock: number,
  ): { name: string; description: string | null; price: number; stock: number } {
    return {
      name,
      description,
      price,
      stock,
    };
  }

  updateStock(newStock: number): Product {
    return new Product(
      this.id,
      this.name,
      this.description,
      this.price,
      newStock,
      this.createdAt,
      new Date(),
    );
  }

  updatePrice(newPrice: number): Product {
    return new Product(
      this.id,
      this.name,
      this.description,
      newPrice,
      this.stock,
      this.createdAt,
      new Date(),
    );
  }

  updateName(name: string): Product {
    return new Product(
      this.id,
      name,
      this.description,
      this.price,
      this.stock,
      this.createdAt,
      new Date(),
    );
  }
}
