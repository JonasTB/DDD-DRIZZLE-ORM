import { ApiProperty } from '@nestjs/swagger'

export class ProductResponseDto {
  @ApiProperty({ example: 'uuid', description: 'Product ID' })
  id: string

  @ApiProperty({ example: 'iPhone 15', description: 'Product name' })
  name: string

  @ApiProperty({
    example: 'Latest iPhone model',
    description: 'Product description',
  })
  description: string | null

  @ApiProperty({ example: 999.99, description: 'Product price' })
  price: number

  @ApiProperty({ example: 100, description: 'Product stock quantity' })
  stock: number

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Creation date',
  })
  createdAt: Date

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Last update date',
  })
  updatedAt: Date
}
