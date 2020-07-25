import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import {StaticPageComponent} from '../static-page/static-page.component'
import { CmsPageGuard, PageLayoutComponent, OrderCancellationService } from '@spartacus/storefront';
import { SaleComponent } from '../sale/sale.component';
import { Config, ConfigModule, RoutingConfig } from '@spartacus/core';


const STATIC_ROUTES: Routes=[
  {path:'static-page', component:StaticPageComponent,
  canActivate:[CmsPageGuard],
  data:{pageLabel:'cart'}
 },
 { 
   path:'alias/hilfe',
   component: PageLayoutComponent,
   data:{pageLabel:'faq'},
   canActivate:[CmsPageGuard ]
 },
 {
   path:'sale',
   component: SaleComponent,
   data:{pageLabel:'/sale'},
   canActivate:[CmsPageGuard]
 }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(STATIC_ROUTES),
    ConfigModule.withConfig({
      routing:{
        routes:{  
          product:{
            paths:[
              'electronics/camaras/:manufacturer/:productCode/:nameForUrl',
              'electronics/camaras/:productCode/:name',
              'electronics/camaras/:productCode'
            ],
          }
        }
        
      }

    } as RoutingConfig),

    ConfigModule.withConfig({
      backend:{
        occ:{
          endpoints:{
            productSearch:
              //tslint:disable -next - line:max-length
              'products/search?fields=products(code,categories,manufacturer,name,summary,price(FULL),images)',  
              //tslint:disable -next - line:max-length
              product_scopes:{
                list:'products/${productCode}?fields=code,name,manufacturer,summary,price(formattedValue),images'
              }
               }
          }
        }
      }
    )
  ]
})
export class CustomRoutingModule { }
