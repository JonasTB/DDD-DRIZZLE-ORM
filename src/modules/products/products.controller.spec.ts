import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { CreateProductUseCase } from '@application/products/usecases/create-product.usecase'
import { GetProductUseCase } from '@application/products/usecases/get-product.usecase'
import { GetAllProductsUseCase } from '@application/products/usecases/get-all-products.usecase'
import { UpdateProductUseCase } from '@application/products/usecases/update-product.usecase'
import { DeleteProductUseCase } from '@application/products/usecases/delete-product.usecase'
import { CreateProductDto } from '@application/products/dto/create-product.dto'
import { UpdateProductDto } from '@application/products/dto/update-product.dto'
import { Product } from '@domain/products/entities/product.entity'

describe('ProductsController', () => {
  let controller: ProductsController
  let createProductUseCase: CreateProductUseCase
  let getProductUseCase: GetProductUseCase
  let getAllProductsUseCase: GetAllProductsUseCase
  let updateProductUseCase: UpdateProductUseCase
  let deleteProductUseCase: DeleteProductUseCase

  const mockProduct = new Product(
    'test-id',
    'Test Product',
    'Test Description',
    99.99,
    100,
    new Date(),
    new Date(),
  )

  const mockCreateProductUseCase = {
    execute: jest.fn(),
  }

  const mockGetProductUseCase = {
    execute: jest.fn(),
  }

  const mockGetAllProductsUseCase = {
    execute: jest.fn(),
  }

  const mockUpdateProductUseCase = {
    execute: jest.fn(),
  }

  const mockDeleteProductUseCase = {
    execute: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: mockCreateProductUseCase,
        },
        {
          provide: GetProductUseCase,
          useValue: mockGetProductUseCase,
        },
        {
          provide: GetAllProductsUseCase,
          useValue: mockGetAllProductsUseCase,
        },
        {
          provide: UpdateProductUseCase,
          useValue: mockUpdateProductUseCase,
        },
        {
          provide: DeleteProductUseCase,
          useValue: mockDeleteProductUseCase,
        },
      ],
    }).compile()

    controller = module.get<ProductsController>(ProductsController)
    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase)
    getProductUseCase = module.get<GetProductUseCase>(GetProductUseCase)
    getAllProductsUseCase = module.get<GetAllProductsUseCase>(
      GetAllProductsUseCase,
    )
    updateProductUseCase =
      module.get<UpdateProductUseCase>(UpdateProductUseCase)
    deleteProductUseCase =
      module.get<DeleteProductUseCase>(DeleteProductUseCase)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 100,
      }

      jest.spyOn(createProductUseCase, 'execute').mockResolvedValue(mockProduct)

      const result = await controller.create(createProductDto)

      expect(createProductUseCase.execute).toHaveBeenCalledWith(
        createProductDto,
      )
      expect(result).toEqual({
        id: mockProduct.id,
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        stock: mockProduct.stock,
        createdAt: mockProduct.createdAt,
        updatedAt: mockProduct.updatedAt,
      })
    })
  })

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct]
      jest.spyOn(getAllProductsUseCase, 'execute').mockResolvedValue(products)

      const result = await controller.findAll()

      expect(getAllProductsUseCase.execute).toHaveBeenCalled()
      expect(result).toEqual(
        products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        })),
      )
    })
  })

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const productId = 'test-id'
      jest.spyOn(getProductUseCase, 'execute').mockResolvedValue(mockProduct)

      const result = await controller.findOne(productId)

      expect(getProductUseCase.execute).toHaveBeenCalledWith(productId)
      expect(result).toEqual({
        id: mockProduct.id,
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        stock: mockProduct.stock,
        createdAt: mockProduct.createdAt,
        updatedAt: mockProduct.updatedAt,
      })
    })
  })

  describe('update', () => {
    it('should update a product', async () => {
      const productId = 'test-id'
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      }

      jest.spyOn(updateProductUseCase, 'execute').mockResolvedValue(mockProduct)

      const result = await controller.update(productId, updateProductDto)

      expect(updateProductUseCase.execute).toHaveBeenCalledWith(
        productId,
        updateProductDto,
      )
      expect(result).toEqual({
        id: mockProduct.id,
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        stock: mockProduct.stock,
        createdAt: mockProduct.createdAt,
        updatedAt: mockProduct.updatedAt,
      })
    })
  })

  describe('remove', () => {
    it('should delete a product', async () => {
      const productId = 'test-id'
      jest.spyOn(deleteProductUseCase, 'execute').mockResolvedValue(true)

      await controller.remove(productId)

      expect(deleteProductUseCase.execute).toHaveBeenCalledWith(productId)
    })
  })
})
