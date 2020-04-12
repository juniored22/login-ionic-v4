import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { RouteReuseStrategy }               from '@angular/router';


import { IonicModule, IonicRouteStrategy }  from '@ionic/angular';
import { SplashScreen }                     from '@ionic-native/splash-screen/ngx';
import { StatusBar }                        from '@ionic-native/status-bar/ngx';

import { AppComponent }                     from './app.component';
import { AppRoutingModule }                 from './app-routing.module';

import { HttpClientModule }                 from '@angular/common/http';
import { Device }                           from '@ionic-native/device/ngx';
import { Facebook, FacebookLoginResponse }  from '@ionic-native/facebook/ngx';
import { GooglePlus }                       from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    Facebook,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
