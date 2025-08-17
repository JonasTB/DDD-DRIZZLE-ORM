import type { CreateProductDto } from '@application/products/dto/create-product.dto'
import type { UpdateProductDto } from '@application/products/dto/update-product.dto'
import type { CreateProductUseCase } from '@application/products/usecases/create-product.usecase'
import type { DeleteProductUseCase } from '@application/products/usecases/delete-product.usecase'
import type { GetAllProductsUseCase } from '@application/products/usecases/get-all-products.usecase'
import type { GetProductUseCase } from '@application/products/usecases/get-product.usecase'
import type { UpdateProductUseCase } from '@application/products/usecases/update-product.usecase'
import { Product } from '@domain/products/entities/product.entity'
import { Test, type TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'

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
          provide: 'CREATE_PRODUCT_USE_CASE',
          useValue: mockCreateProductUseCase,
        },
        {
          provide: 'GET_PRODUCT_USE_CASE',
          useValue: mockGetProductUseCase,
        },
        {
          provide: 'GET_ALL_PRODUCTS_USE_CASE',
          useValue: mockGetAllProductsUseCase,
        },
        {
          provide: 'UPDATE_PRODUCT_USE_CASE',
          useValue: mockUpdateProductUseCase,
        },
        {
          provide: 'DELETE_PRODUCT_USE_CASE',
          useValue: mockDeleteProductUseCase,
        },
      ],
    }).compile()

    controller = module.get<ProductsController>(ProductsController)
    createProductUseCase = module.get<CreateProductUseCase>(
      'CREATE_PRODUCT_USE_CASE',
    )
    getProductUseCase = module.get<GetProductUseCase>('GET_PRODUCT_USE_CASE')
    getAllProductsUseCase = module.get<GetAllProductsUseCase>(
      'GET_ALL_PRODUCTS_USE_CASE',
    )
    updateProductUseCase = module.get<UpdateProductUseCase>(
      'UPDATE_PRODUCT_USE_CASE',
    )
    deleteProductUseCase = module.get<DeleteProductUseCase>(
      'DELETE_PRODUCT_USE_CASE',
    )
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
