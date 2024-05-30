import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm!: FormGroup;
  productId: number | null = null;

  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);
  private _router = inject(Router);
  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: '',
      description: '',
      price: 0,
      image: '',
      category: '',
    });
  }

  loadProduct(id: number): void {
    this._apiService.getProductById(id).subscribe({
      next: (product: any) => {
        this.productForm.patchValue(product);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Producto = this.productForm.value;
      const formattedProduct = JSON.stringify(product, null, 2);
      if (this.isEditMode) {
        this._apiService
          .updateProduct(this.productId!, product)
          .subscribe(() => {
            console.log('Producto actualizado');
            console.log(product);
            alert(`Producto actualizado:\n${formattedProduct}`);
            this._router.navigate(['/']);
          });
      } else {
        this._apiService.addProduct(product).subscribe(() => {
          console.log('Producto creado');
          console.log(product);

          alert(`Producto creado:\n${formattedProduct}`);
          this.productForm.reset();
        });
      }
    }
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.loadProduct(parseInt(id));
      } else {
        this.isEditMode = false;
      }
    });
  }
}
