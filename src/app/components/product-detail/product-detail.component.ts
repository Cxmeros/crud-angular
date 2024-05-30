import { Component, inject } from '@angular/core';
import { Producto } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  public product!: Producto;
  loading: boolean = true;

  private _apiService = inject(ApiService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._apiService
        .getProductById(params['id'])
        .subscribe((product: Producto) => {
          console.log('Id del producto ' + product.id);
          this.product = product;
          this.loading = false;
        });
    });
  }

  deleteProduct(id: number): void {
    this._apiService.deleteProduct(id).subscribe({
      next: () => {
        console.log(`Producto con id ${id} eliminado con éxito`);
        const formattedProduct = JSON.stringify(this.product, null, 2);
        alert(`Producto eliminado:\n${formattedProduct}`);
        this._router.navigate(['/']);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  editProduct(id: number): void {
    this._router.navigate(['/products/edit', id]);
  }
}
