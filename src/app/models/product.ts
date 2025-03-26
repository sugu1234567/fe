export interface Product {
    productId?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId?: string;
    imageUrls?: string[];
  }