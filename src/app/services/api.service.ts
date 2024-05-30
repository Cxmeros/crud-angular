import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://fakestoreapi.com/products'
  private _httpClient = inject(HttpClient);



  //Obtiene todos los productos
  public getProducts(): Observable<Producto[]>{
    return this._httpClient.get<Producto[]>(this.baseUrl);
  }

  //Obtiene un producto por su id
  public getProductById(id: number): Observable<Producto>{
    return this._httpClient.get<Producto>(`${this.baseUrl}/${id}`);
  }

  //Crea un producto
  public addProduct(product: Producto): Observable<Producto>{
    return this._httpClient.post<Producto>(this.baseUrl, product);
  }

  //Actualiza un producto
  public updateProduct(id: number, product: Producto): Observable<Producto>{
    return this._httpClient.put<Producto>(`${this.baseUrl}/${id}`, product);
  }

  //Elimina un producto
  public deleteProduct(id: number): Observable<Producto>{
    return this._httpClient.delete<Producto>(`${this.baseUrl}/${id}`);
  }

}
