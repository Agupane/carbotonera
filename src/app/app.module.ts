import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {BotonesPage} from "../pages/botones/botones";
import {BotoneraSharedModule} from "../botonera-shared/botonera-shared.module";
import {NativeAudio} from "@ionic-native/native-audio";

@NgModule({
  declarations: [
    MyApp,
    BotonesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BotoneraSharedModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BotonesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
