import { IsString, IsNumber, IsOptional, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Product name' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Latest iPhone model', description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100, description: 'Product stock quantity' })
  @IsNumber()
  @Min(0)
  stock: number;
}
