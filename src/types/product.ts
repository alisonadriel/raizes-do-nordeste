export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  unitId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageEmoji: string;
  available: boolean;
  tags: string[];
}
