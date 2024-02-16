import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { AdditionalItem } from '../common/AdditionalItem';
import { Page } from '../common/Page';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // private baseUrl = 'https://api.momsdelionline.com/api/products';
  //  private categoryUrl = 'https://api.momsdelionline.com/api/categories';
  //  private additionalItemUrl = "https://api.momsdelionline.com/api/additional-items";


   // private categoryUrl = 'https://api.momsdelionline.com/api/product-category';
   
   
  private baseUrl = 'http://localhost:8080/api/products';
 private categoryUrl = 'http://localhost:8080/api/categories';
 private additionalItemUrl = 'http://localhost:8080/api/additional-items';

  // we need a URL for additional items

  constructor(private httpClient: HttpClient) {}

  getAllAdditionalItems(): Observable<AdditionalItem[]> {
    return this.httpClient.get<AdditionalItem[]>(this.additionalItemUrl);
  }

  deleteProduct(id:any):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }
  getPaginatedProducts(page: number, size: number): Observable<Page<Product>> {
    const url = `${this.baseUrl}/?page=${page}&size=${size}`;
    return this.httpClient.get<Page<Product>>(url);
  }

  getProductsByCategory(categoryId:number,page: number, size: number): Observable<Page<Product>> {
    const url = `${this.baseUrl}/category?categoryId=${categoryId}&page=${page}&size=${size}`;
    return this.httpClient.get<Page<Product>>(url);
  }
  
  updateProduct(product:Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/`,product);
  }
  addProduct(product:Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}`,product);
  }
  

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts();
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts();
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  public getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }

  getProductCategory(url: any): Observable<ProductCategory> {
    console.log(url);
    if(!url.toLowerCase().startsWith("http://localhost")){
      console.log("starts");
      if (url.toLowerCase().startsWith('http://')) {
          url =  url.replace(/^http:\/\//i, 'https://');
            }
    }
    return this.httpClient.get<ProductCategory>(url);
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
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

// interface GetResponseAdditionalItemsCategory {
//   _embedded: {
//     selectedAdditionalItems: AdditionalItem[];
//   };
// }
