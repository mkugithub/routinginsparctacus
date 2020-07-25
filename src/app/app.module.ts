import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { StaticPageComponent } from './static-page/static-page.component';
import {CustomRoutingModule} from './custom-routing/custom-routing.module';
import { SaleComponent } from './sale/sale.component';
import { PRODUCT_NORMALIZER, ProductNameNormalizer } from '@spartacus/core';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    StaticPageComponent,
    SaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://api.c39j2-walkersde1-d3-public.model-t.cc.commerce.ondemand.com/',
          prefix: '/rest/v2/'
        }
      },
      context: {
        baseSite: ['electronics'],
       //customParameters:['test'],
       urlParameters:['baseSite','language','currency']
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '2.0'
      }
    }),
    CustomRoutingModule,
    RouterModule
  ],
  providers: [
   {provide:PRODUCT_NORMALIZER,useClass:ProductNameNormalizer,multi:true},
   //s{provide:PRODUCT_NORMALIZER,useClass:ProductCategoryNormalizer,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
