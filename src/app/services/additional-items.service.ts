import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdditionalItem } from '../common/AdditionalItem';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class AdditionalItemsService {
  private additionalItemUrl = 'http://localhost:8080/api/additional-items';
  // private additionalItemUrl = "https://api.momsdelionline.com/api/additional-items";
  constructor(private httpClient: HttpClient) {}

  getAdditionalItemsForProduct(
    productId: number
  ): Observable<GetResponseAdditionalItemsCategory> {
    const additionalItemsUrl = `${this.additionalItemUrl}/${productId}`;
    return this.httpClient.get<GetResponseAdditionalItemsCategory>(
      additionalItemsUrl
    );
  }
  // getAdditionalItemsForProductCategory(
  //   productCategory: ProductCategory
  // ): Observable<GetResponseAdditionalItemsCategory> {
  //   const additionalItemsUrl = `${this.additionalItemUrl}/getByProductCategory`;
  //   return this.httpClient.post<GetResponseAdditionalItemsCategory>(
  //     additionalItemsUrl,
  //     productCategory
  //   );
  // }
  getAdditionalItemsForProductCategory(productCategory: ProductCategory): Observable<GetResponseAdditionalItemsCategory> {
    const additionalItemsUrl = `${this.additionalItemUrl}/getByProductCategory`;
    return this.httpClient.post<GetResponseAdditionalItemsCategory>(
        additionalItemsUrl,
        productCategory
    );
}


  getAdditionalItem(productId: number): Observable<AdditionalItem> {
    const additionalItemsUrl = `${this.additionalItemUrl}/${productId}`;
    return this.httpClient.get<AdditionalItem>(additionalItemsUrl);
  } 
  
  addAdditionalItem(additionalItem:AdditionalItem): Observable<AdditionalItem> {
    return this.httpClient.post<AdditionalItem>(this.additionalItemUrl,additionalItem);
  } 
 deleteAdditionalItem(additionalItem:any){
    return this.httpClient.delete<AdditionalItem>(`${this.additionalItemUrl}/${additionalItem}`);
  } 
  
  updateAdditionalItem(additionalItem:AdditionalItem): Observable<AdditionalItem> {
    return this.httpClient.put<AdditionalItem>(this.additionalItemUrl,additionalItem);
  }
  getAllAdditionalItem(): Observable<AdditionalItem[]> {
    const additionalItemsUrl = `${this.additionalItemUrl}`;
    return this.httpClient.get<AdditionalItem[]>(additionalItemsUrl);
  
  }




}

export type GetResponseAdditionalItemsCategory = AdditionalItem[];
