import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdditionalItem } from '../common/AdditionalItem';

@Injectable({
  providedIn: 'root'
})
export class AdditionalItemsService {
  private additionalItemUrl = "http://localhost:8081/api/additional-items";

  constructor(private httpClient: HttpClient) { }

  getAdditionalItemsForProduct(productId: number): Observable<GetResponseAdditionalItemsCategory> {
    const additionalItemsUrl = `${this.additionalItemUrl}/${productId}`;
    return this.httpClient.get<GetResponseAdditionalItemsCategory>(additionalItemsUrl);
  }  

  getAdditionalItem(productId: number): Observable<AdditionalItem> {
    const additionalItemsUrl = `${this.additionalItemUrl}/${productId}`;
    return this.httpClient.get<AdditionalItem>(additionalItemsUrl);
  }
}

export type GetResponseAdditionalItemsCategory = AdditionalItem[];