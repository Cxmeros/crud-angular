import { Component, Input, inject } from '@angular/core';
import { Producto } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TruncateNamePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() product!: Producto;
  private _router = inject(Router);


  navigateToProduct(id:number): void {
    this._router.navigate(['/product', id])
  }

}
