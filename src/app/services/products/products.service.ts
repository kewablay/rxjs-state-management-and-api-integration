import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
    console.log('api Url : ', this.apiUrl);
  }

  getProducts() {
    return this.http.get(this.apiUrl).pipe(
      map((products: any) => products),
      catchError((error) => {
        console.error('Error fetching products:', error);
        of([]);
        throw new Error(`Error fetching products: ${error.message}`);
      })
    );
  }
}
