import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreadOption } from '../common/BreadOption';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class BreadOptionsService {
//   private breadOptionsUrl = 'https://api.momsdelionline.com/api/bread-options';
  private breadOptionsUrl = ' http://localhost:8080/api/bread-options';
 
  constructor(private httpClient: HttpClient) {}

  getBreadOptionsForProduct(productId: number): Observable<BreadOption[]> {
    const breadOptionsUrl = `${this.breadOptionsUrl}/${productId}`;
    return this.httpClient.get<BreadOption[]>(breadOptionsUrl);
  }

  getBreadOptionsForProductCategory(productCategory: ProductCategory): Observable<BreadOption[]> {
    const breadOptionsUrl = `${this.breadOptionsUrl}/getByProductCategory`;
    return this.httpClient.post<BreadOption[]>(breadOptionsUrl, productCategory);
  }

  getBreadOption(optionId: number): Observable<BreadOption> {
    const breadOptionUrl = `${this.breadOptionsUrl}/${optionId}`;
    return this.httpClient.get<BreadOption>(breadOptionUrl);
  } 
  
  addBreadOption(breadOption: BreadOption): Observable<BreadOption> {
    return this.httpClient.post<BreadOption>(this.breadOptionsUrl, breadOption);
  } 

  deleteBreadOption(optionId: number): Observable<BreadOption> {
    return this.httpClient.delete<BreadOption>(`${this.breadOptionsUrl}/${optionId}`);
  } 
  
  updateBreadOption(breadOption: BreadOption): Observable<BreadOption> {
    return this.httpClient.put<BreadOption>(this.breadOptionsUrl, breadOption);
  }

  getAllBreadOptions(): Observable<BreadOption[]> {
    return this.httpClient.get<BreadOption[]>(this.breadOptionsUrl);
  }
}
