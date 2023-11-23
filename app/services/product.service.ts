import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { AdditionalItem } from '../common/AdditionalItem';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // private baseUrl = 'https://api.momsdelionline.com/api/products';
  // private categoryUrl = 'https://api.momsdelionline.com/api/product-category';

  private baseUrl = 'http://localhost:8081/api/products';
  private categoryUrl = 'http://localhost:8081/api/product-category';
  private additionalItemUrl = "http://localhost:8081/api/additional-items";

  // we need a URL for additional items

  constructor(private httpClient: HttpClient) { }

  
  getAllAdditionalItems(): Observable<AdditionalItem[]> {
    return this.httpClient.get<AdditionalItem[]>(this.additionalItemUrl);
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, 
                        thePageSize: number, 
                        theKeyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // New method to fetch additional items
  // getAdditionalItems(additionalItemsId: number): Observable<GetResponseAdditionalItemsCategory> {
  //   const additionalItemsUrl = `${this.additionalItemUrl}/${additionalItemsId}`;
  //   return this.httpClient.get<GetResponseAdditionalItemsCategory>(additionalItemsUrl).pipe(
  //     tap(data => console.log('Additional Items Response:', data)), // Add this line for debugging
  //   );
  // }

  // getAdditionalItemsForProduct(productId: number): Observable<GetResponseAdditionalItemsCategory> {
  //   const additionalItemsUrl = `${this.additionalItemUrl}/${productId}`;
  //   return this.httpClient.get<GetResponseAdditionalItemsCategory>(additionalItemsUrl)
  //     .pipe(
  //       tap(data => console.log('Additional Items Response:', data)),
  //       catchError(error => {
  //         console.error('Error fetching additional items:', error);
  //         throw error; // Rethrow the error to propagate it to the subscriber
  //       })
  //     );
  // }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

// interface GetResponseAdditionalItemsCategory {
//   _embedded: {
//     selectedAdditionalItems: AdditionalItem[];
//   };
// }
