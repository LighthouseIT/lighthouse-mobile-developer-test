import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormTaskPage } from '../pages/form-task/form-task';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyApSmzKSvASxElhg2HcobB5Ud-ytglA5FM",
  authDomain: "todo-28906.firebaseapp.com",
  databaseURL: "https://todo-28906.firebaseio.com",
  storageBucket: "todo-28906.appspot.com",
  messagingSenderId: "20416535753"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormTaskPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormTaskPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
