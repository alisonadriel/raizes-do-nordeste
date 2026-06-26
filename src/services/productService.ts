import { mockCategories } from '@/data/categories';
import { getProductById, mockProducts } from '@/data/products';
import { mockUnits } from '@/data/units';
import type { Category, Product, Unit } from '@/types';
import { shouldSimulateError } from '@/utils/storage';
import { AppError, simulateRequest } from './api';

export const productService = {
  async getUnits(): Promise<Unit[]> {
    return simulateRequest(mockUnits.filter((u) => u.active), 500, shouldSimulateError());
  },

  async getAllUnits(): Promise<Unit[]> {
    return simulateRequest(mockUnits, 400, shouldSimulateError());
  },

  async getUnitById(id: string): Promise<Unit> {
    return simulateRequest(undefined, 400, shouldSimulateError()).then(() => {
      const unit = mockUnits.find((u) => u.id === id);
      if (!unit) throw new AppError('Unidade não encontrada.', 'NOT_FOUND');
      return unit;
    });
  },

  async getCategories(): Promise<Category[]> {
    return simulateRequest(mockCategories, 300, shouldSimulateError());
  },

  async getProductsByUnit(unitId: string): Promise<Product[]> {
    return simulateRequest(
      mockProducts.filter((p) => p.unitId === unitId),
      600,
      shouldSimulateError(),
    );
  },

  async getProductById(id: string): Promise<Product> {
    return simulateRequest(undefined, 400, shouldSimulateError()).then(() => {
      const product = getProductById(id);
      if (!product) throw new AppError('Produto não encontrado.', 'NOT_FOUND');
      return product;
    });
  },

  searchProducts(products: Product[], query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    );
  },

  filterByCategory(products: Product[], categoryId: string | null): Product[] {
    if (!categoryId) return products;
    return products.filter((p) => p.categoryId === categoryId);
  },
};
