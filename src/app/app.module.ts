import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

// Add these imports for Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AdditionalItemsModalComponent } from './components/additional-items-modal/additional-items-modal.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminMainContentComponent } from './admin/admin-main-content/admin-main-content.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin/components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin/components/admin-sidebar/admin-sidebar.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AddCategoryComponent } from './admin/admin-category/add-category/add-category.component';
import { AddProductComponent } from './admin/admin-product/add-product/add-product.component';
import { OrderPlacedComponent } from './admin/order-placed/order-placed.component';
import { TrackOrderComponent } from './customer/track-order/track-order.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { OrdersComponent } from './customer/orders/orders.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductByCateogryChartComponent } from './admin/admin-dashboard/charts/product-by-cateogry-chart/product-by-cateogry-chart.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './auth/login/login.component';
import { NgChartsModule } from 'ng2-charts';
import { ProductSolidReviewChartComponent } from './admin/admin-dashboard/charts/product-solid-review-chart/product-solid-review-chart.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { ReviewAndCommentsComponent } from './admin/review-and-comments/review-and-comments.component';
import { ReviewChartsComponent } from './admin/review-and-comments/review-charts/review-charts.component';
import { AdditionalItemsComponent } from './admin/additional-items/additional-items.component';
import { AddAdditionalItemComponent } from './admin/additional-items/add-additional-item/add-additional-item.component';
import { RegisterCustomerComponent } from './customer/register-customer/register-customer.component';
import { ForgetPasswordComponent } from './auth/login/forget-password/forget-password.component';
import { AdminGurard } from './authoriation/admin-guard.guard';
import { CustomerAdminGuard } from './authoriation/customer-guard.guard';
import { AuthInterceptor } from './authoriation/AuthInterceptor';
import { EditCategoryComponent } from './admin/admin-category/edit-category/edit-category.component';
import { EditProductComponent } from './admin/admin-product/edit-product/edit-product.component';
import { EditAdditionalItemsComponent } from './admin/additional-items/edit-additional-items/edit-additional-items.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerSidebarComponent } from './customer/customer-sidebar/customer-sidebar.component';
const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'category/:categoryId', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/category',
    component: AdminCategoryComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/category/add',
    component: AddCategoryComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/category/edit',
    component: EditCategoryComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/product',
    component: AdminProductComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/product/add',
    component: AddProductComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/product/edit',
    component: EditProductComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/orderPlaced',
    component: OrderPlacedComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/additional-item',
    component: AdditionalItemsComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/additional-item/add',
    component: AddAdditionalItemComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'admin/additional-item/edit',
    component: EditAdditionalItemsComponent,
    canActivate: [AdminGurard],
  },
  {
    path: 'customer/orders',
    component: OrdersComponent,
    canActivate: [CustomerAdminGuard],
  },
  {
    path: 'customer/trackOrder',
    component: TrackOrderComponent,
    canActivate: [CustomerAdminGuard],
  },
  {
    path: 'customer/profile',
    component: ProfileComponent,
    canActivate: [CustomerAdminGuard],
  },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    canActivate: [CustomerAdminGuard],
  },
  { path: 'customer/register', component: RegisterCustomerComponent },
  {
    path: 'admin/customer/list',
    component: CustomerComponent,
    canActivate: [CustomerAdminGuard],
  },
  {
    path: 'admin/review',
    component: ReviewAndCommentsComponent,
    canActivate: [CustomerAdminGuard],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    AdditionalItemsModalComponent,
    NavbarComponent,
    FooterComponent,
    MainContentComponent,
    ContactUsComponent,
    HomeComponent,
    AdminMainContentComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AddCategoryComponent,
    AddProductComponent,
    OrderPlacedComponent,
    TrackOrderComponent,
    ProfileComponent,
    OrdersComponent,
    ProductByCateogryChartComponent,
    LoginComponent,
    ProductSolidReviewChartComponent,
    CustomerComponent,
    ReviewAndCommentsComponent,
    ReviewChartsComponent,
    AdditionalItemsComponent,
    RegisterCustomerComponent,
    ForgetPasswordComponent,
    EditCategoryComponent,
    EditProductComponent,
    EditAdditionalItemsComponent,
    CustomerDashboardComponent,
    CustomerSidebarComponent,
    // CustomerComponent,
    // ReviewAndCommentsComponent,
    // ReviewChartsComponent,
    // AdditionalItemsCompnent,
    // AddAdditionalItemComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // NgbModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    AgChartsAngularModule,
    NgApexchartsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    NgChartsModule,
  ],
  providers: [
    ProductService,
    AdminGurard,
    CustomerAdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
