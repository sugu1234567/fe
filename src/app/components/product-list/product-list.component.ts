import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productDialog: boolean = false;
  selectedProduct: Product = {} as Product;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data.content;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  openNew() {
    this.selectedProduct = {} as Product;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    if (product.productId) {
      this.productService.deleteProduct(product.productId).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product', err);
        }
      });
    }
  }

  saveProduct() {
    if (this.selectedProduct.productId) {
      // Update
      this.productService.updateProduct(
        this.selectedProduct.productId, 
        this.selectedProduct
      ).subscribe({
        next: () => {
          this.loadProducts();
          this.productDialog = false;
        },
        error: (err) => {
          console.error('Error updating product', err);
        }
      });
    } else {
      // Create
      this.productService.createProduct(this.selectedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.productDialog = false;
        },
        error: (err) => {
          console.error('Error creating product', err);
        }
      });
    }
  }
}