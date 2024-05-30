import { Component, inject } from '@angular/core';
import { Producto } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productsList: Producto[] = []

  private _apiService = inject(ApiService);


  fetchProducts(): void {
    this._apiService.getProducts().subscribe(
      {
        next: (productos: Producto[]) => {
          this.productsList = productos;
        },
        error: (error: any) => {
          console.error(error);
        }
    });
  }

  private _router = inject(Router);

  addProduct(): void {
    this._router.navigate(['products/add']);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }


}
